import {terser} from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel';

export default [
    {
        input: './src/js/index.js',
        watch: {
            include: './src/js/**'
        },
        output: {
            file: './public/script.js',
            format: 'iife',
            name: 'version',
            plugins: [
                terser()
            ]
        },
        plugins: [
            babel(
                {
                    babelHelpers: 'bundled'
                }
            )
        ]
    }
];