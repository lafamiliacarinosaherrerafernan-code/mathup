import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const target = path.join(root, 'data', 'madrid-pau-authored.js');
let text = fs.readFileSync(target).toString('utf8');

const start = '          "solution": "Planteamiento:\\nCalculamos el determinante de la matriz de coeficientes y estudiaml": "Se consideran las matrices A=((3,1),(8,3)) y B=((3,−1),(−8,3))."';
const end = '    "madrid-ccss-1.19.4": {';
const startIndex = text.indexOf(start);
const endIndex = text.indexOf(end, startIndex);
if (startIndex < 0 || endIndex < 0) throw new Error('No se localizó el tramo corrupto esperado.');

const replacement = `          "solution": "Planteamiento:\\nCalculamos el determinante de la matriz de coeficientes y estudiamos el valor que lo anula.\\n\\nDesarrollo paso a paso:\\nLa matriz de coeficientes es A=[[1,1,1],[−1,2,p],[1,−2,−1]] y la matriz ampliada es A*=[[1,1,1,0],[−1,2,p,−3],[1,−2,−1,p]]. Por Sarrus, det(A)=3(p−1). Si p≠1, det(A)≠0 y rg(A)=rg(A*)=3, luego el sistema es SCD. Si p=1, rg(A)=2, mientras que rg(A*)=3 porque la segunda y la tercera fila de coeficientes son opuestas pero sus términos independientes no lo son. Por Rouché–Frobenius, el sistema es incompatible.\\n\\nResultado final:\\nSCD si p≠1 e incompatible si p=1.\\n\\nComprobación:\\nLos únicos casos posibles quedan determinados por det(A)=0 y la comparación de rangos en p=1."
        },
        "b)": {
          "options": [
            "(x,y,z)=(1,0,−1)",
            "(x,y,z)=(0,1,−1)",
            "(x,y,z)=(1,−1,0)",
            "No tiene solución"
          ],
          "correct": 0,
          "solution": "Planteamiento:\\nSustituimos p=2. Como det(A)=3≠0, el sistema es compatible determinado.\\n\\nDesarrollo paso a paso:\\nEl sistema queda x+y+z=0, −x+2y+2z=−3, x−2y−z=2. De la primera ecuación, x=−y−z. Al sustituir en la segunda resulta 3y+3z=−3, es decir, y+z=−1. Al sustituir en la tercera resulta −3y−2z=2. Resolviendo estas dos ecuaciones se obtiene y=0, z=−1 y x=1.\\n\\nResultado final:\\n(x,y,z)=(1,0,−1).\\n\\nComprobación:\\n1+0−1=0, −1+0−2=−3 y 1−0+1=2."
        }
      }
    },
    "madrid-ccss-1.2.1": {
      "exercise": {
        "source": "Modelo-Opción B-2001",
        "statement": [
          {
            "plain": "Se consideran las matrices A=((3,1),(8,3)) y B=((3,−1),(−8,3))."
          }
        ],
        "parts": [
          {
            "label": "a)",
            "paragraphs": [
              {
                "plain": "Comprobar que B es la matriz inversa de A.",
                "html": "Comprobar que B es la matriz inversa de A."
              }
            ]
          },
          {
            "label": "b)",
            "paragraphs": [
              {
                "plain": "Calcular la matriz X que satisface AX=B.",
                "html": "Calcular la matriz X que satisface AX=B."
              }
            ]
          }
        ]
      },
      "answers": {
        "a)": {
          "options": [
            "Sí; AB=BA=I",
            "No; AB=2I",
            "Sí; AB=I pero BA≠I",
            "No; det(A)=0"
          ],
          "correct": 0,
          "solution": "Planteamiento:\\nComprobamos la relación de inversa mediante el producto matricial.\\n\\nDesarrollo paso a paso:\\nAB=[[3,1],[8,3]]·[[3,−1],[−8,3]]=[[9−8,−3+3],[24−24,−8+9]]=[[1,0],[0,1]]=I. Como A y B son cuadradas, esta igualdad prueba que B=A⁻¹; también se verifica BA=I.\\n\\nResultado final:\\nB es la matriz inversa de A.\\n\\nComprobación:\\nEl determinante de A es 9−8=1 y la fórmula de la inversa produce exactamente B."
        },
        "b)": {
          "options": [
            "X=[[17,−6],[−48,17]]",
            "X=[[3,−1],[−8,3]]",
            "X=[[3,1],[8,3]]",
            "X=I"
          ],
          "correct": 0,
          "solution": "Planteamiento:\\nDespejamos X multiplicando por A⁻¹ a la izquierda.\\n\\nDesarrollo paso a paso:\\nAX=B implica X=A⁻¹B. Como A⁻¹=B, resulta X=B². El producto [[3,−1],[−8,3]]·[[3,−1],[−8,3]] es [[17,−6],[−48,17]].\\n\\nResultado final:\\nX=[[17,−6],[−48,17]].\\n\\nComprobación:\\nAl multiplicar A por la matriz obtenida se recupera B."
        }
      }
    },
`;

text = `${text.slice(0, startIndex)}${replacement}${text.slice(endIndex)}`;
fs.writeFileSync(target, text, 'utf8');
console.log(JSON.stringify({ repaired: true, replacementCharacters: (text.match(/�/g) || []).length }));
