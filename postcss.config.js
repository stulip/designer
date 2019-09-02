
module.exports = {
    plugins: [
        require("postcss-import"),
        require("precss"),
        require('postcss-preset-env')({
            stage: 3,
            features: {
                'nesting-rules': true
            }
        }),
        require('postcss-nested'),
        require("cssnano")
    ]
};
