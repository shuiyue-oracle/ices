module.exports = async function(name, option) {
  const path = require('path');
  const fs = require('fs-extra');
  const inquirer = require('inquirer');
  const cwd = process.cwd();
  const targetCWD = path.join(cwd, name);
  if(fs.existsSync(targetCWD)) { // 是否存在文件
    if(option?.force) { // 是否强制创建
      await fs.remove(targetCWD); // 删除原存在目录
    } else { // 询问用户是否强制创建
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action',
          choices: [
            { name: '覆盖', value: 'overwrite' },
            { name: '不覆盖', value: false }
          ]
        }
      ]);

      if(!action) {
        return;
      } else {
        await fs.remove(targetCWD);
      }
    }
  }

  // 创建项目
  const Factory = require('./factory');
  const factory = new Factory(name, targetCWD);
  factory.create();
}