-- PostgreSQL schema for single-table aduan storage
-- Photos are stored on disk under: public/aduan/{nomor_ruas}/{auto_renamed_filename}
-- The table keeps an array of photo filenames; the folder path is generated from nomor_ruas

BEGIN;

-- Main table: aduan
CREATE TABLE IF NOT EXISTS aduan (
	id BIGSERIAL PRIMARY KEY,
	nomor_ruas TEXT NOT NULL,
	nama_pelapor TEXT,                      -- boleh NULL (anonim diperbolehkan)
	anonim BOOLEAN NOT NULL DEFAULT FALSE,
	description TEXT,                       -- deskripsi/kronologi (opsional)
	email TEXT,                             -- alamat email (opsional)
	status TEXT NOT NULL DEFAULT 'diajukan'
		CHECK (status IN ('diajukan','ditinjau','selesai','ditolak')),
	
	-- Simpan banyak foto sebagai array nama file (tanpa path)
	-- Aplikasi membangun path lengkap: folder_path || '/' || filename
	photos TEXT[] NOT NULL DEFAULT '{}',

	-- Kolom path folder otomatis: public/aduan/{nomor_ruas}
	folder_path TEXT GENERATED ALWAYS AS ('public/aduan/' || nomor_ruas) STORED,

	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

	-- Validations
	CHECK (length(trim(nomor_ruas)) > 0),
	CHECK (NOT anonim OR nama_pelapor IS NULL)
);

-- Useful indexes
CREATE INDEX IF NOT EXISTS idx_aduan_nomor_ruas ON aduan (nomor_ruas);
CREATE INDEX IF NOT EXISTS idx_aduan_created_at ON aduan (created_at);
CREATE INDEX IF NOT EXISTS idx_aduan_status ON aduan (status);
-- GIN index to search within photos array
CREATE INDEX IF NOT EXISTS idx_aduan_photos ON aduan USING GIN (photos);

-- Trigger to auto-update updated_at on row updates
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_aduan_updated_at ON aduan;
CREATE TRIGGER trg_aduan_updated_at
BEFORE UPDATE ON aduan
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;


