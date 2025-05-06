import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Correo duplicado', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 680 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailadmin);

  await page.fill('input[name="password"]', data.passwordadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  await page.getByRole('button').nth(2).click();

  // Clic en el botón mi comercio
  await page.click("//p[contains(.,'Gestión de usuarios')]");

  // Clic en el botón añadir usuario
  await page.click("//button[contains(.,'Añadir usuario')]");

  await expect(page.locator('//button[contains(.,"Agregar nuevo usuario")]')).toBeVisible();

  // Rellenar campos del formulario

  // Ingreso de nombre
 
  await page.fill('//input[@name="firstName"]', data.Nombre_consulta);

  // Ingreso de apellido

  await page.fill('//input[@name="lastName"]', data.Apellido_consulta);

  // Ingreso de correo

  await page.fill('//input[@name="email"]', data.Correo_consulta2);

  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight); // Desplazarte hacia abajo un viewport
  });

  await page.getByPlaceholder('Ingresá el número de cédula').click();
  await page.getByPlaceholder('Ingresá el número de cédula').fill(data.Cedula_consulta);

  await page.waitForTimeout(2000); // Espera 2000 milisegundos (2 segundos)
  await page.click("//button[contains(.,'Agregar nuevo usuario')]");

  // Espera a que el mensaje aparezca
  const successMessage = page.locator("(//div[contains(.,'¡Existe un usuario con el mismo número de documento!')])[4]");
  await successMessage.waitFor({ state: 'visible' });
  
  // Verifica que el mensaje esté visible y tenga el texto esperado
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText('¡Existe un usuario con el mismo número de documento!');

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..', 'screenshots', 'Pagina gestion de usuarios','usuario consulta');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'cedula_duplicada.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

  });
``