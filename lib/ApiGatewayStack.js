const cdk = require('@aws-cdk/core')
const{ LambdaIntegration, RestApi } = require('@aws-cdk/aws-apigateway')

class ApiGatewayStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props)
    
    const api = new RestApi(this, 'arithmetic-api', {
      restApiName: 'Arithmetic Service'
    })
    // Integration with the lambda on GET method
    api.root.addMethod('GET', new LambdaIntegration(props.lambdaFunction))
  
    // Make the URL part of the outputs of CloudFormation (see the Outputs tab of this stack in the AWS Console)
    this.urlOutput = new cdk.CfnOutput(this, 'Url', { value: api.url })
  }
}

module.exports = { ApiGatewayStack }
