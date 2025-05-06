import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Eliminar usuario', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 680 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  await page.getByRole('button').nth(2).click();

  // Clic en el botón mi comercio
  await page.click("//p[contains(.,'Gestión de usuarios')]");

  await page.getByRole('row', { name: 'Carlos Benitez nestormartinez' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Eliminar' }).click();
  await page.getByRole('button', { name: 'Si, eliminar' }).click();

  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight); // Desplazarte hacia abajo un viewport
  });

  // Espera a que el mensaje aparezca
  const successMessage = page.locator("(//div[contains(.,'Usuario eliminado con éxito.')])[4]");
  await successMessage.waitFor({ state: 'visible' });
  
  // Verifica que el mensaje esté visible y tenga el texto esperado
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText('Usuario eliminado con éxito.');

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..', 'screenshots', 'Pagina gestion de usuarios','usuario admin');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'eliminar_usuario.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

  });
``