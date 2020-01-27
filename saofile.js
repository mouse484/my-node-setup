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
      }
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**',
      filters: {
        '_.eslintrc.js': 'eslint',
        '.prettierrc': 'prettier'
      }
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        'package_json': 'package.json',
        '_.eslintrc.js': '.eslintrc.js',
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
