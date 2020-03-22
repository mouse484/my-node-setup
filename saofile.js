const superb = require('superb').random

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
        name: 'type',
        message: 'Select development type',
        type: 'list',
        choices: [
          { name: 'Node.js', value: 'node' },
          'browser'
        ],
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
      },
      {
        name: 'dotenv',
        type: 'confirm',
        default: false,
      }
    ]
  },
  templateData: {
    package: require('./lib/package.json'),
    prettier: require('eslint-config-mouse/prettier').prettier
  },
  actions: [
    {
      type: 'add',
      files: '**',
      filters: {
        '.eslintrc.ejs': 'eslint',
        '.prettierrc': 'prettier',
        'tsconfig.ejs': 'typescript',
        '.env': 'dotenv',
      }
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        'package.ejs': 'package.json',
        '.eslintrc.ejs': '.eslintrc.js',
        'tsconfig.ejs': 'tsconfig.json'
      }
    },
    {
      type: 'modify',
      files: 'package.json',
      handler(data) {
        delete data.scripts['']
        delete data.devDependencies['']
        return data
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
