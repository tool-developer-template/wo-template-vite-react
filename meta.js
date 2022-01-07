// 项目创建完成后输出信息
exports.run ={
  "yarn": "Start to install dependencies for the project",
  "yarn dev":"Start to the development project",
  "yarn build":"Start to the production project"
};
// 项目创建过程中的prompts
// 参考:https://github.com/SBoudrias/Inquirer.js/blob/master/README.md
exports.prompts = {
  "name": {
      "message": "What's the project name?",
      "default": "`${this.name}`"
  },
  "description": {
      "name": "description",
      "message": "What's your project description?"
  }
}