const cdk = require('@aws-cdk/core')
const{ AssetCode, Function, Runtime } = require('@aws-cdk/aws-lambda')

class LambdaStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props)
    
    this.lambdaFunc = new Function(this, 'arithmeticLambda', {
      code: new AssetCode('./arithmetic'),
      handler: 'handler.handler',
      runtime: Runtime.NODEJS_12_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10)
    })
  }
}

module.exports = { LambdaStack }
