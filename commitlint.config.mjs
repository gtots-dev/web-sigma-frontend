const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'refactor',
        'chore',
        'docs',
        'test',
        'perf',
        'ci',
        'build',
        'revert'
      ]
    ],
    'subject-case': [0],
    'header-max-length': [2, 'always', 120]
  }
}

export default commitlintConfig
