import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';
import fs from 'fs';

test('Envío de soporte con adjunto', async ({ page }) => {
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

  // Enviar mensaje
  const mensaje = 'Mensaje generado automáticamente por el equipo de QA para fines de prueba.';
  await page.getByPlaceholder('Escribinos tu mensaje aquí').fill(mensaje);

  const filePath = path.resolve(__dirname, '../img/pruebaSoporte.png');
  await page.locator('input[type="file"]').setInputFiles(filePath);

  await page.mouse.wheel(0, 200); // Desplaza 500 píxeles hacia abajo

  await page.waitForTimeout(2000); // Espera 2000 milisegundos (2 segundos)

  await page.getByRole('button', { name: 'Enviar' }).click();

  // Validar que el mensaje fue enviado
  await expect(page.getByText('Mensaje enviado')).toBeVisible();

  // Captura de pantalla
  const screenshotDir = path.resolve(__dirname, '../screenshots/Pagina soporte/envio');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const screenshotPath = path.join(screenshotDir, 'envio_de_soporte_con_adjunto.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`📸 Captura de pantalla guardada en: ${screenshotPath}`);
});
