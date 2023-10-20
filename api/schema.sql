-- psql -U $POSTGRES_USER $POSTGRES_DB


drop table if exists Submissions;
drop table if exists Assignment;
drop table if exists UserAccount;

create table UserAccount (
  sub  TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_admin boolean DEFAULT FALSE
);

create table Assignment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  show_reference_braille boolean,
  show_live_preview boolean,
  type TEXT
);

create table Submissions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id     UUID NOT NULL REFERENCES Assignment (id),
  user_id           TEXT NOT NULL,
  grade             FLOAT,
  submitted_text    TEXT,
  submitted_date    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- truncate assignment cascade;
-- update useraccount set is_admin = true where sub = 'google-oauth2|115592117519410910374';
-- update useraccount set is_admin = true where name = 'alex mickelson';
