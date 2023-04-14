package seleniumgluecode;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class Test {
    private ChromeDriver driver;
    @Given("^A user enters a email ([^\"]*)$")
    public void a_user_enters_a(String username) {
        System.setProperty("webdriver.chrome.driver","./src/test/resources/chromedriver/chromedriver.exe");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        driver.get("http://localhost:3000/");
        driver.manage().window().maximize();
        driver.findElement(By.name("email")).sendKeys(username);
    }
    @When("^User enters a password ([^\"]*)$")
    public void user_enters_a(String password) {
       driver.findElement(By.name("password")).sendKeys(password);
    }
    @When("User clicks on Ingresar")
    public void user_clicks_on_ingresar() throws InterruptedException {
        driver.findElement(By.cssSelector("button[class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium login-button css-sghohy-MuiButtonBase-root-MuiButton-root']")).click();
        Thread.sleep(3000);
    }

    @When("^User clicks on ([^\"]*) on homepage$")
    public void user_clicks_on_registrar_on_homepage(String option) {
        WebElement element;
        switch (option) {
            case "RegistrarTerapista" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-hospital-user icon']"));
                element.click();
            }
            case "VerTerapista" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-users-line icon']"));
                element.click();
            }
            case "CrearPrueba" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-clipboard-list icon']"));
                element.click();
            }
            case "EditarPrueba" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-box-archive icon']"));
                element.click();
            }
            case "AsistirTerapia" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-calendar-days icon']"));
                element.click();
            }
            case "RegistrarPaciente" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-user icon']"));
                element.click();
            }
            case "EditarPaciente" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-user-group icon']"));
                element.click();
            }
            case "AgendarTerapia" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-calendar-check icon']"));
                element.click();
            }
            case "Resultados" -> {
                element = driver.findElement(By.xpath("//*[name()='svg' and @class='svg-inline--fa fa-square-poll-vertical icon']"));
                element.click();
            }
        }
    }

    @When("^User create a ([^\"]*)$")
    public void user_create_a_prueba(String testName) throws InterruptedException {
        driver.findElement(By.cssSelector("input[class='MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input']")).sendKeys(testName);
        Thread.sleep(3000);
    }

    @When("User clicks on ENVIAR")
    public void user_clicks_on_enviar() throws InterruptedException {
        driver.findElement(By.cssSelector("button[class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium login-button css-sghohy-MuiButtonBase-root-MuiButton-root']")).click();
        Thread.sleep(3000);
    }

    @When("^User enters therapist name information ([^\"]*)$")
    public void user_enters_therapist_name_information_andres(String name) throws InterruptedException {
        driver.findElement(By.cssSelector("input[name='name']")).sendKeys(name);
        Thread.sleep(3000);
    }
    @When("^User enters therapist email information ([^\"]*)$")
    public void user_enters_therapist_email_information_aa_abc_com(String email) throws InterruptedException {
        driver.findElement(By.cssSelector("input[name='email']")).sendKeys(email);
        Thread.sleep(3000);
    }
    @When("^User enters therapist password information ([^\"]*)$")
    public void user_enters_therapist_password_information_epyphone01(String password) throws InterruptedException {
        driver.findElement(By.cssSelector("input[name='password']")).sendKeys(password);
        Thread.sleep(3000);
    }
    @When("^User enters therapist identification card information ([^\"]*)$")
    public void user_enters_therapist_identification_card_information(String identification) throws InterruptedException {
        driver.findElement(By.cssSelector("input[name='docnum']")).sendKeys(identification);
        Thread.sleep(3000);
    }

    @Then("^An alert is showed ([^\"]*)$")
    public void an_alert_is_showed(String response) {
        WebElement alertFailed = driver.findElement(By.xpath("//*[name()='div' and @class='error-content']"));
        try
        {
            Assert.assertEquals(response,alertFailed.getText());
        }
        catch(Exception e)
        {
            driver.quit();
        }
        driver.quit();
    }

    @Then("^A success alert is showed ([^\"]*)$")
    public void a_success_alert_is_showed_success(String message) {
        try
        {
            WebElement alertSuccess = driver.findElement(By.xpath("//*[name()='div' and @class='success-content']"));
            Assert.assertEquals(message,alertSuccess.getText());
        }
        catch(Exception e)
        {
            driver.quit();
        }
        driver.quit();

    }

    @Then("^Home page and ([^\"]*) are showed$")
    public void home_page_and_role_are_showed(String role) {
        WebElement rol = driver.findElement(By.xpath("//*[name()='small' and @class='rol']"));
        try
        {
            Assert.assertEquals(role,rol.getText());
        }
        catch(Exception e)
        {
            driver.quit();
        }
        driver.quit();
    }

    @Then("^New page is ([^\"]*)$")
    public void new_page_is_register_therapist(String newpage) {
        String URL = driver.getCurrentUrl();
        Assert.assertEquals(URL, newpage);
        driver.quit();
    }

    @Then("^New page title is showed ([^\"]*)$")
    public void new_page_title_is_showed_Registrar_terapeuta(String title) {
        WebElement titleContainer = driver.findElement(By.xpath("//*[name()='h1' and @class='title']"));
        Assert.assertEquals(title,titleContainer.getText());
        driver.quit();
    }

}
