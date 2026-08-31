// Official pages inspected individually; no historical answer is evidence.
export const designInferenceObservations=[
 [563,'4e10e40d60aebdab7570fa77b9ce953d7bf6c9a4c8869a5d3f9b7ca3c907c154',1,'A.4','c376953a3c0f4669a84d9d782fd4c8f7bcebf906d4b26e0503aa8c8014b9ddaf',0],
 [570,'a59474e6895bd41034da53b7060969cbe8cbf7f8272f39fbf16821c95f06c84b',2,'B.4','0d5a638b899b0d4a76c1725a3ac94f4e5c3727fe38e0b057c0f58f823049d0a2',2],
 [759,'fa0cbbddfdf34b1f9fcf8d1090c2d0c3f13e5353e06da22ec354d3345e313584',1,'A.4','8cf88f16e2c963643d5273b32e0023a8a36faa53ed6d38579a55f16e5463784d',2],
 [868,'c637bbde5c26c0b35b59202bd832ddc97990d3845365ce483fbf2a49832f73fe',1,'A.4','ff9feb1c17209fa24dfe59e4ae6ea8d0cb935778967517c034c538db1f69f57d',0],
 [1215,'a56739d297d4dc220d6898b24cf729dc556401a6bb292b8ca7cfb58c01c31651',2,'B.4','a3a28fdb1a5162fca0f064ace118b70b8dc7330f8b98b798d4879e37d9d88aff',0],
 [1630,'a59474e6895bd41034da53b7060969cbe8cbf7f8272f39fbf16821c95f06c84b',1,'A.4','05d0e979449dfd5361f2300bde326bf0abf70006cb3711ffc46223dcb2d5a313',2],
 [1162,'c70ed065da193c82dd0a02fb4c05069415b0adf53d0f49bba1b0375a19823566',2,'B.4','3aa532eda426220fdf7d701ee782592bf25ea735bfba4db0d2a4899503867f46',0],
 [1461,'fe6fd5b48407569d41169c80d71e6997050d6d06d1afd41cd639a553f9b712b5',2,'7','47a86c08eaa4530b37fb15e5fc67a583a58eb1ad60b505bc10b67b57cd489e89',3],
 [1265,'fe436fc3af8e56d0694316005aedeca2fffefbeb445aa9f60efa0aa6da4cba25',2,'B.4','e222ee43a9c1618bf7e29f5bbd12d4a3965dbd9d13b334a82b49cef39ad06cb2',0],
];
export const designInferenceReplacements={
 570:[['con\u001canza','confianza']],
 759:[['con\u001canza','confianza'],['deter-\nminada','determinada']],
 1630:[['225 mg2','225 mg^{2}'],['con\u001canza','confianza'],['¾Cuál','¿Cuál'],['corres-\n','corres']],
 1461:[['\u001duidez','fluidez'],['con\u001canza','confianza'],['¾Se','¿Se'],['¾qué','¿qué'],['¾cuántos','¿cuántos']],
};
export function projectDesignInference(index,text){for(const[a,b]of designInferenceReplacements[index]??[])text=text.split(a).join(b);return text;}
