import { test, expect } from '@playwright/test';
import { data } from '../../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Verificar trx visa', async ({ page }) => {

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
  await page.getByRole('button', { name: 'Icon Filtrar' }).click();
  await page.getByPlaceholder('Código de autorización').click();
  await page.getByPlaceholder('Código de autorización').fill(data.Cod_Autorizacion_VS);
  await page.getByRole('button', { name: 'Icon Filtrar' }).click();
  await page.getByRole('img', { name: 'Visa logo' }).click();
  await page.getByRole('img', { name: 'Cardflag image' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByPlaceholder('Código de autorización').click();
  await page.getByPlaceholder('Código de autorización').fill('');
  await page.getByPlaceholder('Boleta N°').click();
  await page.getByPlaceholder('Boleta N°').fill(data.Boleta_VS);
  await page.getByRole('button', { name: 'Icon Filtrar' }).click();
  await page.getByRole('cell', { name: data.Boleta_VS }).click();
  await page.getByRole('img', { name: 'Cardflag image' }).click();
  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..','..', 'screenshots', 'Pagina transacciones ventas','codautorizacion');  // Usamos __dirname para referirnos a la ubicación actual del test
    
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'Verificar_trx_visa.png');
      
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
      
  console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
  
});