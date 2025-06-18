import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Buscar seller', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 780 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await page.waitForTimeout(2000); 

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  await page.getByRole('button').nth(2).click();

  await page.getByRole('link', { name: 'Icon of Mi Comercio Mi' }).click();
  // Clic en el botón mi comercio

  //await page.reload();
 
  await page.locator("//div[@class='relative flex-1 rounded-full bg-grey-scale-light-grey']").hover();
  await page.mouse.wheel(0, 200); // Desplaza 500 píxeles hacia abajo

  await page.waitForTimeout(9000); 

  await page.reload();  // vamos a sacar cuando salga las alertas
  await page.getByRole('button').nth(2).click();


  // Verificar si el texto está visible
  // Hacer clic en el elemento con el texto del comercio
  await page.waitForSelector(`text=${data.Nombre_del_comercio_fisico}`, { state: 'visible' });
  await page.locator(`text=${data.Nombre_del_comercio_fisico}`).first().click();
 
      // Definir la ruta donde se guardarán las capturas
        const carpetaBase = path.join(__dirname, '..','..', 'screenshots', 'Pagina mi comercio','buscar seller creado');  // Usamos __dirname para referirnos a la ubicación actual del test
        
        // Definir el nombre del archivo de la captura
        const screenshotPath = path.join(carpetaBase, 'buscar_seller_creado.png');
          
        // Guardar la captura de pantalla en la ruta especificada
        await page.screenshot({ path: screenshotPath, fullPage: true });
          
         console.log(`Captura de pantalla guardada en: ${screenshotPath}`);


});