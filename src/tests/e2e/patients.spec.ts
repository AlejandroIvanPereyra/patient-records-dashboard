import { test, expect } from "@playwright/test"

test.describe("Patients E2E", () => {
    test.beforeEach(async ({ page }) => {
        // Navegar a la app
        await page.goto("/")

        // Limpiar estado persistente (localStorage, etc.)
        await page.evaluate(() => {
            localStorage.clear()
        })

        // Recargar para aplicar el estado limpio
        await page.reload()

        // Wait for network requests to complete
        await page.waitForLoadState("networkidle")
    })

    /**
     * TEST 1
     * Listar pacientes
     */
    test("lists patients", async ({ page }) => {
        // Header principal visible
        await expect(
            page.getByRole("heading", { name: /patient records/i })
        ).toBeVisible()

        // Wait for patients to load - the edit button appears after data is loaded
        // This implicitly waits for loading skeletons to disappear
        await expect(
            page.getByRole("button", { name: /edit patient/i }).first()
        ).toBeVisible({ timeout: 15000 })
    })

    /**
     * TEST 2
     * Añadir paciente
     */
    test("adds a new patient", async ({ page }) => {
        const patientName = `Carlos-${Date.now()}`

        await page.getByRole("button", { name: /add patient/i }).click()

        // Modal visible
        await expect(
            page.getByRole("heading", { name: /add patient/i })
        ).toBeVisible()

        // Completar formulario
        await page.getByLabel(/name/i).fill(patientName)
        await page
            .getByLabel(/description/i)
            .fill("Test patient created via E2E")

        await page.getByRole("button", { name: /submit/i }).click()

        // Wait for modal to close
        await expect(
            page.getByRole("heading", { name: /add patient/i })
        ).not.toBeVisible({ timeout: 5000 })

        // El paciente aparece una sola vez en la lista
        await expect(page.locator(`text=${patientName}`)).toHaveCount(1, { timeout: 10000 })
    })

    /**
     * TEST 3
     * Marcar paciente como favorito y listarlo
     */
    test("adds patient to favorites and lists them", async ({ page }) => {
        const patientName = `Carlos-${Date.now()}`

        // Crear paciente
        await page.getByRole("button", { name: /add patient/i }).click()
        await page.getByLabel(/name/i).fill(patientName)
        await page.getByLabel(/description/i).fill("Paciente favorito")
        await page.getByRole("button", { name: /submit/i }).click()

        // Wait for modal to close
        await expect(
            page.getByRole("heading", { name: /add patient/i })
        ).not.toBeVisible({ timeout: 5000 })

        await expect(page.locator(`text=${patientName}`)).toBeVisible({ timeout: 10000 })

        // Marcar como favorito (primer toggle asociado)
        await page
            .getByRole("button", { name: /toggle favorite/i })
            .first()
            .click()

        // Wait for favorites count to update (indicates state has changed)
        await expect(
            page.getByRole("button", { name: /favorites/i })
        ).toContainText(/favorites \(1\)/i, { timeout: 5000 })

        // Ir a la sección Favorites
        await page.getByRole("button", { name: /favorites/i }).click()

        // Verificar que el paciente está en favoritos
        await expect(page.locator(`text=${patientName}`)).toBeVisible({ timeout: 10000 })
    })
})
