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
  console.log(`\r\n${figlet.textSync('cra-react', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 500,
    whitespaceBreak: true
  })}`)
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