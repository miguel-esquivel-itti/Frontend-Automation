import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Crear seller', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 780 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  //await page.getByRole('button').first().click();
  await page.getByRole('button').nth(2).click();

  await page.getByRole('link', { name: 'Icon of Mi Comercio Mi' }).click();

  await page.getByRole('button', { name: 'Añadir nueva sucursal' }).click();
  await page.getByPlaceholder('Nombre del comercio').click();
  await page.getByPlaceholder('Nombre del comercio').fill(data.Nombre_del_comercio_fisico);
  await page.getByPlaceholder('Nombre del comercio').press('Tab');
  await page.locator('div').filter({ hasText: /^Rubro \(MCC\)Selecciona una opción$/ }).getByRole('combobox').click();
  await page.getByText('PANADERÍAS', { exact: true }).click();
  await page.getByPlaceholder('Correo electrónico').click();
  await page.getByPlaceholder('Correo electrónico').fill(data.Correo_del_comercio_fisico);
  await page.getByPlaceholder('Escribe tu número de teléfono').click();
  await page.getByPlaceholder('Escribe tu número de teléfono').fill(data.Celular_del_comercio_fisico);
  await page.locator('div').filter({ hasText: /^Para desplazarte, pulsa las teclas de flecha\.$/ }).nth(1).click();
  await page.getByPlaceholder('Dirección', { exact: true }).click();
  await page.waitForTimeout(1000); 
  await page.getByPlaceholder('Dirección', { exact: true }).fill('Malutin');
  await page.getByPlaceholder('Ciudad', { exact: true }).click();
  await page.getByPlaceholder('Ciudad', { exact: true }).fill('Asunción');
  await page.getByPlaceholder('Número', { exact: true }).click();
  await page.getByPlaceholder('Número', { exact: true }).fill('555');
  await page.getByText('Selecciona una opción').click();
  await page.getByText('619189122').click();
  await page.waitForTimeout(1000); 
  await page.getByRole('button', { name: 'Añadir comercio' }).click();
  await page.getByText('Sucursal añadida con éxito.', { exact: true }).waitFor({ state: 'visible' });
  //await page.waitForTimeout(1000); 


  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..', 'screenshots', 'Pagina mi comercio','creacion de seller');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'creacion_de_seller.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

});
``