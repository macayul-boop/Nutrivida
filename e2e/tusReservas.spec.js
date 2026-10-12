import {test, expect} from "@playwright/test"

test.describe("Inicio de sesion, borrar una de Reserva", () =>{
    test.beforeEach(async ({page}) => {
        await page.goto("/#/login")

        await page.getByPlaceholder("Example@gmail.com").fill("cliente@gmail.com")
        await page.getByPlaceholder("Contraseña").fill("1234567")
        await page.getByRole("button", {name: "Iniciar Sesion"}).click()

        await page.goto("/tusReservas")

    })


    test("Carga titulos y secciones principales", async({page}) => {
        await expect(page.getByRole("heading", {level: 1, name: "Tus reservas"})).toBeVisible()
        await expect(page.getByRole("heading", {level: 2, name: "Tu próxima consulta"})).toBeVisible()
    })

    test("Abrir modal de confirmación y cancelar una reserva", async({page}) => {

        await page.getByRole("button", {name: "Cancelar"}).first.click()
        await expect(page.getByText("¿Estas seguro de que quieres cancelar la reserva?")).toBeVisible()

        await page.getByRole("button", {name: "Cancelar reserva"}).click()
        await expect(page.getByText("Cancelado")).toBeVisible()
    })

    test("Despliega y cierra el historial de consultas", async({page}) => {
        await page.getByRole("button", {name: "Ver Informe clínico"}).first.click()

        await expect(page.getByText(/Informe #/i)).toBeVisible()
        await expect(page.getByText(/Peso:/i)).toBeVisible()

        await page.locator("article").filter({hasText: "Informe #" }).getByRole("button").click()
        await expect(page.getByText(/Informe #/i)).toBeHidden()
    })

})