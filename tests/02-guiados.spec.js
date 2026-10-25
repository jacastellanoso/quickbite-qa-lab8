
const { test, expect } = require('@playwright/test');

// R01 - Rechaza credenciales incorrectas
test('R01 - Rechaza credenciales incorrectas', async ({ page }) => {
  await page.goto('/');

  await page.locator('#user').fill('usuario_incorrecto');
  await page.locator('#password').fill('clave_incorrecta');
  await page.locator('#login').click();

  await expect(page.locator('#login-result')).toBeVisible();
  await expect(page.locator('#login-result')).toContainText(
    /incorrect|inválid|error|rechaz|no coinciden/i
  );
});

// R02 - Filtra productos por búsqueda
test('R02 - Filtra productos por búsqueda', async ({ page }) => {
  await page.goto('/');

  await page.locator('#search').fill('Pizza');

  const productos = page.locator('#products');

  await expect(productos).toContainText('Pizza');
  await expect(productos).not.toContainText('Tacos');
});

// R03 - Actualiza contador del carrito
test('R03 - Actualiza contador del carrito', async ({ page }) => {
  await page.goto('/');

  const botonesAgregar = page.locator('button[data-product]');

  await expect(botonesAgregar.first()).toBeVisible();

  await botonesAgregar.nth(0).click();
  await botonesAgregar.nth(1).click();

  await expect(page.locator('#cart-count')).toHaveText('2');
});

// R04 - Impide pedido sin productos
test('R04 - Impide pedido sin productos', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#cart-count')).toHaveText('0');

  await page.locator('#checkout').click();

  await expect(page.locator('#message')).toBeVisible();
  await expect(page.locator('#message')).toContainText(
    /vac[ií]o|agrega|producto/i
  );
});
