import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it} from 'vitest'
import { renderAt } from '../../test/renderWithRouter'



describe("Navegar como cliente sin estar logeado", () => {
    it("Renderiza la pagina de Inicio Cliente", () => {
        renderAt("/")
        expect(screen.getByRole("heading",{level: 1})).toBeInTheDocument()
    })

    it("Navega desde Inicio hasta Servicios", async() => {
        const user = userEvent.setup()
        renderAt("/")
        const servicioLink = screen.getAllByRole("link",{name: /servicios/i})
        await user.click(servicioLink[0])
        expect(screen.getByRole("heading", {name: /servicios/i})).toBeInTheDocument()
    })

    it("Renderiza la pagina Servicios del cliente", () => {
        renderAt("/servicios")
        expect(screen.getByRole("heading",{level: 1})).toBeInTheDocument()
    })

    it("Navega desde Servicios a Nosotros", async() => {
        const user = userEvent.setup()
        renderAt("/servicios")
        const nosotrosLink = screen.getAllByRole("link",{name: /nosotros/i})
        await user.click(nosotrosLink[0])
        expect(screen.getByRole("heading",{level: 1})).toBeInTheDocument()
    })

    it("Renderiza la pagina de Nosotros", () =>{
        renderAt("/nosotros")
        expect(screen.getByRole("heading",{level: 1})).toBeInTheDocument()
    })

    it("Navega desde Nosotros a Registrarse", async() => {
        const user = userEvent.setup()
        renderAt("/nosotros")
        const registrarseLink = screen.getAllByRole("link",{name: /registrarse/i})
        await user.click(registrarseLink[0])
        expect(screen.getByRole("heading", {name: /registrarse/i})).toBeInTheDocument()
    })

    it("Renderiza la pagina de Registrarse", () =>{
        renderAt("/registrarse")
        expect(screen.getByRole("heading",{level: 1})).toBeInTheDocument()
    })

    it("Navega desde Registrarse a Login", async() => {
        const user = userEvent.setup()
        renderAt("/registrarse")
        const loginLink = screen.getAllByRole("link",{name: /iniciar sesion/i})
        await user.click(loginLink[0])
        expect(screen.getByRole("heading", {name: /inicio sesion/i})).toBeInTheDocument()
    })

    it("Renderiza la pagina de Login", () =>{
        renderAt("/login")
        expect(screen.getByRole("heading",{level: 1})).toBeInTheDocument()
    })
})