// Page-inspected mathematical transcriptions. Original extraction is retained in
// the reversible projection ledger. No official statement is synthesized.
import assert from 'node:assert/strict';
import {officialParts} from './resolve-andalucia-inference-multipart.mjs';
export const remainingMatrixObservations=[
 [480,'aceec0dff8a42d7f43c1fd0c1ab308760bdb1e10dea89d588e7b10e62167b994',1,'2','1db1693e85eb36e2b9555fb54c2fa82c1764784d5b8a7141c5d95d31784a16b0',0],
 [604,'ec6fd00d0daee547aa6128f3f6e1099278ee551f7f80917b331a1772764317b3',2,'1','82ec08a68dfd1800c01d979899150d9430d98e4fac6bbd3ef22df97097b83f09',0],
 [628,'3025f1a244b39bd3ee5cd99e88ad281b0213be43222ab857b1c18112f6328601',1,'1','4ba12473c12fcf80e31abb57b23fbfca5cec6e05952aea2fb4b4e97496aeb817',0],
 [766,'0be1dffd96126e6064f95f87111e09ab19a2f475a8851d900e8b1870ea751a2b',1,'1','20c64efafee7404db9fd5b5d6c7180643b0cccdc124d9642d961f91fd458f4be',0],
 [768,'797cb2cf9a799b2669310803bb7bf7982041e3ae024576c01746eb276d8ee10d',1,'1','a5ea86e175529848bddda682ea05b062dc5d91bf4a930220a45268083910c398',0],
 [822,'6080bc5ac64bbf6438bfe8b758abe6c8c4241f3761df46be47484da3de608af7',1,'2','e3932f1af1cd0a0a2ffe74831d8260f08850777e1da32dc8632a9f7b36d7286d',0],
 [962,'aff1623cbfcc5746a42ee3e24d9106759726a132f9d1a462260f9a4de6617f89',1,'1','9fb1855b3ad64b4eeb640e0f9e1f07cfc68450ecc45c79c1fa6403207c9e1afd',0],
];
export const remainingMatrixStatements={
 480:'Dadas las matrices A=[[a,1,0],[0,a,2],[0,1,1]], B=[[2,-1],[a,-1]], C=[[2,-1],[1,-1],[2,0]].\na) Calcule los valores del parámetro a para los que tanto A como B admitan inversa.\nb) Para a=1, halle una matriz X que satisfaga A·X·B=C.',
 604:'a) En un problema de programación lineal, la región factible es la región acotada cuyos vértices son A(2,−1), B(−1,2), C(1,4) y D(5,0). La función objetivo es la función f(x,y)=2x+3y+k, cuyo valor máximo, en dicha región, es igual a 19. Calcule el valor de k e indique dónde se alcanza el máximo y dónde el mínimo.\nb) Sean las matrices A=[[1,-2,3]], B=[[2],[-1],[1]], C=[[2,0,-1],[1,1,-1],[1,3,2]]. Resuelva, si es posible, la ecuación matricial B·A+2X=C.',
 628:'Dada la matriz A=[[1,2,0],[0,-1,2],[-2,0,1]], resuelva la ecuación A^{2}·X+A^{4}=A.',
 766:'Una conservera fabrica latas de pisto con tomate, cebolla y pimiento siguiendo dos recetas distintas. La matriz [[500,300,200],[600,100,300]] indica los gramos necesarios de cada producto para conseguir una lata de cada receta. Se dispone de dos proveedores, siendo la matriz de precios en euros por kilo de cada producto [[0.5,0.4,0.6],[0.4,0.5,0.7]]. Los costes de producción de cada receta en euros por lata vienen dados por la matriz [[0.11,0.09]]. Los costes de transporte en euros por lata según cada proveedor vienen dados por la matriz [[0.02,0.03]]. La conservera quiere obtener un beneficio de 5 céntimos por lata. Una distribuidora compra 11000 latas de la primera receta, siendo 5000 del primer proveedor, y otras 11000 de la segunda receta, siendo 6000 del primer proveedor. ¿Cuánto debe cobrar la conservera por el pedido de esta distribuidora?',
 768:'a) Plantee y resuelva el siguiente problema de forma matricial:\nEl gerente de una empresa de productos hospitalarios desea introducir un nuevo producto en el mercado nacional. Para ello contrata a 3 vendedores que se han encargado de las zonas A, B y C del país, respectivamente. El vendedor de la zona A ha trabajado 40 horas, ha realizado 10 demostraciones y 5 viajes para dicha promoción. El vendedor de la zona B ha trabajado el doble de horas que el de la zona A, realizando 15 demostraciones y 8 viajes. En cuanto al vendedor de la zona C, ha trabajado 100 horas, ha realizado 25 demostraciones y 10 viajes. El gerente debe abonarles 75€ por hora trabajada, 300€ por demostración y 250€ por viaje realizado. Teniendo en cuenta que, además, debe aplicárseles una retención en concepto del impuesto del IRPF del 15% si la cantidad a abonar al vendedor es menor de diez mil euros y del 18% en caso contrario, determine la cantidad final que cobrará cada vendedor.\nb) Sea A=[[-2,2,1],[3,a−1,2],[4,0,3]] ¿Para qué valores de a es la matriz A invertible?',
 822:'Se consideran las matrices A=[[5,-7,6],[7,0,4],[0,3,-1]], B=[[1,2,-9],[-2,0,11],[0,4,-7]], C=[[1],[2],[-1]].\na) Halle las dimensiones de las siguientes matrices C^{t}AC, ACC^{t}B.\nb) Calcule, en caso de existir, las inversas de las matrices A y B.\nc) Resuelva el siguiente sistema matricial\n2X+3Y=A; −3X+4Y=B.',
 962:'a) En un festival gastronómico gaditano se han vendido entradas para tres eventos culinarios. Concretamente, 120 entradas para un taller de repostería, 50 para una demostración de cocina gourmet y 150 para una cata de vinos de la tierra de Cádiz. El total recaudado por la venta de entradas ha sido de 6460 €. Se sabe que el precio de 10 entradas para el taller de repostería coincide con el coste de la suma de 2 entradas para la cata de vinos y 1 entrada para la demostración de cocina gourmet. Además, el coste de 2 entradas para el taller y 1 entrada para la cata de vinos supera en 6 € al de 2 entradas para la demostración de cocina gourmet. ¿Cuánto cuesta la entrada de cada evento?\nb) Dada la matriz A=[[1,0,-1],[-1,2,3],[1,2,1]], calcule el rango de A y A^{2}.',
};
export function remainingMatrixReplacements(record){
 const text=remainingMatrixStatements[record.queueIndex];if(!text)return[];
 const p=[628,766].includes(record.queueIndex)?[{id:'whole',prompt:text}]:officialParts(text);
 assert.equal(p.length,record.parts.length);
 return [[record.sourceLiteral,text,'PDF_VISIBLE_COMPLETE_MATRIX_QUESTION_RECONSTRUCTION'],...p.map((x,i)=>{
  assert.equal(x.id,record.parts[i].partId);
  return [record.parts[i].prompt,x.prompt,'PDF_VISIBLE_MATRIX_SUBPART_RECONSTRUCTION'];
 })];
}
