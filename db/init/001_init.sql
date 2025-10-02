-- Création table chantiers
CREATE TABLE IF NOT EXISTS chantiers (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  ville TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Création table incidents
CREATE TABLE IF NOT EXISTS incidents (
  id SERIAL PRIMARY KEY,
  chantier_id INT REFERENCES chantiers(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  statut TEXT NOT NULL DEFAULT 'ouvert',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Données initiales
INSERT INTO chantiers (nom, ville) VALUES
  ('Résidence Atlas', 'Casablanca'),
  ('Immeuble Ifriqya', 'Rabat')
ON CONFLICT DO NOTHING;
