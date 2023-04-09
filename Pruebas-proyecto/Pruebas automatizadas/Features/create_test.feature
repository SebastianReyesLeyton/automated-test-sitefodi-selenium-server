Feature: Creacion de prueba
    Como usuario supervisor quiero crear pruebas

    Scenario: Creacion de pregunta
        Given Un supervisor logueado
        When Escribo en el nombre y la descripción de la prueba
        And Le doy clic en enviar para crear la prueba
        Then La aplicacion arroja un alert exitoso