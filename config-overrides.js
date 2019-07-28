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
            graphql: './src/graphql',
            core: './src/core',
            src: './src',
            assets: './src/assets',
        },
    },
];

module.exports = override(addBabelPlugin(rootImportConfig));
