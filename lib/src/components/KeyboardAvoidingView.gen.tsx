/* TypeScript file generated from KeyboardAvoidingView.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const KeyboardAvoidingViewBS = require('./KeyboardAvoidingView.bs');

import {Style_t as ReactNative_Style_t} from '../../src/shims/ReactNative.shim';

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly children: React.ReactNode; 
  readonly style?: ReactNative_Style_t; 
  readonly withNavigation?: boolean
};

export const make: React.ComponentType<{
  readonly children: React.ReactNode; 
  readonly style?: ReactNative_Style_t; 
  readonly withNavigation?: boolean
}> = KeyboardAvoidingViewBS.make;

// tslint:disable-next-line:interface-over-type-literal
export type $$default_Props = {
  readonly children: React.ReactNode; 
  readonly style?: ReactNative_Style_t; 
  readonly withNavigation?: boolean
};

export const $$default: React.ComponentType<{
  readonly children: React.ReactNode; 
  readonly style?: ReactNative_Style_t; 
  readonly withNavigation?: boolean
}> = KeyboardAvoidingViewBS.default;

export default $$default;
