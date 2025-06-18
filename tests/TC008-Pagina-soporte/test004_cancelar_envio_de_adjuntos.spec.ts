import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';
import fs from 'fs';

test('Cancelar envio de adjuntos', async ({ page }) => {
  // Configuración inicial
  await page.setViewportSize({ width: 1530, height: 680 });
  await page.goto(data.url);

  // Login
  await page.fill('input[name="email"]', data.emailsuperadmin);
  await page.fill('input[name="password"]', data.passwordsuperadmin);
  await page.click('button[type="submit"]');

  // Verifica que se haya iniciado sesión correctamente
  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  // Navegación a la sección de soporte
  await page.getByRole('button').nth(2).click();

  await page.getByRole('link', { name: 'Icon of Soporte Soporte' }).click();
  await page.getByPlaceholder('Escribinos tu mensaje aquí').click();
  await page.getByPlaceholder('Escribinos tu mensaje aquí').fill('Mensaje generado automáticamente por el equipo de QA para fines de prueba.');

  const filePathuno = path.resolve(__dirname, '../img/imagedeprueba.png');
  await page.locator('input[type="file"]').setInputFiles(filePathuno);
  const filePathdos = path.resolve(__dirname, '../img/pruebaSoporte.png');
  await page.locator('input[type="file"]').setInputFiles(filePathdos);
  const filePathtres = path.resolve(__dirname, '../img/pruebaSoporte2.png');
  await page.locator('input[type="file"]').setInputFiles(filePathtres);
  const filePathcuatro = path.resolve(__dirname, '../img/pruebaSoporte3.png');
  await page.locator('input[type="file"]').setInputFiles(filePathcuatro);
  const filePathcinco = path.resolve(__dirname, '../img/pruebaSoporte4.png');
  await page.locator('input[type="file"]').setInputFiles(filePathcinco);

  // Desplazamiento y espera de carga
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(1000); // opcional

  await page.locator('div').filter({ hasText: /^Archivo - 5$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^Archivo - 4$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^Archivo - 3$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^Archivo - 2$/ }).getByRole('button').click();
  await page.getByRole('button').nth(2).click();

  // Enviar formulario
  //await page.getByRole('button', { name: 'Enviar' }).click();

  // Validar que el mensaje fue enviado correctamente
  //const successMessage = page.getByText('Mensaje enviado');
  //await expect(successMessage).toBeVisible({ timeout: 5000 });

  // Captura de pantalla
  const screenshotDir = path.resolve(__dirname, '../screenshots/Pagina soporte/envio');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotDir, 'cancelar_envio_de_adjuntos.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`📸 Captura de pantalla guardada en: ${screenshotPath}`);
});
