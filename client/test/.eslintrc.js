module.exports = {
    env: {
      browser: true,
      commonjs: true,
      node: true,
      es6: true
    },
    globals: {
      _: false
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-one-expression-per-line': 'off',
      'react/destructuring-assignment': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/button-has-type': 'off',
      'vars-on-top': 'off',
      indent: 'off',
      //'arrow-parens': ['error', 'as-needed'],
      'no-restricted-properties': ['off'],
      'no-bitwise': ['off'],
      'default-case': 'off',
      'no-trailing-spaces': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-plusplus': 'off',
      'consistent-return': 'off',
      'no-unused-expressions': 'off',
      'one-var': 'off',
      'prefer-const': 'off',
      'spaced-comment': 'off',
      'operator-linebreak': 'off',
      'import/prefer-default-export': 'off',
      'no-else-return': 'warn',
      semi: [1, 'always'],
      'space-unary-ops': 2,
      'import/no-unresolved': 'off',
      'comma-dangle': ['error', 'never'],
      'arrow-body-style': 'off',
      'no-underscore-dangle': 'off'
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module'
    },
    ignorePatterns: ['node_modules/'],
    settings: {
      'import/resolver': {
        node: {
          moduleDirectory: ['node_modules', '.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      },
      react: {
        version: 'detect'
      }
    }
  };
  