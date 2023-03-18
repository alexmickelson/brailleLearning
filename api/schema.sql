-- export PGPASSWORD=$POSTGRES_PASSWORD && psql -U $POSTGRES_USER $POSTGRES_DB


drop table if exists Submissions;
drop table if exists Assignment;
drop table if exists UserAccount;

create table UserAccount (
  sub  TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_admin boolean
);

create table Assignment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  show_reference_braille boolean,
  show_print_feed boolean,
  type TEXT
);

create table Submissions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id     UUID NOT NULL REFERENCES Assignment (id),
  user_id           TEXT NOT NULL,
  grade             FLOAT,
  submitted_text    TEXT
);


-- truncate assignment cascade;