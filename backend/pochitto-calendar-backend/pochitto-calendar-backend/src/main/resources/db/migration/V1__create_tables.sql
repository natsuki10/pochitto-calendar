-- V1__create_tables.sql
-- Pochitto Calendar: initial tables

-- =========================
-- users
-- =========================
CREATE TABLE users (
  id            UUID PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- =========================
-- tags (user-specific)
-- =========================
CREATE TABLE tags (
  id         UUID PRIMARY KEY,
  user_id    UUID         NOT NULL,
  name       VARCHAR(50)  NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_tags_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT uq_tags_user_name
    UNIQUE (user_id, name)
);

-- =========================
-- daily_records (one per user per date)
-- =========================
CREATE TABLE daily_records (
  id          UUID        PRIMARY KEY,
  user_id     UUID        NOT NULL,
  record_date DATE        NOT NULL,
  effort      SMALLINT    NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_daily_records_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT uq_daily_records_user_date
    UNIQUE (user_id, record_date),

  CONSTRAINT ck_daily_records_effort
    CHECK (effort BETWEEN 0 AND 4)
);

-- =========================
-- daily_record_tags (many-to-many)
-- =========================
CREATE TABLE daily_record_tags (
  daily_record_id UUID NOT NULL,
  tag_id          UUID NOT NULL,

  CONSTRAINT pk_daily_record_tags
    PRIMARY KEY (daily_record_id, tag_id),

  -- 日別記録が消えたら紐づきも消す
  CONSTRAINT fk_drt_daily_record
    FOREIGN KEY (daily_record_id)
    REFERENCES daily_records(id)
    ON DELETE CASCADE,

  -- タグが消えたら紐づきも消す（仕様：削除後は全recordsから該当tagIdを除去）
  CONSTRAINT fk_drt_tag
    FOREIGN KEY (tag_id)
    REFERENCES tags(id)
    ON DELETE CASCADE
);

-- =========================
-- indexes (optional but recommended)
-- =========================
CREATE INDEX idx_tags_user_id ON tags(user_id);
CREATE INDEX idx_daily_records_user_id ON daily_records(user_id);
CREATE INDEX idx_daily_record_tags_tag_id ON daily_record_tags(tag_id);
