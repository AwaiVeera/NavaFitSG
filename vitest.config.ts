import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            reportsDirectory: './coverage',
            all: true,
            include: ['scripts/modules/**/*.js'],
            thresholds: {
                statements: 90,
                functions: 85,
                lines: 90
            }
        }
    }
});

