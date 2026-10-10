import { expect, test } from '@playwright/test'

// Pruebas E2E: navegador real sobre la app compilada (npm run build + vite preview).

test('la portada carga y "Reservar Cita" lleva al login si no hay sesión', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Clinica Nutricional Nutrivida' })).toBeVisible()

  await page.getByRole('link', { name: 'Reservar Cita' }).click()
  await expect(page).toHaveURL(/\/login$/)
})

test('el menú lleva a Nosotros y el formulario de contacto valida los datos', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation').getByRole('link', { name: 'Nosotros' }).click()
  await expect(page).toHaveURL(/\/nosotros$/)

  const formulario = page.locator('#formulario')

  // 1. Enviar vacío → aparecen los mensajes de error
  await formulario.getByRole('button', { name: 'Enviar' }).click()
  await expect(page.getByText('El email es obligatorio')).toBeVisible()

  // 2. Completar con datos válidos → los errores desaparecen y el formulario se limpia
  await formulario.getByLabel('Nombre').fill('Ana')
  await formulario.getByLabel('Email').fill('ana@nutrivida.cl')
  await formulario.getByLabel('Mensaje').fill('Quiero agendar una consulta')
  await formulario.getByRole('button', { name: 'Enviar' }).click()

  await expect(page.getByText('El email es obligatorio')).toBeHidden()
  await expect(formulario.getByLabel('Email')).toHaveValue('')
})
