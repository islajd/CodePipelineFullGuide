#!/usr/bin/env node

const cdk = require('@aws-cdk/core')
const{ CodePipelineFullGuideStack } = require('../lib/pipe/code_pipeline_full_guide-stack')

const app = new cdk.App()
new CodePipelineFullGuideStack(app, 'CodePipelineFullGuideStack', {})