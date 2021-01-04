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
    '!./src/shared/errors/handler.ts',
    '!./**/I[A-Z]*.ts',
    '!./**/fakes/*.ts'
  ],
  coverageProvider: 'babel',
  coverageReporters: ['lcov', 'text-summary'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src'
  })
}

export default config
