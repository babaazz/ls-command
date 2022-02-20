#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const {lstat} = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err,fileNames) => {
    if(err) {
        throw new Error(err);
    }

    const allStatsPromises = fileNames.map(fileName => lstat(path.join(targetDir,fileName)));

    const allstats = await Promise.all(allStatsPromises);

    for(let i = 0; i < allstats.length; i++) {
        if(allstats[i].isFile()){
            console.log(chalk.green(fileNames[i]));
        } else {
            console.log(chalk.blue.bold(fileNames[i]));
        }
    }

})

