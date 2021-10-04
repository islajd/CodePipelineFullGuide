const{ Stage } = require('@aws-cdk/core')
const{ ApiGatewayStack } = require('../../ApiGatewayStack')
const{ LambdaStack } = require('../../LambdaStack')

class ApplicationStage extends Stage{
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id)

    const lambdaStack = new LambdaStack(this, 'CodePipelineLambdaStack', props)
    const apiStack = new ApiGatewayStack(this, 'CodePipelineApiGatewayStack', {
      ...props,
      lambdaFunction: lambdaStack.lambdaFunc
    })

    this.urlOutput = apiStack.urlOutput
  }
}

module.exports = {
  ApplicationStage
}