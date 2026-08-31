# Auditoría de procedencia y licencia del subconjunto `msdoc-viewer`

Fecha de auditoría: 25 de agosto de 2026  
Alcance: `catalog/equation3-andalucia-2012/vendor/msdoc-viewer-0.5.5/`  
Modo: solo lectura sobre el subconjunto; no se ha modificado ningún archivo auditado.

## 1. Conclusión ejecutiva

El subconjunto no procede de npm, de `node_modules`, de una caché npm ni de un archivo `.tgz`. La cadena local de procedencia demostrable es un clon Git realizado durante la recuperación de Equation.3:

```text
git clone --depth 1 https://github.com/zheng2429/msdoc-viewer.git
  artifacts/equation3-andalucia-2012/reference-msdoc-viewer
```

El clon quedó fijado en el commit público:

```text
cd1481b62a7f2b51e532884b3057b76e1be8e3a6
```

Los ocho archivos locales son idénticos byte a byte a los ocho archivos de `dist/` de ese commit. No se ha detectado ninguna modificación local.

El `package.json` de ese commit declara la versión `0.5.5` y la licencia `MIT`; el README también declara `MIT`. Sin embargo:

- `0.5.5` es una **versión de trabajo declarada en el repositorio Git**, no una versión npm publicada ni un tag Git;
- npm solo expone públicamente `0.2.0` y `0.2.1` (última publicada: `0.2.1`);
- el repositorio no incluye un archivo `LICENSE`, `LICENSE.md`, `LICENSE.txt`, `COPYING` o `NOTICE` con el texto completo de la licencia;
- no consta una cabecera de copyright en los ocho archivos ni una declaración explícita del titular.

Por ello, la procedencia y la declaración MIT quedan demostradas, pero el `NOTICE.md` local actual es materialmente inexacto e insuficiente para preparar una redistribución conservadora: atribuye el origen a otra URL, afirma una publicación npm inexistente y no contiene el texto completo de MIT.

**Dictamen:** los ocho archivos pueden identificarse como fuente pública declarada MIT y no modificada. Antes de versionarlos en el checkpoint debe completarse el expediente de licencia/atribución indicado en el apartado 9. No debe versionarse el subconjunto basándose únicamente en el `NOTICE.md` actual.

## 2. Evidencia local de procedencia

### 2.1 Historial de Codex

El historial local consultado es:

```text
C:\Users\aherr\.codex\sessions\2026\08\24\rollout-2026-08-24T14-13-01-01a033b0-3690-7323-913f-531ac25c6c64.jsonl
```

Contiene la orden de clonación literal reproducida arriba. La copia de referencia se empleó para leer propiedades de documentos MS-DOC y fue posteriormente retirada del resultado de aquella fase. El subconjunto quedó en `catalog/equation3-andalucia-2012/vendor/msdoc-viewer-0.5.5/`.

No se ha localizado un script permanente del proyecto que incorporase el subconjunto. La incorporación fue una operación de preparación realizada en aquella sesión; los scripts actuales solo lo importan como dependencia. Tampoco se localizaron, como origen de estos archivos, un `node_modules`, una caché npm, un paquete `.tgz` o una segunda copia fuente dentro del proyecto.

### 2.2 Repositorio y commit demostrables

| Dato | Valor verificado |
|---|---|
| Repositorio realmente clonado | `https://github.com/zheng2429/msdoc-viewer.git` |
| Rama observada | `main` |
| Commit | `cd1481b62a7f2b51e532884b3057b76e1be8e3a6` |
| Árbol Git | `e8b6839e1f8d3f3fe9440ade6a9eb51125668c27` |
| Fecha del commit | `2026-05-08T03:40:02Z` |
| Asunto | `fix: restore ms-doc table styles` |
| SHA-256 de `package.json` | `8a51c6399c5761cee5191b4700e0129b82e270129acf5576f7149725c6cfb4cb` |
| SHA-256 de `README.md` | `45a2ac71f017b57d958cce67071b1025c73cacea7ffa1ea7d24889f38d320200` |

El repositorio público consultado es [zheng2429/msdoc-viewer](https://github.com/zheng2429/msdoc-viewer). Para preservar la verificabilidad, las comparaciones se hicieron contra el commit completo anterior y no solamente contra el estado mutable de `main`.

## 3. Versión realmente demostrable

El `package.json` de `cd1481b6...` contiene:

```json
{
  "name": "msdoc-viewer",
  "version": "0.5.5",
  "license": "MIT"
}
```

El historial Git muestra una evolución interna desde `0.1.0`, `0.2.0`, `0.3.0`, `0.4.x`, `0.5.0`, `0.5.1`, `0.5.4` hasta `0.5.5`. No existen tags públicos para `0.5.5` en el repositorio examinado.

La [página pública de versiones de npm](https://www.npmjs.com/package/msdoc-viewer?activeTab=versions) solo muestra `0.2.0` y `0.2.1`. En consecuencia:

- **sí es demostrable:** “código de `msdoc-viewer` cuyo `package.json` en el commit `cd1481b6...` declara versión `0.5.5`”;
- **no es demostrable y es falso como afirmación de publicación:** “paquete npm `msdoc-viewer@0.5.5`”;
- **no es demostrable:** “release/tag Git `0.5.5`”.

La carpeta local puede conservar provisionalmente su nombre para no alterar rutas antes de una decisión posterior, pero ese nombre no debe usarse como evidencia de una publicación npm.

## 4. Discrepancia entre las URL de repositorio

El clon local se hizo desde `zheng2429/msdoc-viewer`. El `package.json` y el README de ese repositorio aún contienen metadatos que apuntan a `wybaby168/msdoc-viewer`. El `NOTICE.md` local copió esos metadatos y no la URL realmente clonada.

La evidencia local más fuerte para esta auditoría es la URL registrada por la orden de clonación y el commit cuyos archivos coinciden por SHA-256. Por tanto:

- procedencia técnica comprobada: `zheng2429/msdoc-viewer`, commit `cd1481b6...`;
- metadato histórico incluido por el propio proyecto: `wybaby168/msdoc-viewer`;
- relación jurídica o de transferencia entre ambas cuentas: no demostrada por los archivos examinados.

## 5. Comparación de los ocho archivos

Referencia pública usada para todos los archivos:

```text
https://github.com/zheng2429/msdoc-viewer/tree/
cd1481b62a7f2b51e532884b3057b76e1be8e3a6/dist
```

| Archivo local | SHA-256 local y público | Diferencias | Clasificación |
|---|---|---:|---|
| `core/binary.js` | `3c430545e3ba08d5c4b23074a5529e767b4830a3eab55b40ba37943cd67bd852` | 0 bytes | `IDENTICAL_TO_PUBLIC_MIT_SOURCE` |
| `core/cfb.js` | `a0187bd3746b9d84de1a918b9733d72e39fca823c69f14e1a756b606e974f517` | 0 bytes | `IDENTICAL_TO_PUBLIC_MIT_SOURCE` |
| `core/utils.js` | `e4b12750970f7722a90f528f260e498fb2da8b1f059823b850570d41c95782a7` | 0 bytes | `IDENTICAL_TO_PUBLIC_MIT_SOURCE` |
| `msdoc/clx.js` | `58228bbf555eb67d6047c7028204c7a76c6f24021efb5a54fd6e66ff82d2154a` | 0 bytes | `IDENTICAL_TO_PUBLIC_MIT_SOURCE` |
| `msdoc/constants.js` | `75008dc7c3f84b31b3b140097df0a408aeaa58ef835307b98e7ce87aa363b2b1` | 0 bytes | `IDENTICAL_TO_PUBLIC_MIT_SOURCE` |
| `msdoc/fib.js` | `c3175dfe1beb2ad4266bc86c3d821d80dc22bf513c5cbb24ef6a7aa356fb3c8e` | 0 bytes | `IDENTICAL_TO_PUBLIC_MIT_SOURCE` |
| `msdoc/fkp.js` | `f30ed3de014f222df8d8a338fe8703bd06b7c8f8d4efdf31641c7ae13eea3a10` | 0 bytes | `IDENTICAL_TO_PUBLIC_MIT_SOURCE` |
| `msdoc/sprm.js` | `1fd47309053cedf00c671bb264501a85625a2e1c24312570f6be2a0c4646b506` | 0 bytes | `IDENTICAL_TO_PUBLIC_MIT_SOURCE` |

Resultado agregado:

- `IDENTICAL_TO_PUBLIC_MIT_SOURCE`: 8;
- `DERIVED_FROM_PUBLIC_MIT_SOURCE`: 0;
- `LOCAL_MODIFICATION`: 0;
- `PROVENANCE_UNVERIFIED`: 0.

## 6. Licencia y copyright

### 6.1 Declaración de licencia

La licencia demostrable es **MIT**, declarada en:

1. `package.json`, campo `license`;
2. `package-lock.json`, metadato del paquete raíz;
3. README, apartado de licencia.

El texto normalizado de MIT puede consultarse en [SPDX: MIT License](https://spdx.org/licenses/MIT.html).

### 6.2 Ausencias relevantes

En el commit de referencia no se encontró:

- archivo `LICENSE`, `LICENSE.md`, `LICENSE.txt`, `COPYING` o `NOTICE`;
- texto completo de la licencia MIT;
- cabeceras de copyright en los ocho archivos;
- una declaración explícita del titular del copyright.

El historial Git contiene contribuciones firmadas con identidades de commit, principalmente `wybaby168` y dos commits atribuidos a `OpenAI`. Se omiten las direcciones de correo por no ser necesarias para esta auditoría. Estas identidades son evidencia de autoría de commits, pero **no permiten afirmar por sí solas quién es el titular jurídico del copyright**.

Por tanto:

- licencia declarada: MIT;
- titular/copyright exacto: no consta explícitamente en la fuente pública examinada;
- no debe inventarse un nombre, año o titular para completar el aviso.

## 7. Evaluación del `NOTICE.md` local

SHA-256 actual:

```text
bebe96d3996dc4442d3e52d30a129493fbcda8ff13360f1a67fbca5b12f2f3a6
```

Problemas documentados:

1. identifica como “Upstream” `wybaby168/msdoc-viewer`, aunque la copia se obtuvo de `zheng2429/msdoc-viewer`;
2. afirma “npm package: `msdoc-viewer@0.5.5`”, versión que no está publicada en npm;
3. no fija el commit de origen;
4. no contiene el texto completo de MIT;
5. no registra los hashes de los archivos;
6. no informa de que el upstream carece de aviso de copyright explícito.

Este archivo no se ha modificado durante la auditoría. Su contenido debe corregirse o sustituirse en una operación posterior autorizada, antes del checkpoint.

## 8. ¿Puede versionarse el subconjunto actual?

### Respuesta técnica y de cumplimiento

La evidencia disponible permite afirmar que el código público está declarado bajo MIT y que el subconjunto local es una copia exacta. MIT permite usar, copiar, modificar y distribuir el software, sujeto a conservar el aviso de copyright y el aviso de permiso.

No obstante, **el subconjunto no está preparado todavía para versionarse con un expediente de atribución completo**, porque el único aviso local es incorrecto y el upstream no publica el texto completo ni un titular explícito. Esta auditoría no sustituye asesoramiento jurídico; aplica un criterio conservador de cumplimiento documental.

La decisión recomendada es la opción A, condicionada a completar la atribución sin inventar datos:

- conservar los ocho archivos exactos;
- fijar URL real y commit;
- incluir el texto completo estándar de MIT;
- declarar expresamente que el upstream no aporta un titular/copyright explícito;
- conservar los hashes y el inventario de archivos;
- si se exige certeza jurídica sobre el titular, solicitar aclaración al mantenedor antes de redistribuir.

## 9. Archivos de licencia y atribución que deben conservarse

Antes de versionar el subconjunto se recomienda crear o reemplazar, en una operación posterior autorizada:

1. **`LICENSE.upstream.txt`**  
   Texto completo de la licencia MIT, sin fabricar un titular inexistente. Debe documentarse la ausencia del aviso upstream y, para máxima certeza, obtenerse confirmación del mantenedor.
2. **`NOTICE.md` o `UPSTREAM.md` corregido** con:
   - nombre: `msdoc-viewer`;
   - naturaleza: subconjunto sin modificaciones de `dist/`;
   - repositorio clonado: `https://github.com/zheng2429/msdoc-viewer.git`;
   - commit: `cd1481b62a7f2b51e532884b3057b76e1be8e3a6`;
   - versión declarada en `package.json`: `0.5.5`;
   - aclaración: no publicada en npm y sin tag;
   - licencia declarada: MIT;
   - relación de los ocho archivos y sus hashes;
   - indicación de que no se detectaron cambios locales;
   - referencia al metadato histórico `wybaby168/msdoc-viewer` sin presentarlo como origen local comprobado.
3. **Copia de evidencia de metadatos**, preferiblemente un extracto inmutable o registro hash de `package.json` y README del commit, para que la declaración MIT siga siendo auditable aunque cambie o desaparezca el repositorio.

No se recomienda afirmar un titular concreto hasta encontrar un aviso upstream o recibir confirmación verificable.

## 10. Opciones de resolución

### A. Conservar el subconjunto actual — recomendada con condiciones

Es la opción técnicamente más estable: los ocho archivos son públicos, exactos y están declarados MIT. Requiere completar los archivos del apartado 9 y corregir las afirmaciones falsas del aviso actual. Si el proyecto exige certeza jurídica absoluta sobre el titular, debe solicitarse confirmación upstream antes del commit.

### B. Sustituir por una versión pública MIT verificable

No debe ejecutarse todavía. Podría usarse `0.2.1` publicado en npm, que sí tiene una identidad de paquete verificable, pero antes habría que demostrar:

- que contiene las ocho funciones/módulos necesarios o equivalentes;
- que interpreta igual las propiedades MS-DOC utilizadas;
- que mantiene la asociación de los 55 objetos Equation.3;
- que supera toda la regresión, reproducibilidad y rollback.

La coincidencia funcional no puede presumirse debido a la diferencia entre `0.2.1` y el commit `0.5.5`.

### C. Reimplementación local mínima

Es la alternativa más conservadora si no se acepta la incertidumbre documental del titular. Debe hacerse desde especificaciones públicas de MS-DOC, sin copiar expresiones del código auditado, y cubrir únicamente `parseCFB`, lectura de FIB/CLX/FKP y `sprmCPicLocation` que usa el mapeador. Exigiría pruebas de caja negra, trazabilidad y revisión independiente. No se ha ejecutado.

## 11. Limitaciones de la auditoría

- Se ha verificado el repositorio público, su commit y sus archivos, pero no una relación jurídica entre las cuentas `zheng2429` y `wybaby168`.
- La versión npm `0.5.5` no existe públicamente; no hay tarball npm que pueda hashearse.
- No existe un tag/release `0.5.5` que añada una firma de versión.
- El upstream carece de archivo de licencia completo y de aviso explícito de copyright; por ello no puede identificarse con certeza un titular jurídico.
- La presente es una auditoría técnica de procedencia y cumplimiento documental, no asesoramiento legal.

## 12. Dictamen final

| Pregunta | Dictamen |
|---|---|
| ¿Origen exacto? | Clon de `https://github.com/zheng2429/msdoc-viewer.git`, commit `cd1481b6...` |
| ¿Procede de npm? | No |
| ¿Versión demostrable? | `0.5.5` declarada en el `package.json` del commit; no publicada ni etiquetada |
| ¿Licencia declarada? | MIT |
| ¿Titular explícito? | No consta |
| ¿Los ocho archivos coinciden? | Sí, 8/8 idénticos por SHA-256 |
| ¿Hay modificaciones locales? | No |
| ¿Basta el `NOTICE.md` actual? | No |
| ¿Puede conservarse el código? | Sí, técnicamente bajo declaración MIT, tras completar atribución/licencia; aclaración upstream aconsejable para máxima certeza |
| ¿Opción recomendada? | A condicionada; C si se exige eliminar toda incertidumbre de atribución |
