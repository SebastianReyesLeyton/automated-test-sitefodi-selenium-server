-- -------------------------------------------------------- --
-- 
-- Name: 1-auth.sql
-- Author: Juan Sebastian Reyes Leyton (sebas.reyes2002@hotmail.com)
-- Version: 1.0
-- Description: Build a database with auth tables needed by project
-- 
-- -------------------------------------------------------- --

-- -------------------------------------------------------- --
--                 DATABASE CONFIGURATION                   --
-- -------------------------------------------------------- --

-- While the system is in development step run this command
DROP DATABASE IF EXISTS sitefodi_auth;

-- Create the database for the project
CREATE DATABASE IF NOT EXISTS sitefodi_auth;

-- Grant privileges by dev user
GRANT ALL PRIVILEGES ON sitefodi_auth.* TO 'dev'@'%';

-- Refresh the privileges
FLUSH PRIVILEGES;

-- -------------------------------------------------------- --
--                   DATABASE DEFINITION                    --
-- -------------------------------------------------------- --

USE sitefodi_auth;

-- Refresh tokens table

CREATE TABLE refresh_tokens_table (

    token   VARCHAR(24),
    expire  DATETIME,
    user    INTEGER,
    PRIMARY KEY (token),
    FOREIGN KEY (user) REFERENCES sitefodi_users.user_table(id)

);

CREATE EVENT remove_refresh_tokens 
    ON SCHEDULE 
        EVERY 10 SECOND 
        STARTS CURRENT_TIMESTAMP
    COMMENT 'Remove refresh tokens when their own when expire in'
    DO DELETE FROM refresh_tokens_table WHERE expire <= NOW();

-- -------------------------------------------------------- --
--                DATABASE DEFAULT VALUES                   --
-- -------------------------------------------------------- --

INSERT INTO refresh_tokens_table(token, expire, user) VALUES
    ('h^!JGJnHVizm5^ojgLij5/6K', DATE_ADD(NOW(), INTERVAL 1 MINUTE), 1),
    ('h^!JGJnHVizm5^ojgLilpasK', DATE_ADD(NOW(), INTERVAL 2 MINUTE), 2);