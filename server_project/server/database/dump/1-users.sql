-- -------------------------------------------------------- --
-- 
-- Name: 1-users.sql
-- Author: Juan Sebastian Reyes Leyton (sebas.reyes2002@hotmail.com)
-- Version: 2.0
-- Description: Build a database with user tables needed by project
-- 
-- -------------------------------------------------------- --

-- -------------------------------------------------------- --
--                 DATABASE CONFIGURATION                   --
-- -------------------------------------------------------- --

-- While the system is in development step run this command
DROP DATABASE IF EXISTS sitefodi_users;

-- Create the database for the project
CREATE DATABASE IF NOT EXISTS sitefodi_users;

-- Grant privileges by dev user
GRANT ALL PRIVILEGES ON sitefodi_users.* TO 'dev'@'%';

-- Refresh the privileges
FLUSH PRIVILEGES;

-- -------------------------------------------------------- --
--                   DATABASE DEFINITION                    --
-- -------------------------------------------------------- --

USE sitefodi_users;

-- Rol schema

CREATE TABLE rol_table (

    rol VARCHAR(10),
    PRIMARY KEY(rol)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Document type schema 

CREATE TABLE document_type (

    id      INTEGER AUTO_INCREMENT,
    doctype VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Gender

CREATE TABLE gender_type (

    gender  VARCHAR(30),
    PRIMARY KEY (gender)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- User table schema

CREATE TABLE user_table (

    id          INTEGER AUTO_INCREMENT,
    fullname    VARCHAR(255) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    passcode    TEXT NOT NULL,
    rol         VARCHAR(10) NOT NULL,
    doctype     INTEGER NOT NULL,
    docnum      VARCHAR(20) NOT NULL UNIQUE,
    isActive    TINYINT(1) DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (rol) REFERENCES rol_table(rol),
    FOREIGN KEY (doctype) REFERENCES document_type(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Patient table schema

CREATE TABLE patient_table ( 

    id          INTEGER, 
    gender      VARCHAR(30) NOT NULL,
    leftHAID    VARCHAR(255) NOT NULL DEFAULT '',
    rightHAID   VARCHAR(255) NOT NULL DEFAULT '',
    dateofBirth DATE CHECK (dateofBirth < DATE(NOW())),
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES user_table(id),
    FOREIGN KEY (gender) REFERENCES gender_type(gender)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Relation between patients and therapists

CREATE TABLE relation_therapist_patient_table (

    id          INTEGER AUTO_INCREMENT,
    idTherapist INTEGER NOT NULL,
    idPatient   INTEGER NOT NULL,
    isActive    TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (idTherapist) REFERENCES user_table(id),
    FOREIGN KEY (idPatient) REFERENCES patient_table(id)

);

-- -------------------------------------------------------- --
--                DATABASE DEFAULT VALUES                   --
-- -------------------------------------------------------- --

-- Rol

INSERT INTO rol_table (rol) VALUES 
    ('paciente'),
    ('supervisor'),
    ('terapeuta'),
    ('admin');

-- Document type

INSERT INTO document_type (id, doctype) VALUES 
    (1, 'cédula de ciudadanía'),
    (2, 'registro civil'),
    (3, 'tarjeta de identidad'),
    (4, 'otro');

-- Gender

INSERT INTO gender_type (gender) VALUES 
    ( 'masculino' ), 
    ( 'femenino' ),
    ( 'no binario' );

-- Users

INSERT INTO user_table ( id, fullname, email, passcode, rol, doctype, docnum ) VALUES 
    ( 1, 'Juan Sebastian Reyes', 'sebas.reyes2002@hotmail.com', 'rN8X76aGbS67FG0ZWq5YL91arfZffF0eCjI=', 'supervisor', 1, '1006123571' ),
    ( 2, 'Pepito Perez', 'juaninreyes2002@hotmail.com', 'LmlQvShPQuv5U6GxTguTzGnHVWfLgmcCfmk=', 'terapeuta', 1, '1112223334' ),
    ( 3, 'Vanesa Loaiza', 'vane.loaiza@hotmail.com', '0YHrKIj6nCKpEzMeaCLCgvjhYEZRH7/z', 'paciente', 3, '1006147589' ),
    ( 4, 'Anonymus', 'juaninreyes2002@gmail.com', '5HBy3dzm//xDsxIv/tRAdiIn9x0TcK3j', 'admin', 1, '1006123572' );

-- Patient

INSERT INTO patient_table ( id, gender, leftHAID, rightHAID, dateofBirth ) VALUES 
    ( 3, 'femenino', 'Implante coclear', 'Audifono', '2017-03-17' );

-- Relation between therapist and patient

INSERT INTO relation_therapist_patient_table ( idTherapist, idPatient ) VALUES 
    ( 2, 3 );