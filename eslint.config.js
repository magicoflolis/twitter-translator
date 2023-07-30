'use strict';
import js from '@eslint/js';
import globals from 'globals';
import configPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  configPrettier,
  {
    // files: ['*.js'],
    ignores: [
      'src/UserJS/header.js',
      'src/**/header.js',
      'src/languages.js',
      'tools/userscript.js',
      'dist/**/*.js'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        GM: 'writable',
        ghCDN: 'readonly',
        debugToggle: 'readonly',
        languages: 'readonly',
        nitterCSS: 'readonly',
        tetCSS: 'readonly',
        twCSS: 'readonly',
        ...globals.node,
        ...globals.nodeBuiltin,
        ...globals.browser,
        ...globals.greasemonkey,
        ...globals.webextensions
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: true,
          arrowFunctions: true,
          modules: true
        }
      }
    },
    rules: {
      'no-var': 'error',
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }]
    }
  }
];
