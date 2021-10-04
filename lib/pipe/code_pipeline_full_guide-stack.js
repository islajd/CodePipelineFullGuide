const cdk = require('@aws-cdk/core')
const{ GitHubSourceAction, GitHubTrigger } = require('@aws-cdk/aws-codepipeline-actions')
const{ Artifact } = require('@aws-cdk/aws-codepipeline')
const{ CdkPipeline, SimpleSynthAction } = require('@aws-cdk/pipelines')
const{ ApplicationStage } = require('./stages/ApplicationStage')
class CodePipelineFullGuideStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props)

    const repo = {
      owner: 'islajd',
      repo: 'CodePipelineFullGuide'
    }

    // source to retrieve from github
    const sourceArtifact = new Artifact()
    // synth to produce
    const cloudAssemblyArtifact = new Artifact()
    
    // repository clone
    const githubSource = new GitHubSourceAction({
      actionName: 'GitHub',
      output: sourceArtifact,
      oauthToken: cdk.SecretValue.secretsManager('islajd-github-token'),
      trigger: GitHubTrigger.POLL,
      ...repo
    })

    // build action
    const synthAction = SimpleSynthAction.standardNpmSynth({
      sourceArtifact,
      cloudAssemblyArtifact,
      // Use this if you need a build step (if you're not using ts-node
      // or if you have TypeScript Lambdas that need to be compiled).
      buildCommand: 'npm run test',
    })

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      // Pipeline name
      pipelineName: 'PipelineLambdaProxy',

      // output
      cloudAssemblyArtifact,

      // Where the source can be found
      sourceAction: githubSource,

      // How it will be built and synthesized
      synthAction
    })
    
    // Here, add the stages for the Application code later
    const testEnv = new ApplicationStage(this, 'Deploy Test Env.')
    pipeline.addApplicationStage(testEnv)

  }
}

module.exports = { CodePipelineFullGuideStack }
