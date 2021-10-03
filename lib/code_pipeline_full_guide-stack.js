const cdk = require('@aws-cdk/core');
const {Repository} = require("@aws-cdk/aws-codecommit");
const {Artifact} = require("@aws-cdk/aws-codepipeline");
const {CdkPipeline, SimpleSynthAction} = require("@aws-cdk/pipelines");
const {CodeCommitSourceAction} = require("@aws-cdk/aws-codepipeline-actions");

class CodePipelineFullGuideStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const repoName = "aws.blog.cdk-pipelines";
    const repo = Repository.fromRepositoryName(this, 'ImportedRepo', repoName);

    const sourceArtifact = new Artifact();
    const cloudAssemblyArtifact = new Artifact();

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'MyAppPipeline',
      cloudAssemblyArtifact,

      // Here we use CodeCommit instead of Github
      sourceAction: new CodeCommitSourceAction({
        actionName: 'CodeCommit_Source',
        repository: repo,
        output: sourceArtifact
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        // Use this if you need a build step (if you're not using ts-node
        // or if you have TypeScript Lambdas that need to be compiled).
        buildCommand: 'npm run test',
      }),
    });
    
    // Here, add the stages for the Application code later

  }
}

module.exports = { CodePipelineFullGuideStack }
