# The official Chain React App for #ChainReact2022

Hey there! After two years off, Chain React is (hopefully) returning in 2022.

If you're not familiar with what Chain React is, it's the only [React Native focused conference](https://cr.infinite.red) in the USA, held in Portland, Oregon, in July, and hosted by [Infinite Red](https://infinite.red/). We get about 500 developers from 200 different companies every year, and host workshops, talks, and panels all about React Native.

This is the offical app of Chain React 2022. It's built using [Expo](https://expo.dev) and [Ignite](https://infinite.red/ignite).

## Getting Started

(This assumes you're using macOS.)

**Step 1:** git clone this repo:

```bash
git clone git@github.com:infinitered/ChainReactApp2022.git
```

**Step 2:** cd to the cloned repo:

```bash
cd ChainReactApp2022
```

**Step 3:** Run the setup script: `./bin/setup`

```bash
./bin/setup
```

**Step 4:** Run the app:

```bash
yarn start
```

## Deploying

TODO (Expo instructions?)

## ESLint/Prettier Compliant

This project adheres to some ESLint rules and Prettier. We suggest you enable linting to keep your project compliant during development. You can lint the project by running `yarn lint`.

## Detox End-To-End Testing

### Setup

_Note that Detox is only configured for macOS._

TODO: Update

To get your Detox tests up and running, you'll need to install some global dependencies:

1. Install the latest version of [Homebrew](https://brew.sh/)

2. Make sure you have Node installed (at least 8.6.0).

3. Install `applesimutils`, which will allow Detox to communicate with the iOS simulator:

```bash
brew tap wix/brew && brew install applesimutils
```

4. Install the Detox CLI

```bash
  yarn global add detox-cli
```

### Adding Detox tests

TODO

### Running Detox tests

```
yarn test
```

For more information, make sure to check out the official [Detox Docs](https://github.com/wix/Detox/blob/master/docs/README.md)

## Acknowledgements

Thanks to the Infinite Red team that built [ChainReactApp2019](https://github.com/infinitered/ChainReactApp2019) for the building blocks for this app!

## License

This app is not yet set up under a permissive license, but will be eventually.
