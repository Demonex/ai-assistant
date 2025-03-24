# Monorepo TS

<!-- TOC -->

- [Introduction](#introduction)
- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Workspace](#workspace)
  - [Namespace](#namespace)
  - [Packages](#packages)
  - [Apps](#apps)
  - [Services](#services)
- [Deployment](#deployment)
- [The "built packages" strategy](#the-built-packages-strategy)
  - [Convert path aliases](#convert-path-aliases)
  - [Write ESM without import file extensions](#write-esm-without-import-file-extensions)
  - [Tree shaking](#tree-shaking)
- [The "internal packages" strategy](#the-internal-packages-strategy)
- [Live code changes from internal packages](#live-code-changes-from-internal-packages)
- [Deploying](#deploying)
- [Secrets](#secrets)

<!-- /TOC -->

## Introduction

This is the Typescript monorepo setup.

Project are based on Nest.js, React.js

## Features

- [Turborepo](https://turbo.build/) to orchestrate the build process and
  dependencies, including the v2 watch task.
- Showcasing a traditional "built package" with multiple entry points, as well
  as the ["internal package"](#the-internal-packages-strategy) strategy
  referencing Typescript code directly.
- Multiple isolated Firebase deployments, using
  [Tailwind CSS](https://tailwindcss.com/)
- Working IDE go-to-definition and go-to-type-definition using `.d.ts.map` files
- ES modules for everything
- Path aliases
- Shared configurations for ESLint
- Simple standardized configuration for TypeScript
- Vitest

## Install

In the main branch of this repo, packages are managed with PNPM.

I recommended using `pnpm` over `npm` or `yarn`. Apart from being fast and
efficient, I believe PNPM has better support for monorepos.

You can install PNPM with `corepack` which is part of modern Node.js versions:

- `corepack enable` (if you have not used it before)
- `corepack prepare pnpm@latest --activate`

Then run `pnpm install` from the repository root.

## Usage

There are 4 commands to run in separate processes:

- From the monorepo root, run `pnpm watch`. This builds all the code (except the
  web app) using the Turborepo watch task.
- From `apps/web` run `pnpm dev`. This start the Next.js dev server and builds
  its pages on request.

The web app should become available on http://localhost:3000 and the emulators
UI on http://localhost:4000.

You should now have a working local setup, in which code changes to any package
are picked up.

> Note that hot-reloading for the firebase packages like API are not as instant
> as you are used to with front-end tooling like Next.js. When code changes are
> detected, the isolate process needs to run again to compile new output and the
> function needs to reload.

## Workspace

### Namespace

`@repo` because I expect it will become the standard.

### Packages

- [common](./packages/common) Code that can shared across both front-end and
  back-end environments.
- [backend](./packages/backend) Code that is shared between server environments
  like cloud functions.

### Apps

- [web](./apps/web) A React.js based web application configured to use Tailwind
  CSS and ShadCN components.

### Services

- [api](./services/api)

## The "built packages" strategy

In a traditional monorepo setup, each package exposes its code as if it was a
published NPM package. For Typescript this means the code has to be transpiled
and the manifest entry points reference to the build output files. You can use
Typescript `tsc` compiler for this, but it is likely you will want to use a
bundler for the reasons explained below.

The `services` in this codebase use TSUP as a bundler. It is a modern, simple to
use Rollup-inspired bundler for Typescript.

The advantages of using a bundler are discussed below.

### Convert path aliases

If you use path aliases like `~/*` or `@/*` to conveniently reference top-level
folders from deeply nested import statements, these paths are not converted by
the standard Typescript `tsc` compiler.

A bundler will typically remove path aliases, because it combines your code into
self-contained files that do not import other local files themselves.

If you target platforms without using bundler, you will have to convert them.
You can run something like `tsc-alias` after your build step. Note that path
aliases can also end up in `d.ts` files.

### Write ESM without import file extensions

A bundler will allow you to output ESM-compatible code without having to adhere
to the ESM import rules. ESM requires all relative imports to be explicit,
appending a `.js` file extension for importing TS files and appending
`/index.js` when importing from the root of a directory.

The reason you need to use `.js` and not `.ts` is because these imports, like
path aliases are not converted by the Typescript compiler, and so at runtime the
transpiled JS file is what is getting imported.

Because a bundler, by nature, will bundle code into one or more isolated files,
those files do not use relative imports and only contain imports from
`node_modules`, which do not require a file extension. For this reason, a
bundled js file that uses import and export keywords is an ES module.

An advantage of writing your code as ESM is that you can import both ES modules
and CommonJS without conversion. An application that uses CJS can not import ESM
directly, because CJS imports are synchronous and ESM imports are asynchronous.

Not having to use ESM import extensions can be especially valuable if you are
trying to convert a large codebase to ESM, because I have yet to find a solution
that can convert existing imports. There is
[this ESLint plugin](https://github.com/solana-labs/eslint-plugin-require-extensions)
that you could use it in combination with the --fix flag to inject the
extensions, but at the time of writing it does not understand path aliases.

### Tree shaking

Some bundlers like TSUP are capable of eliminating dead code by tree-shaking the
build output, so that less code remains to be deployed. Eliminating dead code is
most important for client-side code that is shipped to the user, but for the
backend it can also reduce cold-start times for serverless functions, although
in most situations, it is probably not going to be noticeable.

## The "internal packages" strategy

The
[internal packages](https://turbo.build/blog/you-might-not-need-typescript-project-references)
strategy, as it was coined by Jared Palmer of Turborepo, removes the build step
from the internal packages by linking directly to the Typescript source files in
the package manifest.

There are some advantages to this approach:

- Code and type changes can be picked up directly, removing the need for a watch
  task in development mode.
- Removing the build step reduces overall complexity where you might otherwise
  use a bundler with configuration.
- IDE go-to-definition, in which cmd-clicking on a reference takes you to the
  source location instead of the typed exports, works without the need for
  Typescript project references or generating `d.ts.map` files.

But, as always, there are also some disadvantages you should be aware of:

- You can not publish the shared packages to NPM, as you do not expose them as
  Javascript.
- If you use path aliases like `~/`, you will need to make sure every package
  has its own unique aliases. You might not need aliases, because shared
  packages typically do not have a deeply nested folder structure anyway.
- Since all source code gets compiled by the consuming application, build times
  can start to suffer when the codebase grows. See
  [caveats](https://turbo.build/blog/you-might-not-need-typescript-project-references#caveats)
  for more info.
- The shared package is effectively just a source folder, and as a whole it
  needs to be transpiled and bundled into the consuming package. This means that
  its dependencies must also be available in the consuming package. Next.js can
  do this for you with the `transpilePackage` setting, but this is the reason
  `services/api` includes `remeda`, as it is used by `packages/common`.

For testing and comparison, mono-ts uses the internal packages approach for
`@repo/common` and a traditional built approach for `@repo/backend`. Both are
compatible with `isolate-package` for deploying to Firebase.

## Live code changes from internal packages

Traditionally in a monorepo, each package is treated similarly to a released NPM
package, meaning that the code and types are resolved from the built "dist"
output for each module. Adding new types and changing code in shared packages
therefore requires you to rebuild these, which can be cumbersome during
development.

Turborepo does not (yet) include a watch task, so
[Turbowatch](https://github.com/gajus/turbowatch) was created to solve this
issue. I haven't tried it but it looks like a neat solution. However, you might
want to use the
[internal packages strategy instead](#the-internal-packages-strategy).

### Deploying

### Running Emulators

I have stored these in `.env` files in the respective service packages. Normally
you would want to store them in a file that is not part of the repository like
`.env.local` but by placing them in `.env` I prevent having to give instructions
for setting them up just for running the demo.

#### Secrets

I have placed it in `.env` which is part of the repo, so you don't have to set
anything up, but .env.local is the proper location probably because that file is
not checked into git.
