import { test, expect } from "@playwright/test"

test.describe("Patients E2E", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/")
    })

    /**
     * TEST 1
     * Listar pacientes
     */
    test("lists patients", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: /patient records/i })
        ).toBeVisible()


        // Assert edit buttons are visible
        await expect(
            page.getByRole("button", { name: /edit patient/i }).first()
        ).toBeVisible()
    })
    /**
* TEST 2
* Añadir paciente
*/
    test("adds a new patient", async ({ page }) => {
        await page.getByRole("button", { name: /add patient/i }).click()

        // Modal visible
        await expect(
            page.getByRole("heading", { name: /add patient/i })
        ).toBeVisible()

        await page.getByLabel(/name/i).fill("Carlos")
        await page
            .getByLabel(/description/i)
            .fill("Test patient created via E2E")

        await page.getByRole("button", { name: /submit/i }).click()

        // Modal cerrado + paciente visible en la lista
        await expect(
            page.getByText("Carlos")
        ).toBeVisible()
    })

    /**
     * TEST 3
     * Marcar favorito y listar favoritos
     */
    test("adds patient to favorites and lists them", async ({ page }) => {
        await page.goto("/")

        // Abrir modal
        await page.getByRole("button", { name: /add patient/i }).click()

        // Completar formulario
        await page.getByLabel(/name/i).fill("Carlos")
        await page.getByLabel(/description/i).fill("Paciente favorito")
        await page.getByRole("button", { name: /submit/i }).click()

        // Verificar que el paciente aparece
        await expect(page.getByText("Carlos")).toBeVisible()

        // Marcar como favorito
        await page
            .getByRole("button", { name: /toggle favorite/i })
            .first()
            .click()

        // Ir a la tab Favorites
        await page.getByRole("button", { name: /favorites/i }).click()

        // Verificar que Carlos está en favoritos
        await expect(page.getByText("Carlos")).toBeVisible()
    })
})
