const Promise = require('bluebird');
const chalk = require('chalk');

async function thisFunctionThrows() {
    console.log(chalk.green('waiting to throw'));
    await Promise.delay(10000);
    throw new Error('This is an error');
}

async function passThroughWithoutAwait() {
    try {
        return thisFunctionThrows();
    } catch (error) {
        console.log(chalk.red('passThroughWithoutAwait caught the error'));
    }
}

async function passThroughWithAwait() {
    try {
        return await thisFunctionThrows();
    } catch (error) {
        console.log(chalk.green('passThroughWithAwait caught the error'));
    }
}

async function main() {
    console.log(chalk.grey('waiting'));
    await Promise.delay(1000);
    thisFunctionThrows();
    console.log(chalk.red('function above has thrown and i\'m still here'));

    try {
        thisFunctionThrows();
    } catch (error) {
        console.log(chalk.yellow('I\'ve caught an error'));
    }
    console.log(chalk.red('Even though the function above thrown and was in a try catch i\'m still executing'));

    try {
        await thisFunctionThrows();
    } catch (error) {
        console.log(chalk.green('I\'ve caught an error'));
    }

    try {
        await passThroughWithoutAwait();
        console.log(chalk.yellow('I should never ever get here'));
    } catch (error) {
        console.log(chalk.red('passThroughWithoutAwait has not caught the error'));
    }

    try {
        await passThroughWithAwait();
        console.log(chalk.green('passThroughWithAwait has caught the error internally'))
    } catch (error) {
        console.log(chalk.yellow('I should never ever get here'));
    }
}

main().then(() => console.log(chalk.yellow('finished')));