export default [{
        ignores: [
            'dist/**',
            'node_modules/**',
            'coverage/**'
        ]
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                fetch: 'readonly',
                IntersectionObserver: 'readonly',
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                console: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                process: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                vi: 'readonly',
                MouseEvent: 'readonly',
                Event: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': ['warn', {
                args: 'none',
                ignoreRestSiblings: true
            }],
            'no-undef': 'error',
            'prefer-const': 'warn',
            'no-console': ['warn', {
                allow: ['warn', 'error', 'info', 'log', 'table', 'time', 'timeEnd']
            }]
        }
    }
];