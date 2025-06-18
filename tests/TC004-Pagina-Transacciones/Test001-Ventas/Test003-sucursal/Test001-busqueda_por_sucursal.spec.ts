import { test, expect } from '@playwright/test';
import { data } from '../../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Busqueda por sucursal', async ({ page }) => {
  await page.setViewportSize({ width: 1530, height: 780 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();
  await page.getByRole('button').nth(2).click();
  await page.getByRole('link', { name: 'Icon of Transacciones' }).click();
  await page.locator('button:has(.lucide-calendar)').click();
  await page.getByRole('button', { name: 'Último año' }).click();
  await page.getByRole('button', { name: 'Sucursal' }).click();
  await page.getByRole('button', { name: 'MONTSERRAT JOYERIA' }).click();
  await page.getByRole('button', { name: 'Icon Filtrar' }).click();
  await page.waitForTimeout(2000); // Espera 2000 milisegundos (2 segundos)
  await page.getByRole('button', { name: 'Icon Limpiar' }).click();
  await page.locator('button:has(.lucide-calendar)').click();
  await page.getByRole('button', { name: 'Último año' }).click();
  await page.getByRole('button', { name: 'Sucursal' }).click();
  await page.getByRole('button', { name: 'MONSERRAT JOYERIA II' }).click();
  await page.getByRole('button', { name: 'Icon Filtrar' }).click();
  await page.waitForTimeout(2000); // Espera 2000 milisegundos (2 segundos)
  await page.getByRole('button', { name: 'Icon Limpiar' }).click();

    // Definir la ruta donde se guardarán las capturas
    const carpetaBase = path.join(__dirname, '..','..','..', 'screenshots', 'Pagina transacciones ventas','busquedaporsucursal');  // Usamos __dirname para referirnos a la ubicación actual del test
      
    // Definir el nombre del archivo de la captura
    const screenshotPath = path.join(carpetaBase, 'busquedaporsucursal.png');
        
    // Guardar la captura de pantalla en la ruta especificada
    await page.screenshot({ path: screenshotPath, fullPage: true });
        
    console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
});