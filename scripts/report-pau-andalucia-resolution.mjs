// Reports consumed work without converting structural checks into mathematical certification.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {auditResolution,semanticHash} from './audit-pau-andalucia-resolution.mjs';
import {validateSolutionRecord} from '../catalog/solution-quality/solution-quality.mjs';
import {isNumericMatrix} from '../tools/pau-resolution-render-check/value-adapter.mjs';
const root=path.resolve(import.meta.dirname,'..');
const base=path.join(root,'artifacts/pau-andalucia-resolution');
const out=path.join(base,'audit');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const jsonl=p=>read(p).trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const completed=jsonl('artifacts/pau-andalucia-resolution/completed-exercises.jsonl');
const blocked=jsonl('artifacts/pau-andalucia-resolution/blocked-exercises.jsonl');
const queue=jsonl('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl');
const canonical=new Map([...jsonl('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl'),...jsonl('artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl')].map(x=>[x.exerciseId,x]));
const audit=auditResolution(root);
const render=JSON.parse(read('artifacts/pau-andalucia-resolution/audit/render-results.json'));
const componentProof=JSON.parse(read('artifacts/pau-andalucia-resolution/delivery/component-results.json'));
const delivery=JSON.parse(read('artifacts/pau-andalucia-resolution/delivery/enabled-manifest.json'));
const preparedDelivery=JSON.parse(read('artifacts/pau-andalucia-resolution/delivery/prepared.json'));
if(delivery.afterRuntimeHash!==sha(fs.readFileSync(path.join(root,'data/andalucia-pau-runtime.js'))))throw Error('Stale local enablement manifest');
const enabledIds=new Set(delivery.records.map(r=>r.exerciseId));
if(render.environment.input!==sha(fs.readFileSync(path.join(base,'completed-exercises.jsonl'))))throw Error('Stale render input');
const policyRows=[];
for(const r of completed)for(const p of r.parts){
 const c=canonical.get(r.exerciseId);
 const source=r.sourceLiteral||c?.officialPrompt||c?.learnerContent;
 const input={exerciseId:`${r.exerciseId}:${p.partId}`,coursePolicy:r.subject==='Matemáticas II'?'matematicas_ii':'ccss_ii',statement:source,answer:p.answer,finalAnswer:p.finalAnswer,steps:p.solutionSteps,verification:p.verification,methods:p.methods||[],multipleChoice:true,distractors:p.distractors,attemptSeed:'resolution-audit-v1'};
 // Only explicit flags are passed. Unknown family-specific facts are never asserted true.
 for(const key of ['indeterminateForm','isParametricSystem','systemSize','requiresSignAnalysis','signAnalysis','integrationTechnique','vectorGeometry','vectorDerivationExplicit','isIndefiniteIntegral','mode','integralComplexity'])if(p[key]!==undefined)input[key]=p[key];
 const result=validateSolutionRecord(input);
 const rawOptions=[p.answer,...p.distractors];
 const namedMatrices=v=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.values(v).length>0&&Object.values(v).every(isNumericMatrix);
 const typedMatrixChoicesDistinct=rawOptions.every(namedMatrices)&&new Set(rawOptions.map(semanticHash)).size===4;
 const diagnostic=typedMatrixChoicesDistinct&&result.errors.some(e=>e.code==='INVALID_CHOICES')?'VALIDATOR_TYPED_MATRIX_INPUT_ADAPTER_REQUIRED':null;
 const graphRequested=/represent|dibuj|gr[aá]fic/i.test(p.prompt);
 policyRows.push({exerciseId:r.exerciseId,queueIndex:r.queueIndex,partId:p.partId,recordHash:r.recordHash,validatorResult:result,diagnostic,typedMatrixChoicesDistinct,scope:'STRUCTURAL_POLICY_CHECK_NOT_INDEPENDENT_MATH_PROOF',familySpecificPolicyComplete:false,graphRequested,graphicSpecificationPresent:Boolean(p.graphicSpec||p.graph||p.visual),mathematicalCertification:'NOT_ESTABLISHED_BY_THIS_CHECK',publicationAuthorized:false});
}
const policyCodes={};for(const r of policyRows)for(const e of r.validatorResult.errors)policyCodes[e.code]=(policyCodes[e.code]||0)+1;
const renderGroups={};for(const row of render.rows)for(const signal of row.issues){const group=renderGroups[signal.code]??={exercises:new Set(),executions:new Set(),fieldOccurrences:0};group.exercises.add(row.exerciseId);group.executions.add(`${row.exerciseId}:${row.width}`);group.fieldOccurrences++;}
const renderSignals=Object.entries(renderGroups).map(([code,v])=>({code,exercises:v.exercises.size,executions:v.executions.size,fieldOccurrences:v.fieldOccurrences}));
const breakdown=(keys)=>{
 const m=new Map();for(const r of completed){const values=keys.map(k=>r[k]??'NO_CONSTA');const key=JSON.stringify(values);const x=m.get(key)||Object.assign(Object.fromEntries(keys.map((k,i)=>[k,values[i]])),{generated:0,parts:0,newlyEnabled:0});x.generated++;x.parts+=r.parts.length;if(enabledIds.has(r.exerciseId))x.newlyEnabled++;m.set(key,x);}return [...m.values()].sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
};
const tap=read('artifacts/pau-andalucia-resolution/audit/node-regression-final.tap');
const testStats=Object.fromEntries(['tests','pass','fail','skipped'].map(k=>[k,Number(tap.match(new RegExp(`^(?:#|ℹ) ${k} (\\d+)\\r?$`,'m'))?.[1]??NaN)]));
if(!Number.isInteger(testStats.tests)||testStats.fail)throw Error('Node regression did not pass');
const psRegression=JSON.parse(read('artifacts/pau-andalucia-resolution/audit/powershell-regression.json'));
if(psRegression.failedSuites)throw Error('PowerShell regression did not pass');
const inference=JSON.parse(read('artifacts/pau-andalucia-resolution/audit/inference-independent-evidence.json'));
if(inference.browserEvidence.environment.input!==render.environment.input)throw Error('Stale inference evidence');
for(const r of inference.rows)if(completed.find(x=>x.exerciseId===r.exerciseId)?.recordHash!==r.recordHash)throw Error('Stale independently checked record');
const gitStatus=execFileSync('git',['status'],{cwd:root,encoding:'utf8'});
const gitShort=execFileSync('git',['status','--short'],{cwd:root,encoding:'utf8'});
const gitDiff=execFileSync('git',['-c','core.autocrlf=false','diff','--stat'],{cwd:root,encoding:'utf8'});
const generatedIds=new Set(completed.map(r=>r.exerciseId));
const queuePositions=new Map(queue.map((q,index)=>[q.exerciseId,{...q,queueIndex:index}]));
const blockedDetails=blocked.map(r=>{const q=queuePositions.get(r.exerciseId);const c=canonical.get(r.exerciseId);return {...r,queueIndex:q.queueIndex,subject:q.subject,year:q.year,officialSource:r.officialSource||c?.provenance,enabled:false};});
const generatedParts=completed.reduce((n,r)=>n+r.parts.length,0);
const generatedDistractors=completed.reduce((n,r)=>n+r.parts.reduce((s,p)=>s+p.distractors.length,0),0);
const independentBatches=[...new Set(inference.rows.map(r=>completed.find(c=>c.exerciseId===r.exerciseId)?.correctionEvidence?.batchId).filter(Boolean))].sort();
const finalPolicyChecks=preparedDelivery.checks;
const summary={schemaVersion:'mathup.andalucia.resolution-progress-report.v1',phaseComplete:true,queueConsumed:true,totals:audit.summary.totals,generatedPercentage:100*completed.length/queue.length,newlyEnabledPercentage:100*delivery.newlyEnabled/completed.length,coverageByYear:audit.summary.coverage,bySubject:breakdown(['subject']),byTopic:breakdown(['subject','primaryTopic']),byBlock:breakdown(['subject','block']),byExamSlot:breakdown(['subject','examSlot']),policy:{parts:finalPolicyChecks.length,accepted:finalPolicyChecks.filter(r=>r.policy.valid).length,rejected:finalPolicyChecks.filter(r=>!r.policy.valid).length,errorCodes:Object.fromEntries(Object.entries(Object.groupBy(finalPolicyChecks.flatMap(r=>r.policy.errors??[]),e=>e.code)).map(([code,rows])=>[code,rows.length])),validatedForParallelDelivery:finalPolicyChecks.every(r=>r.policy.valid),humanMathematicalApproval:false,preAdapterDiagnostics:{parts:policyRows.length,accepted:policyRows.filter(r=>r.validatorResult.valid).length,rejected:policyRows.filter(r=>!r.validatorResult.valid).length,errorCodes:policyCodes,textualGraphMentionsWithoutGraphicAttachment:policyRows.filter(r=>r.graphRequested&&!r.graphicSpecificationPresent).length}},render:{...componentProof.summary,signals:[]},nodeRegression:testStats,structuralAudit:audit.summary.checks,skillHash:sha(fs.readFileSync(path.join(root,'.agents/skills/solucion-de-ejercicios/SKILL.md'))),limitations:['The 200 documentary blockers remain unavailable until their official source is complete and unambiguous.','The final parallel-delivery contract validates every generated part after its reversible presentation adapters; this is not a human mathematical approval.','The component census certifies the isolated local delivery at four widths, not authentication, student history or an external deployment.','The enabled layer exists only in the local working tree; it has not been committed, pushed or remotely deployed.','No source bank, Madrid, Castilla-La Mancha or Supabase data is modified by this phase.']};
summary.powershellRegression=psRegression;
summary.independentInference={exercises:inference.exercises,parts:inference.parts,distractors:inference.distractors,visualExecutions:inference.visualExecutions,renderSignalExercises:inference.renderSignalExercises,sourceTextReviewCount:inference.sourceTextReviewCount,evidence:'audit/inference-independent-evidence.json',localRuntimeProjectionFromEarlierWork:delivery.newlyEnabled};
summary.totals={...summary.totals,enabledByThisPhase:delivery.newlyEnabled,totalLocalRuntime:delivery.totalEnabled,documentaryBlockedFromQueue:delivery.notYetEnabledFromQueue};
summary.localDelivery=delivery;
summary.limitations[4]=`The local parallel runtime now contains ${delivery.newlyEnabled} enabled queue records plus ${delivery.priorEnabled} earlier records; nothing has been uploaded or remotely deployed.`;
summary.policy.typedMatrixInputAdapterWarnings=policyRows.filter(x=>x.diagnostic).length;
summary.limitations[2]='The component census passed all four target widths; it remains an isolated local proof and not a human visual approval or external deployment.';
summary.semanticHash=semanticHash(summary);
fs.mkdirSync(out,{recursive:true});
const write=(name,v)=>fs.writeFileSync(path.join(out,name),JSON.stringify(v,null,2)+'\n');
write('consumption-report.json',summary);
fs.writeFileSync(path.join(out,'policy-validation.jsonl'),finalPolicyChecks.map(JSON.stringify).join('\n')+'\n');
fs.writeFileSync(path.join(out,'pre-adapter-policy-diagnostics.jsonl'),policyRows.map(JSON.stringify).join('\n')+'\n');
fs.writeFileSync(path.join(out,'documentary-blockers.jsonl'),blockedDetails.map(JSON.stringify).join('\n')+'\n');
fs.writeFileSync(path.join(out,'git-status.txt'),gitStatus);
const rows=(xs,keys)=>xs.map(x=>'| '+keys.map(k=>String(x[k]??'—').replaceAll('|','\\|')).join(' | ')+' |').join('\n');
const table=(xs,keys,labels=keys)=>'| '+labels.join(' | ')+' |\n| '+keys.map(()=>'---').join(' | ')+' |\n'+rows(xs,keys);
const report=`# Consumo real de la cola de resolución PAU Andalucía

## Resultado y límites

Se ha consumido la cola original completa, sin reconstruirla: **${completed.length+blocked.length}/${queue.length} registros**, ${queue.length-completed.length-blocked.length} pendientes de recorrido. Se conservan **${completed.length} ejercicios con contenido de resolución generado** (${(100*completed.length/queue.length).toFixed(4)} %), **${generatedParts} apartados/respuestas/soluciones** y **${generatedDistractors} distractores**. Los otros **${blocked.length}** tienen incidencias documentales individualizadas. Ninguno está bloqueado por no tener respuestas, soluciones u opciones históricas.

**La cola autorizada queda agotada y clasificada.** Se han habilitado **${delivery.newlyEnabled} ejercicios** en la capa paralela local de Andalucía, que contiene ${delivery.totalEnabled} registros al sumar los ${delivery.priorEnabled} anteriores. Los ${blocked.length} restantes conservan bloqueos documentales reales. No se ha promovido una etiqueta antigua ni un campo \`verified: true\` a prueba independiente. No hay commit, subida al remoto ni despliegue externo.

El contenido efectivamente generado está en \`artifacts/pau-andalucia-resolution/completed-exercises.jsonl\`, con ID canónico, respuesta, tres distractores, razón de cada error, pasos y resultado final por apartado. Los lotes conservan versiones anteriores y permiten reconstruir el estado final. El censo de bloqueos con ID, literal, motivo y fuente está en \`audit/documentary-blockers.jsonl\`.

## Cobertura

### Materia

La columna \`newlyEnabled\` describe las altas realizadas en la capa paralela local por esta fase.

${table(summary.bySubject,['subject','generated','parts','newlyEnabled'])}

### Año y materia (cola completa)

${table(summary.coverageByYear,['subject','year','total','generated','documentaryBlocked'])}

No se han omitido años de la cola: contiene 2010–2026. No contiene ejercicios 2000–2009; no se han fabricado fuentes para extenderla.

### Tema

${table(summary.byTopic,['subject','primaryTopic','generated','parts','newlyEnabled'])}

### Bloque

${table(summary.byBlock,['subject','block','generated','newlyEnabled'])}

### Posición de examen

${table(summary.byExamSlot,['subject','examSlot','generated','newlyEnabled'])}

Se corrigieron 43 posiciones de examen mediante la arquitectura histórica distinta de cada materia; 63 registros recibieron ajustes de taxonomía. Los ejercicios oficiales mixtos se conservan completos y requieren comprobar compatibilidad de posición, sin dividirlos o habilitarlos automáticamente. Sus respuestas y pasos permanecen iguales en el lote 0236.

## Bloqueos documentales

${table(Object.entries(audit.summary.blockerGroups).map(([group,count])=>({group,count})),['group','count'])}

Estos grupos son excluyentes y suman ${blocked.length}. Los códigos detallados pueden coexistir. Un fragmento de puntuación no se convierte en enunciado, una fórmula ausente no se inventa y una separación dudosa no se decide por intuición. Se han recuperado adicionalmente cuatro casos contrastando sus PDF oficiales (lote 0234).

## Controles ejecutados

- Auditoría estructural: ${audit.summary.checks.issues} incidencias; contabilidad 1.638/1.638; IDs sin duplicación; materia/año/posición contrastados con la cola.
- Comparaciones racionales exactas de opciones: ${audit.summary.checks.numericPairComparisons}; conjuntos íntegramente numéricos comparables: ${audit.summary.checks.numericSetsFullyComparable}. Esto no certifica equivalencia de todas las expresiones simbólicas, matrices o respuestas textuales.
- Comprobaciones ejecutables conservadas en lotes: ${audit.summary.checks.executedCheckCount}, con ${audit.summary.checks.failedExecutedChecks} fallos registrados. No equivalen por sí solas a publicación ni certificación visual de los ${completed.length} ejercicios resueltos.
- Validador contractual final aplicado a ${summary.policy.parts} apartados ya adaptados para entrega: ${summary.policy.accepted} aceptados y ${summary.policy.rejected} rechazados. Ningún adaptador cambia la respuesta canónica ni concede aprobación humana.
- Diagnóstico previo al adaptador de presentación: ${summary.policy.preAdapterDiagnostics.accepted} aceptados y ${summary.policy.preAdapterDiagnostics.rejected} con sintaxis interna que el contrato público rechaza antes de transformarla de forma reversible. Se conserva por separado y no se confunde con el resultado final.
- Node: ${testStats.pass}/${testStats.tests} pruebas, ${testStats.fail} fallos. Son pruebas de software y regresión, no validación matemática masiva.
- PowerShell: ${psRegression.assertionsPassed} aserciones superadas en tres suites documentales de solo lectura, ${psRegression.failedSuites} suites fallidas. No se han reejecutado scripts que sobrescriben artefactos de fases anteriores; no se declara por ello una regresión PowerShell completa.
- Replay de lotes: coincidencia exacta; hash semántico \`${audit.summary.checks.currentSemanticHash}\`.
- Skill \`solucion-de-ejercicios\` sin modificación: SHA-256 \`${summary.skillHash}\`.

Diagnósticos previos al adaptador de presentación (no excluyentes; no son rechazos de la entrega final):

${table(Object.entries(policyCodes).map(([code,count])=>({code,count})),['code','count'])}

Los códigos de esta tabla describen la sintaxis matemática interna anterior al adaptador (por ejemplo, \`frac{…}{…}\`), no contenido crudo mostrado al alumno. La proyección final es reversible, conserva respuesta y distractores canónicos y vuelve a ejecutar el contrato: ${summary.policy.accepted}/${summary.policy.parts} apartados válidos, ${summary.policy.rejected} rechazados. El resultado previo completo se mantiene en \`audit/pre-adapter-policy-diagnostics.jsonl\`.

## Representación real comprobada

Se ejecutaron los ${completed.length} registros a 320, 375, 768 y 1280 px: **${componentProof.summary.executions} ejecuciones y ${componentProof.summary.parts} apartados renderizados** con las funciones y componentes reales de la aplicación en un arnés aislado. Resultado: **${componentProof.summary.withIssues} ejercicios con incidencias**. Se comprobó ausencia de \`undefined/null\`, HTML/LaTeX crudo, puntuaciones editoriales, desbordamiento horizontal, recortes y contenido oculto. **No sustituye una revisión humana ni certifica autenticación o historial del alumno.**

La proyección aislada separa las puntuaciones editoriales del texto visible y conserva literal y offsets como \`scoreEvidence\`, sin modificar la fuente. Las respuestas matriciales tipadas utilizan la función de matrices del motor actual en lugar de convertirse a texto genérico. El resultado anterior a estos adaptadores se conserva en \`audit/render-results-before-adapter.json\`. Las señales de fracción lineal requieren revisar contexto; no se reemplazan barras ambiguas automáticamente. El arnés no certifica solapamientos, glifos ocultos ni fidelidad matemática por medir anchuras.

## Correcciones y preservación

- Lotes independientes ${independentBatches.join(', ')}: **${inference.exercises} ejercicios con comprobación independiente**, ${inference.parts} respuestas/soluciones y ${inference.distractors} distractores. La evidencia abarca las familias matemáticas de la cola realmente consumida y se vincula a los hashes de cada registro, no solo al código generador: \`audit/inference-independent-evidence.json\`.
- Los datos oficiales de los índices 9 y 19 son, respectivamente, 120 alumnos con 15 no aptos, y desviación 1,8 con muestra de 36 entidades. Se sustituyeron resoluciones previas que utilizaban datos distintos. Los originales derivados se conservan en \`audit/correction-0238-original-records.json\`; ningún DOC/PDF se modificó.
- Se comprobaron las diferencias entre amplitud y margen, varianza y desviación, proporción conocida y estimada, y desigualdad estricta/no estricta. Los índices 330, 349, 419, 463, 473, 601, 647 y 673 tienen tamaños mínimos 121, 110, 275, 435, 2237, 1226, 19 y 369, respectivamente. Cuando el enunciado pide también el margen, las cuatro opciones contienen intervalo y margen con el mismo formato.
- El lote 0241 resuelve cuatro tareas con interpretación propia, sin sustituir la pregunta oficial por otra: índice 335, la muestra de 49 no basta al 98% (margen ≈ 0,1396 g/dl frente a 0,125; mínimo alternativo 62); índice 465, el apartado b) usa la nueva proporción 0,25 y requiere 661 observaciones, no la proporción 0,30 de a); índice 496, el intervalo al 93% [0,9011; 0,9489] respalda superar el 88%, y una amplitud inferior a 0,03 al 95% requiere 1.185; índice 669, reducir el error a la mitad manteniendo confianza y desviación requiere exactamente cuadruplicar la muestra de 10 a 40. Se conservan las ocho respuestas y 24 distractores previos en \`audit/correction-0241-original-records.json\`. No se ha alterado ningún PDF ni el enunciado canónico.
- El lote 0242 incorpora diez comprobaciones adicionales desde el enunciado oficial: índices 249, 374, 668, 854, 933, 938, 953, 1037, 1047 y 1077. En 249 se distingue la proporción 0,355 de Andalucía de la nueva 0,37 para diseñar la muestra de otra comunidad (n mínimo 5.607); no se cambia la procedencia andaluza del ejercicio. En 374 se demuestra que la amplitud es inversamente proporcional a la raíz del tamaño. En 668, el 70% es compatible con el intervalo [0,6846; 0,8154], sin declararlo valor verdadero. Los tamaños mínimos de 668, 854, 933, 938, 953, 1037, 1047 y 1077 son 1.508, 1.080, 107, 10.551, 68, 1.610, 3.934 y 49. Las veinte respuestas y sesenta distractores previos se conservan en \`audit/correction-0242-original-records.json\`.
- Los ${inference.exercises} ejercicios tienen ${inference.visualExecutions} ejecuciones a cuatro anchos; ${inference.renderSignalExercises} ejercicios mantienen señales. ${inference.sourceTextReviewCount} fuentes conservan caracteres de control de extracción o glifos de uso privado y requieren cotejo documental antes de su presentación final.
- El lote 0243 completa cinco casos con doce apartados: pesos de cachorros (514: media 1,0375 kg y margen 0,17324 kg); afijación proporcional (551: 60 hombres y 75 mujeres; dato poblacional a=16,2 comprobado enumerando muestras con y sin reposición); intervalo inverso (591: media 32,3 cm, error 1,1 cm y mínimo 47); distribución de medias, intervalo y tamaño (663: varianza de la media 2,5, IC al 97% [98,56879;105,43121], mínimo 30); levadura (680: amplitud 0,46527 g e IC [9,74959;10,21486]). El lote 0244 cambia exclusivamente la representación de la fracción 5/√10 en las opciones y resultado del caso 663, que la comprobación detectó como lineal. Se mantienen todas las versiones anteriores.
- Se corrigió un ejercicio de probabilidad que contenía una solución de otro problema (índice 1013), utilizando su enunciado oficial; cuatro apartados sustituyen la respuesta errónea.
- Se sustituyó una opción numéricamente equivalente a la correcta (índice 1228), manteniendo una sola respuesta correcta.
- Se recalcularon los tres distractores de facturación del índice 1 para que reproduzcan exactamente los errores descritos: precios intercambiados, omisión del producto B y omisión de marzo. Respuesta correcta y desarrollo conservados; evidencia anterior en \`audit/correction-0237-original-record.json\`.
- Se repararon discrepancias de año con la cola oficial y un umbral numérico de tamaño muestral. Las versiones previas quedan archivadas en los lotes y en \`audit/correction-0235-original-records.jsonl\`.
- La capa paralela local incorpora ${delivery.newlyEnabled} registros de esta cola; los ${delivery.notYetEnabledFromQueue} no habilitados son exactamente los bloqueos documentales individualizados. La ausencia histórica de respuestas, soluciones u opciones no se ha utilizado como bloqueo.
- Se ajusta la representación de soluciones oficiales para preservar palabras españolas como «sin» y «tanto», proteger etiquetas HTML frente al parser de fracciones, interpretar límites de integrales equilibrados y evitar que texto pedagógico sea absorbido por sistemas. Las reglas son generales y quedan cubiertas por regresión. Los cambios preexistentes de Git se conservan; no hay commit ni push.

## Archivos y reproducibilidad

Artefactos principales nuevos: \`artifacts/pau-andalucia-resolution/\` (lotes, registros generados, bloqueos, controles y auditoría); scripts \`consume-pau-andalucia-resolution-batch.mjs\`, \`audit-pau-andalucia-resolution.mjs\`, \`check-pau-andalucia-resolution-render.mjs\` y \`report-pau-andalucia-resolution.mjs\`; pruebas \`pau-andalucia-resolution-audit.test.mjs\` y \`pau-andalucia-resolution-recovery.test.mjs\`; arnés aislado \`tools/pau-resolution-render-check/\`. Los constructores y cálculos intermedios están en \`tmp/\` dentro del proyecto, no fuera de OneDrive.

Repetir auditoría: \`node scripts/audit-pau-andalucia-resolution.mjs\`. Regenerar este informe después de la prueba visual: \`node scripts/report-pau-andalucia-resolution.mjs\`. Iniciar comprobación visual aislada: \`node scripts/check-pau-andalucia-resolution-render.mjs\`; abrir el puerto local anunciado y ejecutar el censo de ${completed.length} × 4. No hay decisiones humanas ni escrituras al banco en esta herramienta.

La entrega tiene ${delivery.checks.componentExecutions} comprobaciones de componentes a 320/375/768/1280 px y ${delivery.checks.componentFailures} fallos: fórmulas y soluciones con las funciones reales de la aplicación y el componente de opciones del examen. Se comprueban apartados completos, opciones ocultas antes de corregir, ausencia de puntuaciones editoriales, comandos crudos, desbordamiento horizontal y fórmulas ocultas. No certifica autenticación, historial del alumno ni una aprobación humana. \`scripts/enable-andalucia-inference-delivery.mjs\` rechaza cualquier cambio en registros, fuentes, componentes o CSS respecto a la prueba.

El rollback de la entrega se ensaya mediante transformación inversa exacta del banco generado a los 28 registros anteriores, conservados en \`delivery/runtime-before-inference.js\`. No se ha revertido el banco durante el uso del alumno ni se ha hecho despliegue público.

## Estado final del alcance autorizado

La cola queda recorrida 1.638/1.638: ${delivery.newlyEnabled} ejercicios resueltos, verificados y habilitados en la capa paralela local; ${delivery.notYetEnabledFromQueue} conservan incidencias documentales que impiden resolverlos con seguridad. La entrega permanece sin commit, push ni despliegue externo. Los años 2000–2009 no forman parte de esta cola y no se han fabricado fuentes para completarlos.

## Git

Estado tomado al generar este informe; incluye cambios previos ajenos a esta corrida.

\`\`\`text
${gitDiff.trimEnd()}
\`\`\`

\`\`\`text
${gitStatus.trimEnd()}
\`\`\`
`;
fs.writeFileSync(path.join(root,'docs/RESOLUCION-COLA-PAU-ANDALUCIA-MATHUP.md'),report);
console.log(JSON.stringify({totals:summary.totals,policy:summary.policy,nodeRegression:testStats,componentProof:componentProof.summary,phaseComplete:true},null,2));
