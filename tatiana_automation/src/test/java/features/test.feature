Feature: Access to the system

  Scenario Outline: Unsuccessful login
    Given A user enters a email <username>
    When User enters a password <password>
    And User clicks on Ingresar
    Then An alert is showed <response>

    Examples:
      | username                    | password   | response                                           |
      |                             |            | Error: No es un correo válido                      |
      |                             | Epyphone01 | Error: No es un correo válido                      |
      | sebas.reyes2002@hotmail.com |            | Error: La contraseña debe ser mayor a 8 caracteres |
      | sebas.reyes2002@hotmail.com | asdf       | Error: La contraseña debe ser mayor a 8 caracteres |
      | sebas.reyes2002@hotmail.com | asdfghjkl  | Error: Las contraseñas no coinciden                |
      | tatiana179@hotmail.com      | Epyphone01 | Error: No existe un usuario con ese correo         |
      | tatiana179@hotmail.com      |            | Error: La contraseña debe ser mayor a 8 caracteres |

  Scenario Outline: Successful login
    Given A user enters a email <username>
    When User enters a password <password>
    And User clicks on Ingresar
    Then Home page and <role> are showed

    Examples:
      | username                    | password   | role       |
      | vane.loaiza@hotmail.com     | vane0123   | Paciente   |
      | juaninreyes2002@hotmail.com | Epyphone01 | Terapeuta  |
      | sebas.reyes2002@hotmail.com | Epyphone01 | Supervisor |

  Scenario Outline: Home Menu
    Given A user enters a email <username>
    When User enters a password <password>
    And User clicks on Ingresar
    And User clicks on <option> on homepage
    Then New page is <newpage>

    Examples:
      | username                    | password   | option             | newpage                                  |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | http://localhost:3000/register/therapist |
      | sebas.reyes2002@hotmail.com | Epyphone01 | VerTerapista       | http://localhost:3000/show/therapist     |
      | sebas.reyes2002@hotmail.com | Epyphone01 | CrearPrueba        | http://localhost:3000/create-test        |
      | sebas.reyes2002@hotmail.com | Epyphone01 | EditarPrueba       | http://localhost:3000/show-tests         |
      | vane.loaiza@hotmail.com     | vane0123   | AsistirTerapia     | http://localhost:3000/schedule-therapies |
      | juaninreyes2002@hotmail.com | Epyphone01 | RegistrarPaciente  | http://localhost:3000/register/patient   |
      | juaninreyes2002@hotmail.com | Epyphone01 | EditarPaciente     | http://localhost:3000/show/patient       |
      | juaninreyes2002@hotmail.com | Epyphone01 | AgendarTerapia     | http://localhost:3000/add-therapy        |
      | juaninreyes2002@hotmail.com | Epyphone01 | Resultados         | http://localhost:3000/results            |

  Scenario Outline: New page title
    Given A user enters a email <username>
    When User enters a password <password>
    And User clicks on Ingresar
    And User clicks on <option> on homepage
    Then New page title is showed <title>

    Examples:
      | username                    | password   | option             | title                 |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | Registrar terapeuta   |
      | sebas.reyes2002@hotmail.com | Epyphone01 | VerTerapista       | Ver terapeutas        |
      | sebas.reyes2002@hotmail.com | Epyphone01 | CrearPrueba        | Crear prueba          |
      | sebas.reyes2002@hotmail.com | Epyphone01 | EditarPrueba       | Pruebas en desarrollo |


  Scenario Outline: Failed Test Creation
    Given A user enters a email <username>
    When User enters a password <password>
    And User clicks on Ingresar
    And User clicks on <option> on homepage
    And User create a <testName>
    And User clicks on ENVIAR
    Then An alert is showed <response>

    Examples:
      | username                    | password   | option      | testName | response                                |
      | sebas.reyes2002@hotmail.com | Epyphone01 | CrearPrueba | Colores  | Error: Ya existe un test con ese nombre |
      | sebas.reyes2002@hotmail.com | Epyphone01 | CrearPrueba |          | Error: Campo nombre vacio               |

  Scenario Outline: Successful Test Creation
    Given A user enters a email <username>
    When User enters a password <password>
    And User clicks on Ingresar
    And User clicks on <option> on homepage
    And User create a <testName>
    And User clicks on ENVIAR
    Then A success alert is showed <message>

    Examples:
      | username                    | password   | option      | testName | message                 |
      | sebas.reyes2002@hotmail.com | Epyphone01 | CrearPrueba | Prueba75 | Éxito: Creada con éxito |

  Scenario Outline: Unsuccessful therapist registration - Identification card validation
    Given A user enters a email <username>
    When User enters a password <password>
    And User clicks on Ingresar
    And User clicks on <option> on homepage
    And User enters therapist name information <name>
    And User enters therapist email information <email>
    And User enters therapist password information <password>
    And User enters therapist identification card information <identification>
    And User clicks on ENVIAR
    Then An alert is showed <response>

    Examples:
      | username                    | password   | option             | name   | email      | password | identification         | response                                                            |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | Andres | bp@abc.com | Test123  |                        | Error: Campo cédula vacio                                           |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | Andres | bq@abc.com | Test123  | 22599                  | Error: La cédula debe ser mayor a 6 caracteres                      |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | Andres | br@abc.com | Test123  | 22699A                 | Error: La cédula debe ser numérica                                  |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | Andres | bs@abc.com | Test123  | 1234567890123469999B   | Error: La cédula debe ser numérica                                  |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | Andres | bt@abc.com | Test123  | 1234567890123469999029 | Error: El número de documento excede el máximo número de caracteres |

  Scenario Outline: Successful therapist registration - Identification card validation
    Given A user enters a email <username>
    When User enters a password <password>
    And User clicks on Ingresar
    And User clicks on <option> on homepage
    And User enters therapist name information <name>
    And User enters therapist email information <email>
    And User enters therapist password information <password>
    And User enters therapist identification card information <identification>
    And User clicks on ENVIAR
    Then A success alert is showed <message>

    Examples:
      | username                    | password   | option             | name   | email      | password | identification       | message                     |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | Andres | ze@abc.com | Test123  | 123459               | Éxito: Registrado con éxito |
      | sebas.reyes2002@hotmail.com | Epyphone01 | RegistrarTerapista | Andres | zf@abc.com | Test123  | 22345678901234569994 | Éxito: Registrado con éxito |
