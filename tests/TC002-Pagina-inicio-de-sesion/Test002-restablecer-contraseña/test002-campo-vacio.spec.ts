import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

test('Reseteo Campos vacios', async ({ page }) => {
  // Configurar tamaño de ventana (1920x1080 para pantalla completa)
  await page.setViewportSize({ width: 1530, height: 780 });

  // Navegar a la página de login
  await page.goto(data.url);

  // Verificar que la URL es correcta
  await expect(page).toHaveURL(/\/login/);

  // Hacer clic en el botón de olvide contraseña
  await page.click('a[href="/olvide-contrasena"]');

  // Le indicamos que espere hasta que la pagina contenga 
  await expect(page.locator("//h1[contains(.,'¿Olvidaste tu contraseña?')]")).toBeVisible();

  // Verificar que la URL es correcta
  await expect(page).toHaveURL(/\/olvide-contrasena/);

  // Hacer clic en el botón de inicio de sesión
  await page.click('button[type="submit"]');

  // Le indicamos que espere hasta que la pagina contenga 
  await expect(page.locator('text="Correo electrónico es obligatorio"')).toBeVisible();

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..', 'screenshots', 'Pagina de inicio de sesion','restablecer contraseña');  // Usamos __dirname para referirnos a la ubicación actual del test

  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'Reseteo_Campos_vacios.png');
  
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
  
  console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

});



