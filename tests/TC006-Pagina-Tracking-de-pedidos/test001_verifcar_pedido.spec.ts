import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';

const fs = require('fs');

test('Verificar tracking de pedido', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 780 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  //await page.getByRole('button').first().click();
  await page.getByRole('button').nth(2).click();

  await page.getByRole('link', { name: 'Icon of Tracking de pedidos' }).click();
  await page.getByRole('cell', { name: data.Nombre_del_comercio_fisico }).first().click();
  await page.getByLabel('ORDER').getByText(data.Nombre_del_comercio_fisico).click();

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..', 'screenshots', 'Pagina Tracking de pedidos','Verificar pedido');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'verificar_pedido.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

});
``