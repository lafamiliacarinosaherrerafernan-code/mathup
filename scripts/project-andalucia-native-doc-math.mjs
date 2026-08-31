// Transport projection only; literal native structure and each staged change retained.
import {projectNativePiecewise} from './project-andalucia-native-piecewise.mjs';
import {projectNativeMatrices} from './resolve-andalucia-doc-matrices-2012.mjs';
export function projectNativeDocMath(original){
 const branches=projectNativePiecewise(original),matrices=projectNativeMatrices(branches.text);
 return {text:matrices.text,changes:[...branches.changes.map(c=>({...c,stage:'piecewise-and-fractions'})),...matrices.changes.map(c=>({...c,stage:'atomic-matrices'}))]};
}
