# Read me first. Seriously.

This thing is way over-engineered for what it is, but the main reason for that is because each html file needs to be running on its own local web server in order for the `postMessage` API to work properly. Unfortunately, `postMessage` requires a target origin, and if the origin doesn't match the origin of the parent rendering the website within an iframe, then the message won't be sent.

So... we need a web server. In this case, because I wanted to make a fully-fledged example, I opted to make _two_ web servers to simulate what it's like for two parties, hosted on separate domains, to communicate with each other.

## Running locally

1. Make sure you have a recent version of `node` and `npm`.
   - If you run `npm --version`, it should be >= 10.0.0
   - If you run `node --version`, it should be >= 18.0.0
1. Run `npm install`.
1. Run `npm start`.
1. Visit `localhost:3000` in a browser.

## The nitty-gritty

Just in case you're curious or ever want to look at this later. This project is built as a monorepo using [`turborepo`](https://turbo.build/repo/docs). If everything is set up correctly, this is a detail that you should never need to know. `turborepo` is the most complicated, unnecessary part of this whole project, as we really don't need most of the features it offers. However, since it's likely to cause some confusion, I'll just give a super quick overview of how the project is set up.

The monorepo structure is split into a few sections:

### The monorepo package

The monorepo package is basically just the root level of this project. It defines a `turbo.json` and a `package.json` that configure package requirements, top-level scripts, and monorepo settings.

### The sub-packages

All of the project's sub-packages live in the `apps` folder. Each package has its own `package.json` that in turn defines its own dependencies and scripts. Each of these packages is visible to the root monorepo and are orchestrated together for shared commands configured at the root level.

### But why though?

The reason I chose this approach is because I wanted to have a relatively simple setup process for the end-user (you). While the actual configuration is more complicated up-front for the original developer, the bottom line is that in order to create a fully-fledged demo, we need two web servers working in tandem.

This setup makes it so that you can just run `npm install` and `npm start` and everything _should_ just work.

## Modifying the project

If you want to play around with the scripts and markup, just go to either the `client` app or the `vendor` app files and edit them directly. If the servers are running, changes to the `index.html` or `main.js` files should reload the page automatically.

The client app is running at `http://localhost:3000` and the vendor app is running at `http://localhost:3001`, you should be able to visit either page in a browser when running the project locally.

## Getting production ready

For this to work in the real world, the vendor will need to post a message to each of the domains you expect your site to run on. This includes staging sites, local hosts, and especially the production domain.

Additionally, the client application needs to configure the iframe and script to only allow messages from the expected vendor domains. While this isn't _strictly_ necessary for a demo, it's imperative that it gets done properly before going to production.
