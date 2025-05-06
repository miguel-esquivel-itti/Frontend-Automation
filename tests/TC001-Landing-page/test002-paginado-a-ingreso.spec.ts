import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';
import fs from 'fs';

test('Paginado a la pantalla de ingreso', async ({ page }) => {
  // 📏 Establecer el tamaño de la ventana
  await page.setViewportSize({ width: 1530, height: 780 });

  // 🔗 Navegar a la URL desde el config
  await page.goto(data.urll);

  // 👉 Hacer clic en el botón "Ingresar"
  const ingresar = await page.locator("//a[normalize-space()='Ingresar']");
  await ingresar.click();

  // 🔍 Verificar que se redirige correctamente
  await expect(page).toHaveURL(/\/login-qr/);

  // ⬅️ Volver atrás
  await page.goBack();

  await expect(page).toHaveURL(data.urll); // Opcional pero recomendable


  await page.waitForTimeout(5000); 

  // Esperar a que el enlace "Hacerme cliente" esté visible
  await page.getByRole('navigation').getByRole('link', { name: 'Hacerme cliente' }).waitFor({ state: 'visible' });

  // 📂 Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.resolve(__dirname, '..', 'screenshots', 'landing page');

  // 📂 Crear la carpeta si no existe
  if (!fs.existsSync(carpetaBase)) {
    fs.mkdirSync(carpetaBase, { recursive: true });
  }

  // 📸 Definir y guardar la captura de pantalla
  const screenshotPath = path.join(carpetaBase, 'Paginado_pantalla_de_ingreso.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`✅ Captura de pantalla guardada en: ${screenshotPath}`);
});
