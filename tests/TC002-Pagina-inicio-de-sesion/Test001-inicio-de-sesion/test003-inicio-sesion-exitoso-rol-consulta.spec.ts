import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

test('Inicio de sesión exitoso rol consultas', async ({ page }) => {
  // Configurar tamaño de ventana (1920x1080 para pantalla completa)
  await page.setViewportSize({ width: 1530, height: 780 });

  // Navegar a la página de login
  await page.goto(data.url);

  await expect(page).toHaveURL(/\/login/);

  // Llenar el campo de usuario
  await page.fill('input[name="email"]', data.emailconsulta);

  // Llenar el campo de contraseña
  await page.fill('input[name="password"]', data.passwordconsulta);

  // Hacer clic en el botón de inicio de sesión
  await page.click('button[type="submit"]');

  // Le indicamos que espere hasta que la pagina contenga 
  await expect(page.locator('//p[contains(.,"Inicio")]')).toBeVisible();

  await page.getByRole('button', { name: 'Entendido' }).click();
 
  // Hacer clic en el desplegar datos
  page.click("(//button[@class='items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground relative flex h-10 gap-2 p-4 text-green-primary transition delay-75 hover:bg-green-light'])[2]")

  // Le indicamos que espere hasta que la pagina contenga 
  await expect(page.locator('//span[contains(.,"Consulta")]')).toBeVisible();

      // Definir la ruta donde se guardarán las capturas
      const carpetaBase = path.join(__dirname, '..','..', 'screenshots','Pagina de inicio de sesion','inicio de sesion');  // Usamos __dirname para referirnos a la ubicación actual del test

      // Definir el nombre del archivo de la captura
      const screenshotPath = path.join(carpetaBase, 'Inicio_de_sesión_exitoso_consultas.png');
    
      // Guardar la captura de pantalla en la ruta especificada
      await page.screenshot({ path: screenshotPath, fullPage: true });
    
      console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
 
});
``


