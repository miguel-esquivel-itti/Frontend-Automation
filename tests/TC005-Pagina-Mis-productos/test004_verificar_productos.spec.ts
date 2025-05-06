import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';

const fs = require('fs');

test('Verificacion de productos', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 780 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  //await page.getByRole('button').first().click();
  await page.getByRole('button').nth(2).click();

  await page.getByRole('link', { name: 'Icon of Mis Productos Mis' }).click();
  await page.getByRole('button', { name: 'Supermercado Diefer II', exact: true }).click();
  await page.getByText('UPOS CON IMPRESORA').click();
  await page.getByText('UPOS SIN IMPRESORA').click();
  await page.getByText('TAP TO PHONE + LINK DE PAGOS').click();

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..', 'screenshots', 'Pagina mis productos','Verificacion de productos');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'verificacion_de_productos.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

});
``