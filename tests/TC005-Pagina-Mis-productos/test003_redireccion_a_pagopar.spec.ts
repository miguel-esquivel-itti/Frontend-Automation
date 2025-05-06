import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';

const fs = require('fs');

test('Redireccionamiento a Pagopar', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 780 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  //await page.getByRole('button').first().click();
  await page.getByRole('button').nth(2).click();

  await page.getByRole('link', { name: 'Icon of Mis Productos Mis' }).click();
  await page.getByRole('link', { name: 'Añadir nuevos productos' }).click();
  await page.locator("(//button[contains(text(),'Añadir')])[3]").click();
  // Espera el popup
  const popupPromise = page.waitForEvent('popup');

  // Haz clic en el enlace que abre la nueva pestaña
  await page.getByRole('link', { name: 'Ir a Pagopar' }).click();

  // 🔸 Espera a que la nueva página esté lista
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');

  // ✅ Ahora estás "dentro" de la nueva página. Puedes hacer validaciones o acciones aquí:
  expect(popup.url()).toContain('pagopar.com');

  // Por ejemplo, verificar que el logo de Pagopar esté presente
  await expect(popup.locator('.navbar-brand')).toBeVisible();

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..', 'screenshots', 'Pagina mis productos','Redireccion a pagopar');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'redireccion_a_pagopar.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

});
``