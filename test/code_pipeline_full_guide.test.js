const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const CodePipelineFullGuide = require('../lib/code_pipeline_full_guide-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CodePipelineFullGuide.CodePipelineFullGuideStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
