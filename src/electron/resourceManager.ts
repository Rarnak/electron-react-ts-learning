import fs from "fs";
import os, { cpus } from "os";
import osUtils from "os-utils";  // make sure to install os-utils types using npm i --save-dev @types/os-utils
const POLLING_INTERVAL = 500;

export function pullResources() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage()
        const ramUsage = getRamUsage()
        const storageData = getStorageData()
        console.log({ cpuUsage, ramUsage, storageUsage: storageData.usage })
    }, POLLING_INTERVAL);
}

export function staticData() {
    const totalStorage = getStorageData().total
    const cpuModel = os.cpus()[0].model
    const totalMemory = Math.floor(osUtils.totalmem() / 1024)

    return {
        totalStorage,
        cpuModel,
        totalMemory,
    }
}

function getCpuUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve);
    });
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage()
}

function getStorageData() {
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/')
    const total = stats.bsize * stats.blocks
    const free = stats.bsize * stats.bfree

    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free / total,
    }
}