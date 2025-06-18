import { test, expect } from '@playwright/test';
import { data } from '../../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Verificar trx QR Upay', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 780 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();
  await page.getByRole('button').nth(2).click();
  await page.getByRole('link', { name: 'Icon of Transacciones' }).click();
  await page.locator("(//button[normalize-space()='Liquidaciones'])[1]").click();
  await page.waitForTimeout(3000); // Espera 2000 milisegundos (2 segundos)
  await page.locator("//div[starts-with(@class, 'flex sm:w-')]//button[@type='button']//*[name()='svg']").click();
  await page.getByRole('button', { name: 'Último año' }).click();
  await page.getByPlaceholder('Código de autorización').click();
  await page.getByPlaceholder('Código de autorización').fill(data.liq_Cod_Autorizacion_UPAY);
  //await page.getByRole('button', { name: 'Icon Filtrar' }).click();
  await page.waitForTimeout(2000); // Espera 2000 milisegundos (2 segundos)
  await page.getByRole('button', { name: 'Marca' }).click();
  await page.getByRole('button', { name: 'QR upay image QR upay' }).click();
  await page.getByRole('button', { name: 'Icon Filtrar' }).click();
  await page.waitForTimeout(3000); // Espera 2000 milisegundos (2 segundos)
  await page.getByPlaceholder('Código de autorización').click();
  await page.getByPlaceholder('Código de autorización').fill('');
  await page.getByPlaceholder('Boleta N°').click();
  await page.getByPlaceholder('Boleta N°').fill(data.liq_Boleta_UPAY);
  await page.getByRole('button', { name: 'Icon Filtrar' }).click();
  await page.waitForTimeout(3000); // Espera 2000 milisegundos (2 segundos)
  await page.getByRole('img', { name: 'Upay logo', exact: true }).click();

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..','..', 'screenshots', 'Pagina transacciones liquidaciones','codautorizacion');  // Usamos __dirname para referirnos a la ubicación actual del test
    
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'Verificar_trx_qr_upay.png');
      
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
      
  console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
  
});