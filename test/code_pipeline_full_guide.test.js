/* eslint-disable no-undef */
// const{ expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert')
// const cdk = require('@aws-cdk/core')
// const CodePipelineFullGuide = require('../lib/code_pipeline_full_guide-stack')
const{ handler } = require('../src/arithmetic/handler')

describe('Test arithmetic handler', () => {
  it('Check status code', async () => {
    let emptyBody = {}
    let event = { body: emptyBody }
    
    const result = await handler(event)
    expect(result.statusCode).toEqual(200)
  })

  it('Check sum', async () => {
    let body = { a: 2, b: 2 }
    let event = { body }

    const result = await handler(event)
    expect(result.body).toEqual(4)
  })
})