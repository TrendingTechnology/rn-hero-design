/* TypeScript file generated from PdfEditor__Preview.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const PdfEditor__PreviewBS = require('./PdfEditor__Preview.bs');

import {Json_t as Js_Json_t} from '../../src/shims/Js.shim';

// tslint:disable-next-line:interface-over-type-literal
export type Props = { readonly file: string; readonly variableValues: Js_Json_t };

export const make: React.ComponentType<{ readonly file: string; readonly variableValues: Js_Json_t }> = PdfEditor__PreviewBS.make;

// tslint:disable-next-line:interface-over-type-literal
export type $$default_Props = { readonly file: string; readonly variableValues: Js_Json_t };

export const $$default: React.ComponentType<{ readonly file: string; readonly variableValues: Js_Json_t }> = PdfEditor__PreviewBS.default;

export default $$default;
