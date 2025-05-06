import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Usuario admin no puede editar perfil del superadmin', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 680 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailadmin);

  await page.fill('input[name="password"]', data.passwordadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  await page.getByRole('button').nth(2).click();

  // Clic en el botón mi comercio
  await page.getByRole('link', { name: 'Icon of Gestión de usuarios' }).click();
  await page.getByText('Miguel Esquivel').click();
  await page.getByRole('row', { name: 'Miguel Esquivel' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Editar' }).click();

  // Espera a que el mensaje aparezca
  await expect(page.getByText('No tienes permiso para editar este usuario maestro.')).toBeVisible();
  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..', 'screenshots', 'Pagina gestion de usuarios','validaciones');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'usuario_admin_no_puede_editar_perfil_del_superadmin.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

  });
``