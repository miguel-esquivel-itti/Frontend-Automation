import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Editar apellido del usuario', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 680 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailsuperadmin);

  await page.fill('input[name="password"]', data.passwordsuperadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  await page.getByRole('button').nth(2).click();

  // Clic en el botón mi comercio
  await page.click("//p[contains(.,'Gestión de usuarios')]");

  await page.getByText('nestormartinez@gmail.com').click();
  await page.getByRole('row', { name: 'Carlos Martinez' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Editar' }).click();

  const input = await page.locator('//input[@name="lastName"]');
  await input.click(); // enfocar
  await input.fill(''); // borrar
  await input.type(data.Apellido_admin_dos); // escribir nuevo dato


  await page.getByRole('button', { name: 'Guardar información' }).click();

  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight); // Desplazarte hacia abajo un viewport
  });

  // Espera a que el mensaje aparezca
  const successMessage = page.locator("(//div[contains(.,'Usuario editado con éxito.')])[4]");
  await successMessage.waitFor({ state: 'visible' });
  
  // Verifica que el mensaje esté visible y tenga el texto esperado
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText('Usuario editado con éxito.');

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..', 'screenshots', 'Pagina gestion de usuarios','usuario admin');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'editar_apellido_usuario.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

  });
``