import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

import { compilerOptions } from './tsconfig.json'

const config: Config.InitialOptions = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/shared/infra/http/server.ts',
    '!./src/shared/infra/typeorm/**/*',
    '!./**/I[A-Z]*.ts'
  ],
  coverageProvider: 'v8',
  coverageReporters: ['lcov', 'text-summary'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src'
  })
}

export default config
