import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi} from 'vitest'
import HeaderEmpleado from './HeaderEmpleado'
import { empleadoAdmin,empleadoSecretario,empleadonutricionista } from '../../test/mocks'

import { useAuth } from '../../context/AuthContext'

vi.mock('../../context/AuthContext', () => ({
    useAuth: vi.fn()
}))

describe("Mostrar informacion del empleado", () => {

    const closeSesion = vi.fn()

    const renderHeaderEmpleados = (datos) => {

        vi.mocked(useAuth).mockReturnValue({
            usuario: {
                email: datos.email,
                id: datos.id,
                roles: [datos.rol]
            },
            logout: closeSesion
        });

        render(
            <MemoryRouter>
                <HeaderEmpleado />
            </MemoryRouter>
        );

        fireEvent.click(document.getElementById("btn-abrir-nav"));
    }

    describe("Renderizar Header por rol del empleado", () => {

        it("Renderiza el Header con rol Admin", () => {
            renderHeaderEmpleados(empleadoAdmin)

            expect(screen.getByRole("link", { name: /empleados/i }))
                .toHaveAttribute("href", "/administracion/empleados")

            expect(screen.getByRole("link", { name: /servicios/i }))
                .toHaveAttribute("href", "/administracion/servicios")
        })

        it("Renderiza Header con Rol Nutricionista", () => {
            renderHeaderEmpleados(empleadonutricionista)

            expect(screen.getByRole("link", { name: /agenda/i }))
                .toHaveAttribute("href", "/nutricionista/agenda")

            expect(screen.getByRole("link", { name: /historial clinico/i }))
                .toHaveAttribute("href", "/nutricionista/fichaClinica")
        })

        it("Renderiza Header con rol Secretario", () => {
            renderHeaderEmpleados(empleadoSecretario)

            expect(screen.getByRole("link", { name: /reserva/i }))
                .toHaveAttribute("href", "/secretario/reserva")

            expect(screen.getByRole("link", { name: /horario nutricionistas/i }))
                .toHaveAttribute("href", "/secretario/horario")
        })
    })
})