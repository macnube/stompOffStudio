const { addBabelPlugin, override } = require('customize-cra');

const rootImportConfig = [
    'module-resolver',
    {
        root: ['./src'],
        alias: {
            routes: './src/routes',
            components: './src/components',
            constants: './src/constants',
            utils: './src/utils',
        },
    },
];

module.exports = override(addBabelPlugin(rootImportConfig));
