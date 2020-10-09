## Devloping

1. Install lerna globally `npm i -g lerna`
2. Run `npm run bootstrap` // This will install all packages and build

You need three processes running for the full development enviroment

1. `npm run watch` watches changes in buidler-react plugin. Lerna will then symlink this package to be used in buidler-demo.
2. `npm run node` runs up a blockchain node, generate typechain interfaces, compile and deploy smart-contracts then watch for changes in smart contracts and deploy them.
3. `npm run frontend` runs a dev-server for a create-react-application from packages/buidler-demo/frontend that is served on http://localhost:3000/ with hot-reloading. This will also reload when you change smart contracts

# Packages

## @symfoni/buidler-demo

Here is the buidler project that will include buidler-react as a plugin to generate the react component that we will use in react-demo

## @symfoni/buidler-react

Here is the code for the buidler plugin. Lerna will symlink this package to @symfoni/buidler-demo so we can use it there.

## @symfoni/react-demo

This is a standard react app to demonstrate buidler with a react component output.
