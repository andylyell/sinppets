import babel from '@rollup/plugin-babel';

export default {
    input: './src/js/index.js',
    watch: {
        include: './src/js/**'
    },
    output: {
        file: './src/script.js',
        format: 'iife',
        name: 'version',
    },
    plugins: [
        babel(
            {
                babelHelpers: 'bundled'
            }
        )
    ]
};