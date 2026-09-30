import fs from "fs"
import osUtils from "os-utils";  // make sure to install os-utils types using npm i --save-dev @types/os-utils
const POLLING_INTERVAL = 500;

export function pullResources() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage()
        const ramUsage = getRamUsage()
        console.log({cpuUsage, ramUsage})
    }, POLLING_INTERVAL);
}

function getCpuUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve);
    });
}

function getRamUsage(){
    return 1 - osUtils.freememPercentage()
}