const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();


let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Cargar la aplicación Angular/Ionic generada en `www`
  mainWindow.loadURL(`file://${path.join(__dirname, 'www/index.html')}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('save-pdf', async (_event, { fileName, pdfData }) => {
  try {
    // Mostrar el diálogo de guardado
    const { filePath } = await dialog.showSaveDialog({
      title: 'Guardar PDF',
      defaultPath: path.join(app.getPath('documents'), `${fileName}.pdf`),
      filters: [{ name: 'Archivos PDF', extensions: ['pdf'] }]
    });

    // Si el usuario cancela, salir
    if (!filePath) {
      console.log('El usuario canceló la operación.');
      return { success: false, error: 'Guardado cancelado' };
    }

    // Guardar el PDF en la ruta seleccionada
    fs.writeFileSync(filePath, Buffer.from(pdfData, 'base64'));
    console.log('PDF guardado correctamente en:', filePath);

    return { success: true, path: filePath };

  } catch (error) {
    console.error('Error al guardar el PDF:', error);
    return { success: false, error: error.message };
  }
});