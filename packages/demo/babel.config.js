module.exports = {
    presets: [
        [
            '@lljj/babel-preset-app',
            {
                useBuiltIns: false,
                regenerator: true,
                helpers: true
            }
        ]
    ]
};
