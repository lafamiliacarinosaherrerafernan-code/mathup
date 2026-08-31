// Original official pages inspected at 1.5x. Source bytes remain immutable.
export const formulaChainObservations=[
 [415,'a59474e6895bd41034da53b7060969cbe8cbf7f8272f39fbf16821c95f06c84b',2,'B.2','0d5a638b899b0d4a76c1725a3ac94f4e5c3727fe38e0b057c0f58f823049d0a2',0],
 [434,'de33e9bdb3bab2ccc58eed7e1c4b97d79d708e558d7ac2b6339851702d1c91ed',1,'2','05ae0ccb70f8b0287a0f656cf5976be13bed33eb8ff5f3feffd7d7c1267b796e',0],
];
export const formulaChainStatements={
 415:'Se considera la función f(x) = ax^{2} + frac{b}{x}, con x ≠ 0, siendo a y b dos parámetros reales.\na) (1 punto) Determine el valor de los parámetros a y b para que f(x) tenga un extremo relativo en el punto (1, 3).\nb) (0.75 puntos) Para a = 1 y b = 2, razone si en el punto (1, 3) la función presenta un máximo o un mínimo.\nc) (0.75 puntos) Calcule ∫ (x^{2} + frac{2}{x}) dx.',
 434:'(2.5 puntos) Una empresa de material informático dispone de dos cadenas de fabricación, A y B, en las que quiere aumentar su producción realizando horas extraordinarias.\nEn una hora extraordinaria de trabajo, la cadena A prepara 15 portátiles y 6 tablets y la cadena B prepara 10 portátiles y 10 tablets. Los costes de producción por hora extraordinaria de A y B son de 300 € y 600 € respectivamente por hora extraordinaria. La cadena B puede realizar, como máximo, el triple de horas extraordinarias que la cadena A. Si para la próxima semana se debe producir adicionalmente un máximo de 360 portátiles y al menos 216 tablets, formule y resuelva el problema que permita obtener la planificación de la empresa que minimice los costes de producción. ¿A cuánto ascienden dichos costes?',
};
export function formulaChainReplacements(r){return formulaChainStatements[r.queueIndex]?[[r.sourceLiteral,formulaChainStatements[r.queueIndex],'OFFICIAL_PDF_VISIBLE_FORMULA_AND_CHAIN_DATA_RESTORED']]:[];}
