import { app, BrowserWindow } from "electron";
import path from "node:path";
import { isDev } from "./util.js";
import { pullResources } from "./resourceManager.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123/');;
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
    }

    pullResources();
});

