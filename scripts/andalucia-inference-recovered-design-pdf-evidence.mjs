import assert from 'node:assert/strict';
import {officialParts} from './resolve-andalucia-inference-multipart.mjs';
export const recoveredDesignObservations=[
 [988,'c70ed065da193c82dd0a02fb4c05069415b0adf53d0f49bba1b0375a19823566',1,'A.4','5ef505f97e1ea14427f8b166c64e400b9e140ff10fa78a4fc8492ad3a1967501',0],
 [612,'8f76c9dc8ba87be028178e8802a4b5f0c475ba6e0556bff72cec636070e4b857',2,'6','30e814a7543674ea359766361ec21c0f2adeb2b84c7b6c7ecb76c9302d7b1865',0],
 [691,'de33e9bdb3bab2ccc58eed7e1c4b97d79d708e558d7ac2b6339851702d1c91ed',2,'8','6e427545a6006b9a753d954d073769e807134641b3bb1ba0494132d303c2b45c',0],
 [851,'aceec0dff8a42d7f43c1fd0c1ab308760bdb1e10dea89d588e7b10e62167b994',2,'8','01e0d831dafdd15ad0302b317db09e0dbc9edfaddc7a601be0437774388ea5e0',0],
];
// Score evidence remains in the source record. These are the official visible
// words/numbers with only line wrapping and editorial point labels removed.
export const recoveredDesignStatements={
 612:'Se selecciona una muestra aleatoria de 600 familias a las que se les pregunta si tienen mascota, resultando que 240 de esas familias contestaron afirmativamente. Con un nivel de confianza del 95%,\na) Obtenga el correspondiente intervalo de confianza para estimar la proporción poblacional de familias que tienen mascota. ¿Puede suponerse que la mitad de las familias de esta población tiene mascota?\nb) ¿Qué tamaño muestral mínimo se debe tomar para que el error máximo al estimar esta proporción sea 0.025?\nc) Explique razonadamente el efecto que tendría sobre la amplitud del intervalo de confianza de la proporción poblacional el aumento del tamaño de la muestra elegida.',
 691:'El gasto mensual por vivienda en electricidad de los inquilinos de la zona centro de una determinada ciudad sigue una ley Normal con desviación típica 18.25 €. Se ha tomado una muestra aleatoria de 361 de estas viviendas obteniendo como resultado un gasto medio de 97 €.\na) Obtenga el intervalo de confianza del 93% para el gasto medio mensual en electricidad por vivienda.\nb) ¿Cuál es el tamaño mínimo que debe tener una muestra para que el error cometido al estimar la media, con un nivel de confianza del 91%, sea un tercio del error cometido en el intervalo (95.5, 98.5)?',
 851:'Se desea estimar la proporción de donantes de sangre en una universidad. Para ello se toma una muestra aleatoria de 400 personas de esa universidad, resultando que 64 son donantes de sangre.\na) Calcule un intervalo de confianza, con un nivel del 98%, para estimar la proporción poblacional de donantes de sangre.\nb) Si el nivel de confianza es del 95%, calcule el error máximo cometido. Razone si este error será mayor o menor al disminuir el nivel de confianza.',
};
export function recoveredDesignReplacements(r){
 const text=recoveredDesignStatements[r.queueIndex];if(!text)return[];
 const p=officialParts(text);assert.equal(p.length,r.parts.length);
 return[[r.sourceLiteral,text,'OFFICIAL_PDF_VISIBLE_MISSING_NUMBERS_RESTORED'],...p.map((p,i)=>{assert.equal(p.id,r.parts[i].partId);return[r.parts[i].prompt,p.prompt,'OFFICIAL_PDF_VISIBLE_SUBPART'];})];
}
