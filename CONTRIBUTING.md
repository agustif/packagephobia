# Contributing

Thank you for considering contributing to Package Phobia!

The goal of this project can be found in the README.md so this document will focus on building, running, and testing the code.

## Getting Started

First, clone this repository.

```sh
git clone https://github.com/styfle/packagephobia
cd packagephobia
```

### Redis

You will need to run `redis` either locally or in the cloud such as [upstash.com](https://upstash.com/?ref=packagephobia).

If you have docker, you can get started quickly with the following command.

```sh
docker run -p 6379:6379 redis
```

### Env

Create a `.env` file in the root directory.

```
# required settings
REDIS_URL="redis://127.0.0.1:6379"

# optional settings
PORT="3000"
NPM_REGISTRY_URL="https://registry.npmjs.com"
```

## Running the code

Install [Vercel](https://vercel.com/download) CLI

```sh
npm install -g vercel
```

Run the development environment

```sh
vercel dev
```

Now the web app should be available at http://localhost:3000


## Testing the code

Make sure the tests are passing.

```
npm run test
```

## Deploying the code

This fork supports two deployment paths to Vercel:

### Option 1: Vercel GitHub Integration (Dashboard)

1. Import your fork in the [Vercel Dashboard](https://vercel.com/new)
2. Set the `REDIS_URL` environment variable (e.g., from [Upstash](https://upstash.com))
3. Vercel will automatically deploy on every push to `main` and create preview deployments for PRs

### Option 2: GitHub Actions with Vercel Token

1. Create a Vercel project for your fork (via dashboard or `vercel` CLI)
2. Get your credentials:
   - `VERCEL_TOKEN`: Create in [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID`: Find in your Vercel team settings or `.vercel/project.json` after running `vercel link`
   - `VERCEL_PROJECT_ID`: Find in project settings or `.vercel/project.json` after running `vercel link`
3. Add these as [GitHub Repository Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
4. Set `REDIS_URL` in your Vercel project environment variables (all environments)
5. Push to `main` or open a PR to trigger the deploy workflow

Both paths can coexist. The GitHub Action workflow (`.github/workflows/deploy-vercel.yml`) will deploy when secrets are configured.

### Local Development Deployment

If you want to deploy from the command line, install [Vercel](https://vercel.com) CLI with `npm i -g vercel`.

Then run `vercel` to deploy a preview, or `vercel --prod` for production.

## Submitting a PR

Wow you're doing great! Before you submit a Pull Request, please create an issue so that we can discuss the problem you are solving. When we're all on the same page, make sure you test the code and prettify the code. And please add additional tests if possible.

```sh
npm run test
npm run prettier
```
