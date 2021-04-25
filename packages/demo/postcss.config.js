module.exports = {
    plugins: [
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-color-mod-function'),
        require('postcss-cssnext')({
            warnForDuplicates: false,
        })
    ]
};
