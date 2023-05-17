#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const Mustache = require('mustache');
const chalk = require('chalk'); // 5版本使用es模块，4及4以下是commonjs
const figlet = require('figlet'); // 终端输出logo

const fs = require('fs');
const path = require('path');
const CWD = process.cwd();
const pkg = require('../package.json');
const create = require('../lib/create.js');

program.version(pkg.version);

program.on('--help', () => {
  console.log(`\r\n${figlet.textSync('create-app', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 500,
    whitespaceBreak: true
  })}`)
  // 新增信息说明
  console.log(`\r\n${chalk.cyan(`create-app <command> --help`)} for detailed usage of givern command \r\n`)
})

// create 命令
program
  .command('create <name> [options]')
  .description('创建新项目')
  .option('-f --force', '强制覆盖已存在文件')
  .action(async (name, option) => {
    create(name, option);
  })

program.parse(process.argv);