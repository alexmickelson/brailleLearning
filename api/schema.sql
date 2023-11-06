-- psql -U $POSTGRES_USER $POSTGRES_DB


drop table if exists Submission;
drop table if exists AssignmentPrerequisite;
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
  points INTEGER NOT NULL,
  show_reference_braille boolean,
  show_live_preview boolean,
  reference_braille TEXT,
  available_date timestamp with time zone,
  closed_date timestamp with time zone,
  type TEXT
);

create table AssignmentPrerequisite (
  assignment_id       UUID NOT NULL REFERENCES Assignment (id),
  prereq_assignment_id       UUID NOT NULL REFERENCES Assignment (id)
);

create table Submission (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id       UUID NOT NULL REFERENCES Assignment (id),
  user_sub             TEXT NOT NULL,
  grade               FLOAT,
  seconds_to_complete FLOAT NOT NULL,
  submitted_text      TEXT,
  submitted_date      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  graded_by_user_sub  TEXT
);


-- truncate assignment cascade;
-- update useraccount set is_admin = true where sub = 'google-oauth2|115592117519410910374';
-- update useraccount set is_admin = true where name = 'alex mickelson';
