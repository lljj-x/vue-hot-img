module.exports = {
    presets: [
        [
            '@lljj/babel-preset-app',
            {
                useBuiltIns: false,
                regenerator: false,
                helpers: false
            }
        ]
    ]
};
