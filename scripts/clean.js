import { existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const targets = [
    'dist',
    '.vite',
    'node_modules/.cache',
    'coverage',
    'reports'
];

let cleaned = 0;

for (const target of targets) {
    const resolvedPath = resolve(process.cwd(), target);
    if (!existsSync(resolvedPath)) {
        console.log(`Skipped ${target} (not found)`);
        continue;
    }

    rmSync(resolvedPath, { recursive: true, force: true });
    console.log(`Removed ${target}`);
    cleaned += 1;
}

if (cleaned === 0) {
    console.log('Nothing to clean.');
} else {
    console.log(`Cleaned ${cleaned} ${cleaned === 1 ? 'item' : 'items'}.`);
}

