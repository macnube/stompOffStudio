const { addBabelPlugin, override } = require('customize-cra');

const rootImportConfig = [
    'root-import',
    {
        rootPathPrefix: 'src',
        rootPathSuffix: 'src',
    },
];

module.exports = override(addBabelPlugin(rootImportConfig));
