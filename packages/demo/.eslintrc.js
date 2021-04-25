module.exports = {
    root: true,
    env: {
        browser: true
    },
    plugins: ['vue'],
    extends: [
        '@lljj/eslint-config',
        '@lljj/eslint-config/vue'
    ],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    }
};
