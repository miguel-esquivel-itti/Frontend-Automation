import { test, expect } from '@playwright/test';
import { data } from '../config/test.config';
import path from 'path';
import fs from 'fs';

test('test', async ({ page }) => {
  await page.goto(data.urll);

  const carpetaBase = path.join(__dirname, '..', 'screenshots', 'landing page');
  if (!fs.existsSync(carpetaBase)) {
    fs.mkdirSync(carpetaBase, { recursive: true });
  }

  const xlsxPath = path.join(carpetaBase, 'tiempos_de_respuesta.xlsx');
  fs.writeFileSync(xlsxPath, 'Paso,Nombre del enlace,Tiempo de respuesta (ms),Ruta de captura\n');

  const enlaces = [
    { name: 'upay logo', expectedUrl: null },
    { name: 'Inicio', expectedUrl: null },
    { name: 'Quienes somos', expectedUrl: /\/#quienes-somos/ },
    { name: 'Soluciones', expectedUrl: /\/#servicios/ },
    { name: 'Portal upay', expectedUrl: /\/#portal/ },
    { name: 'FAQ', expectedUrl: /\/#faq/ },
    { name: 'Contacto', expectedUrl: /\/#contacto/ },
    { name: 'Inicio', expectedUrl: null },
    { name: 'Quienes somos', expectedUrl: /\/#quienes-somos/ },
    { name: 'Soluciones', expectedUrl: /\/#servicios/ },
  ];

  for (const [index, { name, expectedUrl }] of enlaces.entries()) {
    const link = page.getByRole('navigation').getByRole('link', { name });

    await link.waitFor();

    const startTime = Date.now();
    await link.click();

    // 🔁 Esperar a que termine la carga de red antes de continuar
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // adicional por si hay animaciones o scroll

    if (expectedUrl) {
      await expect(page).toHaveURL(expectedUrl);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    const screenshotFile = `paso_${index + 1}_${name.replace(/\s/g, '_')}.png`;
    const screenshotPath = path.join(carpetaBase, screenshotFile);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    console.log(`🕒 Tiempo de respuesta (${name}): ${duration} ms`);
    console.log(`📸 Captura de pantalla guardada en: ${screenshotPath}`);

    const relativePath = `screenshots/landing page/${screenshotFile}`.replace(/\\/g, '/');
    fs.appendFileSync(xlsxPath, `${index + 1},${name},${duration},${relativePath}\n`);
  }

  console.log(`📄 CSV generado en: ${xlsxPath}`);
});
