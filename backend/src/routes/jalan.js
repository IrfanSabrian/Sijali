const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/jalan - Get all roads with pagination and filtering
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
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

// GET /api/jalan/:id - Get road by ID
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

// GET /api/jalan/:id/geometry - Get road geometry
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

// GET /api/jalan/stats/summary - Get summary statistics
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

// GET /api/jalan/filters/options - Get filter options
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
