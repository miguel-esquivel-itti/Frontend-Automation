import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';

const fs = require('fs');

test('Envio de soporte sin adjunto', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 680 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  await page.getByRole('button').nth(2).click();

  await page.getByRole('link', { name: 'Icon of Soporte Soporte' }).click();
  await page.getByPlaceholder('Escribinos tu mensaje aquí').click();
  await page.getByPlaceholder('Escribinos tu mensaje aquí').fill('Mensaje generado automáticamente por el equipo de QA para fines de prueba.');
  await page.getByRole('button', { name: 'Enviar' }).click();
  // Espera a que el mensaje aparezca
  await expect(page.getByText('Mensaje enviado')).toBeVisible();

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..', 'screenshots', 'Pagina soporte','envio');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'envio_de_soporte_sin_adjunto.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

  });
``