#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
let user = await inquirer.prompt({
    name: "timer", type: "number",
    message: "Enter the Seconds",
    validate: (input) => {
        if (isNaN(input)) {
            return "Enter Number Only";
        }
        else if (input > 60) {
            return "Below 60 only";
        }
        else
            return true;
    }
});
const initTime = new Date().setSeconds(new Date().getSeconds() + user.timer);
const intervalTime = new Date(initTime);
setInterval(() => {
    const curretTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, curretTime);
    if (timeDiff <= 0) {
        console.log(chalk.red.bold("Timer has Expired"));
        process.exit();
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`);
}, 1000);
