
module.exports = {
    plugins: [
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
