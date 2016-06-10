'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let clobberServer;
var configFile = process.argv[2]||'config.json'

console.log("using config "+configFile);


// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.

  
  
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    webPreferences:{nodeIntegration: false},
    icon: '128.png', 
    title: "Slobber"
  });

  clobberServer = require('slobber-server').server(configFile, function(){
    console.log("executed");
    mainWindow.loadURL('http://localhost:7562');
  });
 
  

  mainWindow.on('closed', function() {
    
    mainWindow = null;
    clobberServer = null;
  });
});