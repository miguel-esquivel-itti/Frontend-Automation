import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

test('Ingreso de solo el contraseña', async ({ page }) => {
  // Configurar tamaño de ventana (1920x1080 para pantalla completa)
  await page.setViewportSize({ width: 1530, height: 780 });

  // Navegar a la página de login
  await page.goto(data.url);

  // Verificar que la URL es correcta
  await expect(page).toHaveURL(/\/login/);

  // Llenar el campo de contraseña
  await page.fill('input[name="password"]', data.invalidPassword);

  // Hacer clic en el botón de inicio de sesión
  await page.click('button[type="submit"]');

  // Le indicamos que espere hasta que la pagina contenga 
  await expect(page.locator('text="Correo electrónico es obligatorio"')).toBeVisible();

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..', 'screenshots','Pagina de inicio de sesion','inicio de sesion');  // Usamos __dirname para referirnos a la ubicación actual del test

  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'Ingreso_de_solo_el_contraseña.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
  console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

 
});
``