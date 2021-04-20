#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');
const { inquirerFn, downloadFn } = require('../lib/init.js');
program.version(pkg.version, '-v,--version');
program
    .command('init <dirname>')
    .description(pkg.description)
    .action(dirname => {
        // 命令init触发时的回掉函数
        if (fs.existsSync(dirname)) {
            return console.log(chalk.red(`dirname ${dirname} is exist`));
        }
       inquirerFn().then(answers => {
            downloadFn(answers, dirname);
        });
    });
// 如果输入没有注册的命令,输出帮助提示
program.arguments('<command>').action(cmd => {
    program.outputHelp();
    console.log(' ');
    console.log(`error: unknown option '${cmd}'`);
});
program.parse(process.argv);
// 如果没写参数,输出帮助提示
if (!process.argv.slice(2).length) {
    program.outputHelp();
}