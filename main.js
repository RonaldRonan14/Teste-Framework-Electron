const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  //mainWindow.webContents.openDevTools()
  mainWindow.maximize()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('nome', (event, args) => {
  if (args) {
    event.returnValue = 'Sinc: ' + args;
  }

  event.returnValue = ''
})

ipcMain.on('problema', (event, args) => {
  if (args) {
    let resultado = eval(args)
    event.returnValue = resultado
  }
  event.returnValue = ''
})