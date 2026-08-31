import assert from 'node:assert/strict';
import {derivativeSpecs} from './resolve-andalucia-calculus-derivatives-official.mjs';
export const derivativeObservations=[
 [148,'5f24b200fb6cf34f6d72016ec3dc35787b4074de9b7752677e5b0d959ed0dfcd',2,'B.2','ca99ef90e5390681026667065819d0825ebc758b42348a14de10f3e64eee5f94',0],
 [979,'1dc0455361ce91a1157a7b3e4a06db95bc988e8dd0c9756e9aeb74b8cbb73a81',1,'4','4a91890b73760d6c68a77bd2cc13e9231036b7934fe438ae5cc41f7283a6f68f',0],
 [1233,'8cdb86259405652622f2ea129bffbdb239076ac612fd7fcebb86b9d5bdc451ec',1,'A.2','a4a65c4170dc24c5ef9f1ce31ebf0d3df2d9057027649206e154ccd0d8fc9552',0],
 [1390,'6201aa5a68f0d1302cfd697751f74c4c73f655f0d9b1ae98ae8960207dbd5225',1,'A.2','4b1ea4849c5989913a0f83745da5136785b0f5b153d6176880d19c4ef5aa8334',0],
 [1422,'0de2f7d077a3b5d5c0dbca886cdb363082356411843369c3bce54ff7cda08abc',2,'B.2','78fa5e039fc605a7fe4c5d53ddc761835e104315d3f41df29cc20f6e67c977a9',0],
 [1442,'a56739d297d4dc220d6898b24cf729dc556401a6bb292b8ca7cfb58c01c31651',2,'B.2','a3a28fdb1a5162fca0f064ace118b70b8dc7330f8b98b798d4879e37d9d88aff',0],
 [1417,'998f20402054ca6d0454da83ffc8e1ff6951a576b48836a32e81e524c5985214',2,'B.2','624c684a7d12664ac2fc8dfe9b56d152fadff25d39fedd4e096869b600388487',0],
 [1443,'5bd7838829b9f653746319907f86642017d12e66ed097db0126fb544a2d0f632',2,'B.2','772a8174bedec14988343f5592b8a2d1a4cb062f23bc7dc5149b01998b7a828a',0],
];
// Only source expressions from the inspected official pages are used here;
// derivative answers and mathematical conclusions are not source evidence.
export function derivativeReplacements(r){
 const i=r.queueIndex;if(!derivativeObservations.some(o=>o[0]===i))return[];
 const out=[],at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);
 const prefix={1390:'Calcule las derivadas de las siguientes funciones:',1442:'Calcule la derivada de cada una de las siguientes funciones:',
 1417:'Sea la función f(x)= {1−2x² si x≤1; x²−2ax+3 si 1<x≤3; −x²+8x−15 si x>3}.',
 1443:'Sea la función f(x)= {x³+ax² si x<1; bx+frac{2}{x} si x≥1}.'};
 if(prefix[i])out.push([r.sourceLiteral.slice(0,at),prefix[i]+'\n\n','PDF_VISIBLE_CALCULUS_COMMON_CONTEXT']);
 const p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_CALCULUS_SUBPART']);
 const source=keys=>keys.map(k=>derivativeSpecs[k].source).join('; ')+'.';
 if(i===148){p(0,'Calcule la derivada de las siguientes funciones: '+source(['148f','148g']));p(1,'Calcule la ecuación de la recta tangente a la gráfica de la función h(x)=frac{1}{x} en su punto de abscisa x=1.');}
 if(i===979){p(0,'Calcule la derivada de las siguientes funciones: '+source(['979f','979g']));p(1,'Halle la función h(x), sabiendo que su derivada es h′(x)=4x³+x²−4x−1 y que h(2)=frac{11}{3}.');}
 if(i===1233){p(0,'Calcule las derivadas de las siguientes funciones: '+source(['1233f','1233g']));p(1,'Halle la ecuación de la recta tangente a la gráfica de la función h(x)=frac{3x+6}{2x+1} en su punto de abscisa x=1.');p(2,'Halle las asíntotas de la función h(x)=frac{3x+6}{2x+1}.');}
 if(i===1390||i===1442)for(const [j,k]of ['f','g','h'].entries())p(j,source([`${i}${k}`]));
 if(i===1422){p(0,'Calcule las derivadas de las siguientes funciones: '+source(['1422f','1422g']));p(1,'Halle las ecuaciones de las asíntotas de la función h(x)=frac{1+2x}{x−2} y sus puntos de corte con los ejes.');}
 if(i===1417){p(0,'Calcule el valor de a para que la función sea continua en x=1.');p(1,'Para a=2, estudie la continuidad y la derivabilidad de la función.');}
 if(i===1443){p(0,'Determine los valores de a y b para que la función sea continua y derivable.');p(1,'Para b=3, halle la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=2.');}
 return out;
}
