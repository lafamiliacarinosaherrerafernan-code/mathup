import assert from 'node:assert/strict';
export const fertilizerFestivalObservations=[
 [94,'8f76c9dc8ba87be028178e8802a4b5f0c475ba6e0556bff72cec636070e4b857',1,'2','f846c773f39a371e355cc6532298379d34f10031d0eceb7064ba8e88539b20de',0],
 [285,'0667329f779d37d2aceff1fd9932ed73388d1935a22029eae06d151f030424cc',2,'7','a74191711840eae39a99646500e44b76f1d9dcc36f921cbb2db85f6232d5333d',0],
];
export function fertilizerFestivalReplacements(r){
 if(r.queueIndex===94)return[[r.sourceLiteral,'Un fabricante produce mensualmente dos tipos de abonos ecológicos, A y B, que vende en su totalidad, obteniendo unos beneficios de 15 y 10 euros por kilogramo (kg), respectivamente. La producción de abono del tipo A no puede superar los 200 kg; el doble de la producción de B menos el triple de la producción de A es a lo sumo 100 kg. Además, la producción de A más el doble de la producción de B es como mucho de 500 kg. Obtenga las cantidades que este fabricante debe producir de sendos abonos para obtener el máximo beneficio e indique el valor de este beneficio.','PDF_VISIBLE_FERTILIZER_VARIABLES_BENEFITS_AND_CONSTRAINTS']];
 if(r.queueIndex!==285)return[];const at=r.sourceLiteral.indexOf('a) (1 punto)');assert.ok(at>0);return[
  [r.sourceLiteral.slice(0,at),'Se desea estimar la proporción de personas de una determinada localidad que se muestran favorables a la celebración de las fiestas locales durante el mes de mayo. Para ello, se ha tomado una muestra aleatoria de 200 personas resultando que 130 de ellas están a favor.\n\n','PDF_VISIBLE_SAMPLE_200_AND_SUCCESSES_130'],
  [r.parts[0].prompt,'Obtenga un intervalo de confianza, con un nivel de confianza del 96.5%, para estimar la proporción de personas de esta localidad que está a favor de celebrar las fiestas locales durante el mes de mayo.','PDF_VISIBLE_CONFIDENCE_965_PERCENT'],
  [r.parts[1].prompt,'Manteniendo la misma proporción muestral y con un nivel de confianza del 99%, ¿cuál es el número mínimo de personas que deberán seleccionarse aleatoriamente para que la proporción muestral y la poblacional no difieran en más de un 2%?','PDF_VISIBLE_CONFIDENCE_99_AND_MARGIN_2_PERCENT'],
 ];
}
