from behave import *
from selenium.webdriver import ChromeOptions, Remote
from selenium.webdriver.common.by import By
import unittest
import time

idx, n = 0, 10

@given('Un supervisor logueado')
def step_impl(ctx):
    # Defining variables
    ctx.chrome_options = ChromeOptions()
    ctx.chrome_options.add_argument("--start-maximized")
    ctx.chrome_options.add_argument("--no-sandbox")
    ctx.driver = Remote(
        command_executor='http://selenium_server:4444/wd/hub',
        options=ctx.chrome_options
    )

    ctx.driver.get('http://frontend:3000/')
    email = "sebas.reyes2002@hotmail.com"
    password = "Epyphone01"

    # User input
    email_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > section.auth-form > form > div:nth-child(2) > div > input')
    email_input.send_keys(email)
    # Password input
    password_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > section.auth-form > form > div:nth-child(3) > div > input')
    password_input.send_keys(password)
    # Click process
    submit = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > section.auth-form > form > button')
    submit.click()

@given("Una prueba creada")
def step_impl(ctx):
    global new_val
    # Process of clicking to create
    create_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.sidebar > div.center > ul > div:nth-child(2) > li:nth-child(2) > a > span')
    create_button.click()

    # Type name and description
    name_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > section.register-form-inputs > div:nth-child(1) > div > div > input')
    name_input.send_keys(f"Prueba aleatoria y nueva{new_val}")
    desc_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > section.register-form-inputs > div:nth-child(2) > div > div > textarea')
    desc_input.send_keys(f"Prueba aleatoria y nueva{new_val}")

    send_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > section.buttons-section > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.login-button.css-sghohy-MuiButtonBase-root-MuiButton-root')
    send_button.click()
    time.sleep(1)

    res = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > div > div.MuiAlert-message.css-1pxa9xg-MuiAlert-message > div > span:nth-child(2)').text
    ans1 = "Ya existe un test con ese nombre"
    ans2 = "Ya tiene una carpeta asociada"
    new_val += 1
    assert (res != ans1 and res != ans2) is True

@when('Creo una pregunta tipo carta en una prueba creada')
def step_impl(ctx):
    # Edit the test
    edit_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.sidebar > div.center > ul > div:nth-child(2) > li:nth-child(3) > a')
    edit_button.click()

    # Click on edit of "prueba 1"
    hover = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > div:nth-child(1)')
    hover.click()
    time.sleep(1)
    edit_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > div:nth-child(1) > div > section.test-card-actions > button:nth-child(1) > span:nth-child(2)')
    edit_button.click()

    # Click on add question of card type
    add_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section.show-test-content > section.show-test-question-types > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > button:nth-child(2)')
    add_button.click()

@when('Escribo solo el nombre de la pregunta')
def step_impl(ctx):
    # Click on card name input
    name_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > div.question-form-content > section.therapist-section > div > div:nth-child(2) > div > input')
    name_input.send_keys("Cualquier nombre")

@when('Le doy clic en enviar para crear la pregunta')
def step_impl(ctx):
    # Click on send
    send_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > div.buttons-section > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.send-button.css-sghohy-MuiButtonBase-root-MuiButton-root')
    send_button.click()
    time.sleep(1)

@then('La aplicacion arroja un alert de resultado satisfactorio')
def step_impl(ctx):
    res = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > div > div.MuiAlert-message.css-1pxa9xg-MuiAlert-message > div > span:nth-child(2)').text
    ctx.driver.close()
    assert res == "Agregada con éxito"

@when('Escribo solo en puntaje para si con caracteres no numericos')
def stem_impl(ctx):
    # Edit the test
    edit_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.sidebar > div.center > ul > div:nth-child(2) > li:nth-child(3) > a')
    edit_button.click()

    # Click on edit of "prueba 1"
    hover = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > div:nth-child(1)')
    hover.click()
    time.sleep(1)
    edit_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > div:nth-child(1) > div > section.test-card-actions > button:nth-child(1) > span:nth-child(2)')
    edit_button.click()

    # Click on add question of card type
    add_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section.show-test-content > section.show-test-question-types > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > button:nth-child(2)')
    add_button.click()
    # Click on card score for yes input
    score_for_yes_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > div.question-form-content > section.therapist-section > div > div:nth-child(3) > div > input')
    score_for_yes_input.send_keys("Cualquier cosa")

@then('La aplicacion no deja escribir caracteres no numericos en la caja de texto puntaje para si y continua vacio')
def step_impl(ctx):
    res = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > div.question-form-content > section.therapist-section > div > div:nth-child(3) > div > input').text
    assert res == ''
    ctx.driver.close()

@when('Escribo solo en puntaje para no con caracteres no numericos')
def stem_impl(ctx):
    # Edit the test
    edit_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.sidebar > div.center > ul > div:nth-child(2) > li:nth-child(3) > a')
    edit_button.click()

    # Click on edit of "prueba 1"
    hover = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > div:nth-child(1)')
    hover.click()
    time.sleep(1)
    edit_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > div:nth-child(1) > div > section.test-card-actions > button:nth-child(1) > span:nth-child(2)')
    edit_button.click()

    # Click on add question of card type
    add_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section.show-test-content > section.show-test-question-types > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > button:nth-child(2)')
    add_button.click()
    # Click on card score for no input
    score_for_yes_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > div.question-form-content > section.therapist-section > div > div:nth-child(4) > div > input')
    score_for_yes_input.send_keys("Cualquier cosa")

@then('La aplicacion no deja escribir caracteres no numericos en la caja de texto puntaje para no y continua vacio')
def step_impl(ctx):
    res = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > div.question-form-content > section.therapist-section > div > div:nth-child(4) > div > input').text
    assert res == ''
    ctx.driver.close()

@then('La aplicacion guarda la pregunta, se queda en la misma pagina y envia un alert exitoso')
def step_impl(ctx):
    res = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > div > div.MuiAlert-message.css-1pxa9xg-MuiAlert-message > div > span:nth-child(2)').text
    assert res == 'Agregada con éxito'
    ctx.driver.close()

@when('Creo varias preguntas tipo carta en una prueba creada')
def step_impl(ctx):
    global idx
    # Edit the test
    edit_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.sidebar > div.center > ul > div:nth-child(2) > li:nth-child(3) > a')
    edit_button.click()

    # Click on edit of "prueba 1"
    hover = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > div:nth-child(1)')
    hover.click()
    time.sleep(1)
    edit_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > div:nth-child(1) > div > section.test-card-actions > button:nth-child(1) > span:nth-child(2)')
    edit_button.click()

    # Click on add question of card type
    questions = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section.show-test-content > section.show-test-questions > div > table > tbody').text
    if len(questions):
        questions = questions.split()
        idx = int(questions[-2])
    add_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section.show-test-content > section.show-test-question-types > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > button:nth-child(2)')
    add_button.click()

@when('Le doy clic en enviar por cada pregunta que voy a preguntar')
def step_impl(ctx):
    global n, idx
    # Click on send
    send_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > div.buttons-section > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.send-button.css-sghohy-MuiButtonBase-root-MuiButton-root')
    for i in range(n):
        send_button.click()
    time.sleep(1)

@when('Le doy clic en volver')
def step_impl(ctx):
    go_back_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > div.buttons-section > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.back-button.css-sghohy-MuiButtonBase-root-MuiButton-root')
    go_back_button.click()

@then('La aplicacion guarda todas las preguntas creadas')
def step_impl(ctx):
    global n, idx
    last_question = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section.show-test-content > section.show-test-questions > div > table > tbody > tr:nth-child(10) > td:nth-child(1)').text
    if idx != 0:
        last_question = ctx.driver.find_element(by = By.CSS_SELECTOR, value = f'#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section.show-test-content > section.show-test-questions > div > table > tbody > tr:nth-child({idx + n}) > td:nth-child(1)').text
    assert int(last_question) == n + idx
    ctx.driver.close()