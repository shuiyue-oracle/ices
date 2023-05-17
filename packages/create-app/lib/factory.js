const ora = require('ora'); // 显示加载中的效果
const util = require('util'); // 让没有 node 环境的宿主拥有 node 的 util 模块
const downloadGitRepo = require('download-git-repo'); // 下载 git 存储库
const path = require('path');
const chalk = require('chalk');

module.exports = class Factory{
  /**
   * @param {*} name 名称
   * @param {*} targetCWD 目录地址
   */
  constructor(name, targetCwd){
    this.name = name; // 目录名称
    this.targetCwd = targetCwd; // 目录所在地址
    this.downloadGitRepo = util.promisify(downloadGitRepo); // 对 download-git-repo 进行 promise 化改造
  }

  // 加载动画
  async loading(fn, message, ...args) {
   
    const spinning = ora(message) // 初始化 ora，传入提示信息 message 
    spinning.start() // 开始加载动画


    try {
      const result = await fn(...args) // 执行 fn 方法
      spinning.succeed() // 将状态改为成功

      return result
    } catch (err){
      console.log(err);
      spinning.fail('Request failed, refetch ...')
    }
  }

  // 下载远程模版
  async download(repo, tag){
    const requestUrl = `shuiyue-oracle/template-react#feature-0.0.1` // 拉取模版的地址
    const createUrl =  path.resolve(process.cwd(), this.targetCwd) // 创建项目的地址

    // 下载方法调用
    await this.loading(this.downloadGitRepo, 'waiting download template', requestUrl, createUrl)
  }

  // 创建项目
  async create() {
    console.log('创建项目---', this.name, this.targetCwd)
    try {
      await this.download()

      console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
      console.log(`\r\n  npm install`)
      console.log("\r\n  npm run dev\r\n")
    } catch (error) {
      console.log(error);
    }
  }
}
