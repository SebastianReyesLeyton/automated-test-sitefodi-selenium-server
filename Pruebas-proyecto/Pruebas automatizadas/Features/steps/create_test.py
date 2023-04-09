from behave import *
from selenium.webdriver import ChromeOptions, Remote
from selenium.webdriver.common.by import By
import unittest
import time


@when("Escribo en el nombre y la descripción de la prueba")
def step_impl(ctx):
    # Process of clicking to create
    create_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.sidebar > div.center > ul > div:nth-child(2) > li:nth-child(2) > a > span')
    create_button.click()

    # Type name and description
    name_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > section.register-form-inputs > div:nth-child(1) > div > div > input')
    name_input.send_keys("Prueba aleatoria y nueva3")
    desc_input = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > section.register-form-inputs > div:nth-child(2) > div > div > textarea')
    desc_input.send_keys("Prueba aleatoria y nueva3")

@when("Le doy clic en enviar para crear la prueba")
def step_impl(ctx):
    send_button = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > section > form > section.buttons-section > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.login-button.css-sghohy-MuiButtonBase-root-MuiButton-root')
    send_button.click()
    time.sleep(1)

@then("La aplicacion arroja un alert exitoso")
def step_impl(ctx):
    res = ctx.driver.find_element(by = By.CSS_SELECTOR, value = '#root > div > div > div.dashboard-content-container > div.dashboard-content > div > div > div.MuiAlert-message.css-1pxa9xg-MuiAlert-message > div > span:nth-child(2)').text
    ans1 = "Ya existe un test con ese nombre"
    ans2 = "Ya tiene una carpeta asociada"
    assert (res != ans1 and res != ans2) is True