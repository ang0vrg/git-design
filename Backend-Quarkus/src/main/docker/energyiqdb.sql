-- =====================================================
--  USUARIOS
-- =====================================================
CREATE TABLE users (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50)  NOT NULL UNIQUE,
  email         VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('ADMIN','OPERATOR','CLIENT') DEFAULT 'CLIENT',
  phone         VARCHAR(20),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_phone CHECK (phone REGEXP '^\\+[0-9]{7,15}$')
);

-- =====================================================
--  EDIFICIOS / SEDES
-- =====================================================
CREATE TABLE buildings (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  address     VARCHAR(255),
  city        VARCHAR(60),
  country     VARCHAR(2) DEFAULT 'PE',
  lat         DECIMAL(10,8),
  lon         DECIMAL(11,8),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
--  MEDIDORES (por edificio)
-- =====================================================
CREATE TABLE meters (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  building_id     BIGINT NOT NULL,
  meter_code      VARCHAR(30) NOT NULL UNIQUE,
  model           VARCHAR(60),
  installation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_meter_building
    FOREIGN KEY (building_id) REFERENCES buildings(id)
    ON DELETE CASCADE
);

-- =====================================================
--  CONSUMOS (lecturas)
-- =====================================================
CREATE TABLE consumptions (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  meter_id      BIGINT NOT NULL,
  kwh           DECIMAL(10,3) NOT NULL,
  reading_at    TIMESTAMP NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cons_meter
    FOREIGN KEY (meter_id) REFERENCES meters(id)
    ON DELETE CASCADE,
  INDEX idx_reading (reading_at)
);

-- =====================================================
--  ALERTAS
-- =====================================================
CREATE TABLE alerts (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  building_id BIGINT NOT NULL,
  type        ENUM('HIGH_CONSUMPTION','POWER_OUTAGE','FAULT') NOT NULL,
  message     VARCHAR(255),
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_alert_building
    FOREIGN KEY (building_id) REFERENCES buildings(id)
    ON DELETE CASCADE
);

-- =====================================================
--  REPORTES (JSON + metadatos)
-- =====================================================
CREATE TABLE reports (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  building_id  BIGINT,
  report_type  ENUM('DAILY','WEEKLY','MONTHLY','CUSTOM') NOT NULL,
  start_date   DATE NOT NULL,
  end_date     DATE NOT NULL,
  payload      JSON,        -- datos del reporte
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_report_building
    FOREIGN KEY (building_id) REFERENCES buildings(id)
    ON DELETE SET NULL
);