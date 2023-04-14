-- -------------------------------------------------------- --
-- 
-- Name: 2-tests.sql
-- Author: Juan Sebastian Reyes Leyton (sebas.reyes2002@hotmail.com)
-- Version: 2.1
-- Description: Build a database with test tables needed by project
-- 
-- -------------------------------------------------------- --

-- -------------------------------------------------------- --
--                 DATABASE CONFIGURATION                   --
-- -------------------------------------------------------- --

-- While the system is in development step run this command
DROP DATABASE IF EXISTS sitefodi_tests;

-- Create the database for the project
CREATE DATABASE IF NOT EXISTS sitefodi_tests;

-- Grant privileges by dev user
GRANT ALL PRIVILEGES ON sitefodi_tests.* TO 'dev'@'%';

-- Refresh the privileges
FLUSH PRIVILEGES;

-- -------------------------------------------------------- --
--                   DATABASE DEFINITION                    --
-- -------------------------------------------------------- --

USE sitefodi_tests;

-- Images table

CREATE TABLE images_table (

    id      INTEGER AUTO_INCREMENT,
    imgURL  LONGTEXT NOT NULL,
    PRIMARY KEY (id)
    
);

-- Question type table

CREATE TABLE question_type_table (

    id              INTEGER AUTO_INCREMENT,
    qtype           VARCHAR(255) NOT NULL,
    descriptionP    TEXT NOT NULL,
    PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Question table

CREATE TABLE question_table (

    id      INTEGER AUTO_INCREMENT,
    idtype  INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idtype) REFERENCES question_type_table(id)

);

-- Card question table 

CREATE TABLE card_question_table (

    id              INTEGER,
    therapistTitle  VARCHAR(255) NOT NULL DEFAULT 'Pregunta tipo carta',
    patientTitle    VARCHAR(255) NOT NULL DEFAULT 'Sigue las instrucciones del terapeuta',
    cardnameT       VARCHAR(80) NOT NULL,
    cardnameP       VARCHAR(80) NOT NULL,
    img             INTEGER NOT NULL,
    yesValue        INTEGER NOT NULL DEFAULT 1,
    noValue         INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES question_table(id),
    FOREIGN KEY (img) REFERENCES images_table(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Words question table

CREATE TABLE words_question_table (

    id              INTEGER,
    patientTitle    VARCHAR(255) NOT NULL DEFAULT 'Pregunta tipo palabras', 
    pDescription    VARCHAR(255) NOT NULL DEFAULT 'Repite la palabra que el terapeuta te dirá',
    words           JSON NOT NULL,
    yesValue        INTEGER NOT NULL DEFAULT 1,
    noValue         INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES question_table(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Cards question table

CREATE TABLE cards_question_table (

    id              INTEGER,
    patientTitle    VARCHAR(255) NOT NULL DEFAULT 'Juego de cartas',
    rounds          INTEGER NOT NULL DEFAULT 1 CHECK( rounds > 0 ),
    imgs            JSON NOT NULL,
    correctValue    INTEGER NOT NULL DEFAULT 1,
    wrongValue      INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES question_table(id)

);

-- Test table

CREATE TABLE test_table (

    id              INTEGER AUTO_INCREMENT,
    tName           VARCHAR(255) NOT NULL UNIQUE,
    tDescription    TEXT,
    isEditable      TINYINT(1) NOT NULL DEFAULT 1,          
    PRIMARY KEY(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Questions test relation

CREATE TABLE test_questions_table (

    idTest          INTEGER,
    idQuestion      INTEGER,
    questionOrder   INTEGER AUTO_INCREMENT,
    PRIMARY KEY (idTest, questionOrder),
    FOREIGN KEY (idTest) REFERENCES test_table(id),
    FOREIGN KEY (idQuestion) REFERENCES question_table(id)

) ENGINE=MyISAM;

-- -------------------------------------------------------- --
--                DATABASE DEFAULT VALUES                   --
-- -------------------------------------------------------- --

-- Questions type

INSERT INTO question_type_table (id, qtype, descriptionP) VALUES
    ( 1, 'Carta', 'Esta pregunta muestra al paciente una carta con su nombre y el fonoaudiologo debe encargar de preguntar la palabra que describio' ),
    ( 2, 'Cartas', 'Al paciente se le presenta un conjunto de cartas y el tendrá que seleccionar la que el terapeuta le indique' ),
    ( 3, 'Palabras', 'Se le presenta al terapeuta un conjunto de palabras que deberá decirle al niño y este al repetirlas se le calificará si las dice bien o mal' );