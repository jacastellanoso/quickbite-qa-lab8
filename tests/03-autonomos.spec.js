
const { test, expect } = require('@playwright/test');

// R05 - No permite confirmar sin nombre de entrega
test('R05 - No permite confirmar sin nombre de entrega', async ({ page }) => {
  await page.goto('/');

  // Agregar un producto al carrito
  await page.locator('button[data-product]').first().click();

  // Verificar que el carrito contiene un producto
  await expect(page.locator('#cart-count')).toHaveText('1');

  // Dejar vacío el nombre de entrega
  const nombre = page.locator('#customer');
  await nombre.fill('');

  // Intentar confirmar el pedido
  await page.locator('#checkout').click();

  // Verificar que el pedido sea rechazado
  // Esta comprobación debe FALLAR por el defecto intencional
  await expect(page.locator('#message')).not.toContainText(
    /confirmado|exitoso|realizado|recibido/i
  );
});

// R06 - Búsqueda sin coincidencias
test('R06 - Búsqueda sin coincidencias', async ({ page }) => {
  await page.goto('/');

  // Buscar un producto inexistente
  await page.locator('#search').fill('ProductoInexistente98765');

  // Verificar que no existen productos disponibles para agregar
  await expect(
    page.locator('#products button[data-product]')
  ).toHaveCount(0);
});
