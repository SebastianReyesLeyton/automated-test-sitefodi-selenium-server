Feature: Creacion de preguntas tipo carta en pruebas ya creadas
    Como usuario supervisor quiero crear preguntas en pruebas ya creadas

    Scenario: Creacion de pregunta tipo carta escribiendo solo el nombre
        Given Un supervisor logueado
        And Una prueba creada
        When Creo una pregunta tipo carta en una prueba creada
        And Escribo solo el nombre de la pregunta 
        And Le doy clic en enviar para crear la pregunta
        Then La aplicacion arroja un alert de resultado satisfactorio

    Scenario: Creacion de pregunta tipo carta
        Given Un supervisor logueado
        When Creo una pregunta tipo carta en una prueba creada
        And Le doy clic en enviar para crear la pregunta
        Then La aplicacion guarda la pregunta, se queda en la misma pagina y envia un alert exitoso
    
    Scenario: Creacion de preguntas tipo carta
        Given Un supervisor logueado
        When Creo varias preguntas tipo carta en una prueba creada
        And Le doy clic en enviar por cada pregunta que voy a preguntar
        And Le doy clic en volver
        Then La aplicacion guarda todas las preguntas creadas

    Scenario Outline: Creacion de pregunta tipo carta escribiendo solo en <score> con caracteres no numericos
        Given Un supervisor logueado
        When Creo una pregunta tipo carta en una prueba creada
        And Escribo solo en <score> con caracteres no numericos
        Then La aplicacion no deja escribir caracteres no numericos en la caja de texto <score> y continua vacio

    Examples: Puntajes
        | score |
        | puntaje para si |
        | puntaje para no |