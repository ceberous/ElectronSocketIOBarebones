const electron = require('electron'); 
const app = electron.app; 
const BrowserWindow = electron.BrowserWindow; 
const nativeImage = electron.nativeImage;

let topWin;
let childWin;
 
function createTopWindow () {
  
  topWin = new BrowserWindow({
    width: 500,
    height: 500,
    minWidth: 400,
    minHeight: 400,
    //icon: './shieldIcon.png',
    title: 'Media Explorer',
    show: false,
    frame: true,
    //nodeIntegration: false,
  });

  topWin.loadURL(`file://${__dirname}/client/index.html`); // Points to the html file to load in the app
  //topWin.maximize(); // Starts as maximized as you can get!
  
  topWin.once('ready-to-show', () => {
    topWin.show();
    topWin.webContents.openDevTools();
  });

  topWin.on('closed', () => {
    topWin = null;
  });

}

//setTimeout( () => { createChildWindow(); } , 2000 );
function createChildWindow () {
  
  childWin = new BrowserWindow({
    parent: topWin,
    width: 400,
    height: 400,
    minWidth: 200,
    minHeight: 200,
    //icon: './shieldIcon.png',
    title: 'Media Explorer',
    show: false,
    frame: false
  });

  childWin.loadURL(`file://${__dirname}/client/child.html`); // Points to the html file to load in the app
  //childWin.maximize(); // Starts as maximized as you can get!
  
  childWin.once('ready-to-show', () => {
    childWin.show();
  });

  childWin.on('closed', () => {
    childWin = null;
  });

}

//const icon = nativeImage.createFromPath('./shieldIcon.png');
app.setName('Media Explorer');
if (process.platform === 'darwin') {
  app.dock.setIcon(icon);
}

app.on('ready', () => {
  createTopWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (topWin === null) {
    createTopWindow();
  }
});