/* eslint-env mocha */

const assert = require('chai').assert
const linter = require('../lib/linters/example-linter')
const path = require('path')
const fixtures = path.join(__dirname, 'example-linter')
const tap = require('tap')

describe('example-linter', () => {
  describe('valid example', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-plugin',
        path: path.join(fixtures, 'valid-plugin'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid plugin with yaml instead of yml', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-plugin-with-yaml',
        path: path.join(fixtures, 'valid-plugin-with-yaml'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid plugin with zero config', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'zero-config-plugin',
        path: path.join(fixtures, 'zero-config-plugin'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid plugin with examples without a steps key', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-example-without-a-steps-key',
        path: path.join(fixtures, 'valid-example-without-a-steps-key'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid example with ignored yml block', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-example-with-ignored-yml-block',
        path: path.join(fixtures, 'valid-example-with-ignored-yml-block'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid example with SSH syntax', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'ssh://git@github.com/my-org/example-buildkite-plugin',
        path: path.join(fixtures, 'valid-plugin-with-ssh-syntax'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('invalid examples', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        id: 'invalid-examples',
        path: path.join(fixtures, 'invalid-examples'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
    it('is missing version', async () => {
      assert.isFalse(await linter({
        id: 'missing-version',
        path: path.join(fixtures, 'missing-version'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('old plugin syntax', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        id: 'invalid-examples',
        path: path.join(fixtures, 'old-plugins-syntax'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('custom readme paths', () => {
    it('should work', async () => {
      assert(await linter({
        id: 'custom-readme',
        path: path.join(fixtures, 'custom-readme'),
        silent: true,
        readme: 'custom-readme.md'
      }, tap))
    })
  })
  describe('skips validation if missing .configuration', () => {
    it('should work', async () => {
      assert(await linter({
        id: 'missing-configuration',
        path: path.join(fixtures, 'missing-configuration'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid local example', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: './test/example-linter/valid-local-plugin',
        path: path.join(fixtures, 'valid-local-plugin'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
})
