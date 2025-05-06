import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';

const fs = require('fs');

test('Pedido exitoso pos sin impresora', async ({ page }) => {

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
  await page.getByRole('button', { name: 'Añadir' }).nth(1).click();
  await page.getByText(data.Nombre_del_comercio_fisico).click();
  await page.getByRole('button', { name: '+' }).first().click();
  await page.getByRole('button', { name: 'Añadir producto' }).click();
  await page.getByText('APP UPAY - TAP TO PHONE y LINK DE PAGOS han sido agregados con éxito').click();
  await page.getByRole('link', { name: 'cart icon Confirmar productos' }).click();
  await page.getByRole('button', { name: 'Completar el pedido' }).click();
  await page.getByText('¡Pedido realizado con éxito!').click();

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..', 'screenshots', 'Pagina mis productos','Pedido exitoso app upay');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'pedido_exitoso_app_upay.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

});
``