import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test-options';

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Global Settings
export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,

  expect:{
    timeout: 2000
  },

  retries: 1,

  reporter: 'html',

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'http://localhost:4200/',
  },

  // Project Settings
  projects: [
    {
      name: 'chromium',
    },
  ]
});
