-- -------------------------------------------------------- --
-- 
-- Name: 3-theraphy.sql
-- Author: Juan Sebastian Reyes Leyton (sebas.reyes2002@hotmail.com)
-- Version: 1.0
-- Description: Build a database with therapy tables needed by project
-- 
-- -------------------------------------------------------- --

-- -------------------------------------------------------- --
--                 DATABASE CONFIGURATION                   --
-- -------------------------------------------------------- --

-- While the system is in development step run this command
DROP DATABASE IF EXISTS sitefodi_therapy;

-- Create the database for the project
CREATE DATABASE IF NOT EXISTS sitefodi_therapy;

-- Grant privileges by dev user
GRANT ALL PRIVILEGES ON sitefodi_therapy.* TO 'dev'@'%';

-- Refresh the privileges
FLUSH PRIVILEGES;

-- -------------------------------------------------------- --
--                   DATABASE DEFINITION                    --
-- -------------------------------------------------------- --

USE sitefodi_therapy;

-- Therapy table

CREATE TABLE therapy_table ( 

    id                  INTEGER AUTO_INCREMENT,
    urlTherapy          TEXT NOT NULL,
    dateT               DATETIME NOT NULL,
    idRelation          INTEGER NOT NULL,
    idTest              INTEGER,
    stateT              ENUM('creada', 'en progreso', 'finalizada') DEFAULT 'creada',
    questionLocation    INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (idRelation) REFERENCES sitefodi_users.relation_therapist_patient_table(id),
    FOREIGN KEY (idTest) REFERENCES sitefodi_tests.test_table(id) 

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Therapy event

CREATE EVENT active_therapy_session 
    ON SCHEDULE 
        EVERY 10 SECOND 
        STARTS CURRENT_TIMESTAMP
    COMMENT 'Active the therapy session when the date in completed'
    DO UPDATE therapy_table SET stateT = 'en progreso' WHERE dateT <= NOW() AND stateT = 'creada';