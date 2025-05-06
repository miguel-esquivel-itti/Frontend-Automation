import { test, expect } from '@playwright/test';
import { data } from '../../config/test.config';
import path from 'path';

const fs = require('fs');

test('Validacion de campos', async ({ page }) => {

  await page.setViewportSize({ width: 1530, height: 680 });

  await page.goto(data.url);

  await page.fill('input[name="email"]', data.emailadmin);

  await page.fill('input[name="password"]', data.passwordadmin);

  await page.click('button[type="submit"]');

  await expect(page.locator('//p[contains(.,"Mi Comercio")]')).toBeVisible();

  await page.getByRole('button').nth(2).click();

  // Clic en el botón mi comercio
  await page.getByRole('link', { name: 'Icon of Gestión de usuarios' }).click();
  await page.getByRole('button', { name: 'Añadir usuario' }).click();

  // validacion de nombre
  await page.getByRole('button', { name: 'Agregar nuevo usuario' }).click();
  await expect(page.getByText('El nombre solo debe contener letras')).toBeVisible();
  await page.getByPlaceholder('Nombre').click();
  await page.getByPlaceholder('Nombre').fill(data.Nombre_admin);

  // validacion de apellido

  await page.getByRole('button', { name: 'Agregar nuevo usuario' }).click();
  await expect(page.getByText('Apellido es obligatorio')).toBeVisible();
  await page.getByPlaceholder('Apellido').click();
  await page.getByPlaceholder('Apellido').fill(data.Apellido_admin);

  // validacion de Correo electrónico

  await page.getByRole('button', { name: 'Agregar nuevo usuario' }).click();
  await expect(page.getByText('Correo electrónico es obligatorio')).toBeVisible();
  await page.getByPlaceholder('Correo electrónico').click();
  await page.getByPlaceholder('Correo electrónico').fill(data.Correo_admin);

  // validacion de Número de cédula

  await page.getByRole('button', { name: 'Agregar nuevo usuario' }).click();
  await expect(page.getByText('Solo se permiten números.')).toBeVisible();
  await page.getByPlaceholder('Ingresá el número de cédula').click();
  await page.getByPlaceholder('Ingresá el número de cédula').fill(data.Cedula);

  // Definir la ruta donde se guardarán las capturas
  const carpetaBase = path.join(__dirname, '..','..', 'screenshots', 'Pagina gestion de usuarios','validaciones');  // Usamos __dirname para referirnos a la ubicación actual del test
  
  // Definir el nombre del archivo de la captura
  const screenshotPath = path.join(carpetaBase, 'validacion_de_campos.png');
    
  // Guardar la captura de pantalla en la ruta especificada
  await page.screenshot({ path: screenshotPath, fullPage: true });
    
   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);

  });
``