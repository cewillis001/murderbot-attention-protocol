# AWS Amplify deployment follow-up

The intended public deployment should ultimately be owned by the project
owner, not hosted through OpenAI Sites.

Recommended path:

1. Publish the repository to the owner's GitHub account.
2. Connect the repository and production branch to AWS Amplify Hosting.
3. Configure the build output, custom domain, HTTPS, and deployment previews
   in the owner's AWS account.
4. Add S3 and CloudFront later only if locally downloadable media or model
   assets outgrow the main site bundle.
5. Remove `.openai/hosting.json` and retire the private OpenAI Sites preview
   after the AWS deployment is verified.

Do not perform this migration until the core experience is stable enough to
justify setting up the permanent deployment pipeline.

