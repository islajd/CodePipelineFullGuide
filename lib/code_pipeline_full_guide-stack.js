const cdk = require('@aws-cdk/core')
const{ GitHubSourceAction, GitHubTrigger } = require('@aws-cdk/aws-codepipeline-actions')
const{ Repository } = require('@aws-cdk/aws-codecommit')
const{ Artifact } = require('@aws-cdk/aws-codepipeline')
const{ CdkPipeline, SimpleSynthAction } = require('@aws-cdk/pipelines')
const{ CodeCommitSourceAction } = require('@aws-cdk/aws-codepipeline-actions')

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
      oauthToken: cdk.SecretValue.secretsManager('islajd-cdk-pipeline-github-token'),
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

    new CdkPipeline(this, 'Pipeline', {
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

  }
}

module.exports = { CodePipelineFullGuideStack }
