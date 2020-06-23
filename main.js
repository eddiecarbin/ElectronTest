const { app, BrowserWindow } = require('electron')
const fetch = require("node-fetch");

//https://raspberry-projects.com/pi/pi-operating-systems/raspbian/gui/disable-screen-sleep

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        fullscreen: true,
        // kiosk: true,
        backgroundColor: "#E5D47D",
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    // win.loadFile('index.html')

    // let request = new Request("./appdata.json");

    // fetch("https://api.myjson.com/bins/szw86")
    fetch("https://raw.githubusercontent.com/eddiecarbin/MontereyRiverPanel/master/appdata.json")
        .then(response => {
            return response.json();
        }).then(json => {
            console.log(json.url);
            win.loadURL(json.url);
        }).catch(err => {
            console.log(err);
        });
    // Open the DevTools.
    //win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.