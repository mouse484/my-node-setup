const superb = require('superb')

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'Project name.',
        default: this.outFolder,
        filter: val => val.toLowerCase(),
      },
      {
        name: 'description',
        message: 'Project description',
        default: `my ${superb()} project`
      },
      {
        name: 'author',
        type: 'string',
        message: 'Author name',
        default: '{gitUser.name}',
      },
      {
        name: 'eslint',
        type: 'confirm',
      },
      {
        name: 'prettier',
        type: 'confirm',
      },
      {
        name: 'typescript',
        type: 'confirm',
        default: false,
      }
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**',
      filters: {
        '.eslintrc_js': 'eslint',
        '.prettierrc': 'prettier',
        'tsconfig_json': 'typescript'
      }
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        'package_json': 'package.json',
        '.eslintrc_js': '.eslintrc.js',
        'tsconfig_json': 'tsconfig.json'
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
