#!/usr/bin/env node

let program = require('commander');
const fs = require('fs');
const path = require('path');
const CWD = process.cwd();
const pkg = require('../package.json');

program.version(pkg.version);

program.command('build').description('打包cli成功')

program
  .command('create-app <name> [options]')
  .description('创建项目名称')
  .action(function(name, options){
    console.log(name);
    console.log(options);
  });

program
  .command('config')
  .description('读取配置文件')
  .action((appName, options) => {
    let config = {
      path: 'svg',
    }

    const configPath = CWD + '/src/config.js';
    console.log(CWD);
    // 如果使用了配置文件，则以配置文件为准
    if (fs.existsSync(configPath)) {
      const userConfig = require(path.resolve(CWD, 'src/config.js'))
      config = { ...config, ...userConfig }
      console.log(`存在配置文件config.js，获取到的名字为`, config.name)
    } else {
      console.log(`不存在配置文件`)
    }
  })

program.parse(process.argv);