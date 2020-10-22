<p align="center">
  <img src="./images/2556.png">
</p>

<h1 align="center">React Native Hero Design</h1>

<p align="center">
  <a href="https://circleci.com/gh/Thinkei/rn-hero-design/tree/release"><img src="https://circleci.com/gh/Thinkei/rn-hero-design/tree/release.svg?style=svg&circle-token=52ed450e362fea681befc130245b1914c2b676b0"></a>
  <img src="https://img.shields.io/badge/node-10.16.0-brightgreen">
  <img src="https://img.shields.io/badge/npm-6.9.0-red">
  <img src="https://img.shields.io/badge/yarn-1.10.1-blue">
</p>

## Installation

Via `yarn`
```
yarn add rn-hero-design
```
It also require peer dependencies like `react` and `react-native`. Please follow the yarn install instruction for the right versions.

## Usage

The components and helpers are exported via named module.
```
import { Button, injectTheme } from 'rn-hero-design'
```
For more details, view the [documentation](http://mobile.hero-design.surge.sh)

## Playground app

Checkout the playground app [here](https://exp.host/@toan2406/rn-hero-design), which contains the list of components, their sample usages and common layouts.

## Development
- Requirements:
   - cocoapods 1.10.0
- Start the playground bundler
```
yarn dev
```
- Build the lib
```
yarn lib:watch
```
- Start the documentation server
```
yarn doc:dev
```
