const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/jalan - Get all roads with pagination and filtering
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 100000, // Increased default limit to load all roads
      kecamatan,
      desa,
      kondisi,
      tahun,
      search,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {};

    if (kecamatan) {
      where.kecamatan = {
        contains: kecamatan,
        mode: "insensitive",
      };
    }

    if (desa) {
      where.desa = {
        contains: desa,
        mode: "insensitive",
      };
    }

    if (kondisi) {
      where.kondisi = kondisi;
    }

    if (tahun) {
      where.tahun = tahun;
    }

    if (search) {
      where.OR = [
        {
          nama: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          namaJalan: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          noRuas: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const [roads, total] = await Promise.all([
      prisma.jalanLingkunganKubuRaya.findMany({
        where,
        skip,
        take,
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          fid: true,
          noRuas: true,
          noProv: true,
          noKab: true,
          noKec: true,
          noDesa: true,
          noJalan: true,
          nama: true,
          namaJalan: true,
          panjangM: true,
          lebarM: true,
          tahun: true,
          kondisi: true,
          nilai: true,
          bobot: true,
          keterangan: true,
          kecamatan: true,
          desa: true,
          utmXAwal: true,
          utmYAwal: true,
          pngnlAwal: true,
          utmXAkhi: true,
          utmYAkhi: true,
          pngnlAkhi: true,
          shapeLeng: true,
          shapeLe1: true,
          shapeLe2: true,
          shapeLe3: true,
          shapeLe4: true,
          shapeLe5: true,
          // Exclude geom for now to avoid PostGIS issues
        },
      }),
      prisma.jalanLingkunganKubuRaya.count({ where }),
    ]);

    res.json({
      success: true,
      data: roads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching roads:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch roads",
    });
  }
});

// GET /api/jalan/geojson - Get all roads as GeoJSON with PostGIS geometry
// MUST BE BEFORE /:id route
router.get("/geojson", async (req, res) => {
  try {
    const { kecamatan, desa, kondisi, tahun } = req.query;

    // Build WHERE clause
    let whereConditions = [];
    let params = [];

    if (kecamatan) {
      whereConditions.push(
        `kecamatan ILIKE '%' || $${params.length + 1} || '%'`
      );
      params.push(kecamatan);
    }

    if (desa) {
      whereConditions.push(`desa ILIKE '%' || $${params.length + 1} || '%'`);
      params.push(desa);
    }

    if (kondisi) {
      whereConditions.push(`kondisi = $${params.length + 1}`);
      params.push(kondisi);
    }

    if (tahun) {
      whereConditions.push(`tahun = $${params.length + 1}`);
      params.push(tahun);
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    // Use raw SQL to get geometry as text (WKT format)
    const query = `
      SELECT 
        id, fid, no_ruas, nama, nama_jalan,
        panjang_m, lebar_m_, tahun, kondisi,
        nilai, bobot, keterangan, kecamatan, desa,
        ST_AsText(geom) as geom_wkt
      FROM jalan_lingkungan_kubu_raya
      ${whereClause}
      ORDER BY id;
    `;

    const roads = await prisma.$queryRawUnsafe(query, ...params);

    // Convert to GeoJSON
    const features = [];

    for (const road of roads) {
      if (!road.geom_wkt) continue;

      try {
        // Parse WKT geometry to coordinates
        const geomStr = road.geom_wkt;

        // Simple WKT parser for LINESTRING
        let coordinates = [];
        if (geomStr && geomStr.startsWith("LINESTRING")) {
          const coordsStr = geomStr.replace("LINESTRING(", "").replace(")", "");
          const pairs = coordsStr.split(",");
          coordinates = pairs.map((pair) => {
            const [lon, lat] = pair.trim().split(" ");
            return [parseFloat(lon), parseFloat(lat)];
          });
        }

        if (coordinates.length > 0) {
          features.push({
            type: "Feature",
            id: road.id,
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
            properties: {
              id: road.id,
              fid: road.fid,
              noRuas: road.no_ruas,
              nama: road.nama,
              namaJalan: road.nama_jalan,
              panjangM: road.panjang_m,
              lebarM: road.lebar_m_,
              tahun: road.tahun,
              kondisi: road.kondisi,
              nilai: road.nilai,
              bobot: road.bobot,
              keterangan: road.keterangan,
              kecamatan: road.kecamatan,
              desa: road.desa,
            },
          });
        }
      } catch (parseError) {
        console.error(
          `Error parsing geometry for road ${road.id}:`,
          parseError
        );
        // Skip this road if geometry parsing fails
      }
    }

    const geojson = {
      type: "FeatureCollection",
      features: features,
    };

    console.log(`GeoJSON generated with ${features.length} features`);

    res.json({
      success: true,
      data: geojson,
    });
  } catch (error) {
    console.error("Error fetching GeoJSON:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      success: false,
      error: "Failed to fetch GeoJSON data",
      message: error.message,
    });
  }
});

// GET /api/jalan/stats/summary - Get summary statistics
// MUST BE BEFORE /:id route
router.get("/stats/summary", async (req, res) => {
  try {
    const [totalRoads, totalLength, conditionStats, kecamatanStats, yearStats] =
      await Promise.all([
        prisma.jalanLingkunganKubuRaya.count(),
        prisma.jalanLingkunganKubuRaya.aggregate({
          _sum: {
            panjangM: true,
          },
        }),
        prisma.jalanLingkunganKubuRaya.groupBy({
          by: ["kondisi"],
          _count: {
            kondisi: true,
          },
          _sum: {
            panjangM: true,
          },
        }),
        prisma.jalanLingkunganKubuRaya.groupBy({
          by: ["kecamatan"],
          _count: {
            kecamatan: true,
          },
          _sum: {
            panjangM: true,
          },
          orderBy: {
            _count: {
              kecamatan: "desc",
            },
          },
          take: 10,
        }),
        prisma.jalanLingkunganKubuRaya.groupBy({
          by: ["tahun"],
          _count: {
            tahun: true,
          },
          _sum: {
            panjangM: true,
          },
          orderBy: {
            tahun: "desc",
          },
        }),
      ]);

    res.json({
      success: true,
      data: {
        totalRoads,
        totalLength: totalLength._sum.panjangM || 0,
        conditionStats,
        kecamatanStats,
        yearStats,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
    });
  }
});

// GET /api/jalan/filters/kecamatan - Get distinct kecamatan list
// MUST BE BEFORE /:id route
router.get("/filters/kecamatan", async (req, res) => {
  try {
    const kecamatans = await prisma.jalanLingkunganKubuRaya.findMany({
      select: {
        kecamatan: true,
      },
      distinct: ["kecamatan"],
      where: {
        kecamatan: {
          not: null,
        },
      },
      orderBy: {
        kecamatan: "asc",
      },
    });

    res.json({
      success: true,
      data: kecamatans.map((k) => k.kecamatan).filter(Boolean),
    });
  } catch (error) {
    console.error("Error fetching kecamatan options:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch kecamatan options",
    });
  }
});

// GET /api/jalan/filters/desa - Get distinct desa list (optionally filtered by kecamatan)
// MUST BE BEFORE /:id route
router.get("/filters/desa", async (req, res) => {
  try {
    const { kecamatan } = req.query;

    const where = {
      desa: {
        not: null,
      },
    };

    // If kecamatan is provided, filter desa by kecamatan
    if (kecamatan) {
      where.kecamatan = kecamatan;
    }

    const desas = await prisma.jalanLingkunganKubuRaya.findMany({
      select: {
        desa: true,
      },
      distinct: ["desa"],
      where,
      orderBy: {
        desa: "asc",
      },
    });

    res.json({
      success: true,
      data: desas.map((d) => d.desa).filter(Boolean),
    });
  } catch (error) {
    console.error("Error fetching desa options:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch desa options",
    });
  }
});

// GET /api/jalan/filters/options - Get filter options
// MUST BE BEFORE /:id route
router.get("/filters/options", async (req, res) => {
  try {
    const [kecamatans, desas, kondisiOptions, tahunOptions] = await Promise.all(
      [
        prisma.jalanLingkunganKubuRaya.findMany({
          select: {
            kecamatan: true,
          },
          distinct: ["kecamatan"],
          where: {
            kecamatan: {
              not: null,
            },
          },
          orderBy: {
            kecamatan: "asc",
          },
        }),
        prisma.jalanLingkunganKubuRaya.findMany({
          select: {
            desa: true,
          },
          distinct: ["desa"],
          where: {
            desa: {
              not: null,
            },
          },
          orderBy: {
            desa: "asc",
          },
        }),
        prisma.jalanLingkunganKubuRaya.findMany({
          select: {
            kondisi: true,
          },
          distinct: ["kondisi"],
          where: {
            kondisi: {
              not: null,
            },
          },
          orderBy: {
            kondisi: "asc",
          },
        }),
        prisma.jalanLingkunganKubuRaya.findMany({
          select: {
            tahun: true,
          },
          distinct: ["tahun"],
          where: {
            tahun: {
              not: null,
            },
          },
          orderBy: {
            tahun: "desc",
          },
        }),
      ]
    );

    res.json({
      success: true,
      data: {
        kecamatans: kecamatans.map((k) => k.kecamatan).filter(Boolean),
        desas: desas.map((d) => d.desa).filter(Boolean),
        kondisiOptions: kondisiOptions.map((k) => k.kondisi).filter(Boolean),
        tahunOptions: tahunOptions.map((t) => t.tahun).filter(Boolean),
      },
    });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch filter options",
    });
  }
});

// GET /api/jalan/:id/geometry - Get road geometry
// MUST BE BEFORE /:id route (more specific path)
router.get("/:id/geometry", async (req, res) => {
  try {
    const { id } = req.params;

    const road = await prisma.jalanLingkunganKubuRaya.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        geom: true,
        nama: true,
        namaJalan: true,
      },
    });

    if (!road) {
      return res.status(404).json({
        success: false,
        error: "Road not found",
      });
    }

    res.json({
      success: true,
      data: road,
    });
  } catch (error) {
    console.error("Error fetching road geometry:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch road geometry",
    });
  }
});

// GET /api/jalan/:id - Get road by ID
// MUST BE LAST - catches all GET requests with an ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const road = await prisma.jalanLingkunganKubuRaya.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        fid: true,
        noRuas: true,
        noProv: true,
        noKab: true,
        noKec: true,
        noDesa: true,
        noJalan: true,
        nama: true,
        namaJalan: true,
        panjangM: true,
        lebarM: true,
        tahun: true,
        kondisi: true,
        nilai: true,
        bobot: true,
        keterangan: true,
        kecamatan: true,
        desa: true,
        utmXAwal: true,
        utmYAwal: true,
        pngnlAwal: true,
        utmXAkhi: true,
        utmYAkhi: true,
        pngnlAkhi: true,
        shapeLeng: true,
        shapeLe1: true,
        shapeLe2: true,
        shapeLe3: true,
        shapeLe4: true,
        shapeLe5: true,
      },
    });

    if (!road) {
      return res.status(404).json({
        success: false,
        error: "Road not found",
      });
    }

    res.json({
      success: true,
      data: road,
    });
  } catch (error) {
    console.error("Error fetching road:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch road",
    });
  }
});

// POST /api/jalan - Create new road (if needed for admin)
router.post("/", async (req, res) => {
  try {
    const roadData = req.body;

    const newRoad = await prisma.jalanLingkunganKubuRaya.create({
      data: roadData,
    });

    res.status(201).json({
      success: true,
      data: newRoad,
    });
  } catch (error) {
    console.error("Error creating road:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create road",
    });
  }
});

// PUT /api/jalan/:id - Update road (if needed for admin)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRoad = await prisma.jalanLingkunganKubuRaya.update({
      where: {
        id: parseInt(id),
      },
      data: updateData,
    });

    res.json({
      success: true,
      data: updatedRoad,
    });
  } catch (error) {
    console.error("Error updating road:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update road",
    });
  }
});

// DELETE /api/jalan/:id - Delete road (if needed for admin)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.jalanLingkunganKubuRaya.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      success: true,
      message: "Road deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting road:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete road",
    });
  }
});

module.exports = router;
