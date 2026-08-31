export const businessCostsObservations=[
 [108,'35f05b19d43a5c26840240ff45ede93938ac575e4378437433e833cac887a341',1,'2','2565f9834ed8668c1deaf5e05d96f4739ee7ca3e75c46266fce66309677ddefd',0],
 [482,'c70ed065da193c82dd0a02fb4c05069415b0adf53d0f49bba1b0375a19823566',2,'2','3aa532eda426220fdf7d701ee782592bf25ea735bfba4db0d2a4899503867f46',0],
 [1113,'5bd7838829b9f653746319907f86642017d12e66ed097db0126fb544a2d0f632',1,'2','2465ae19f10b4663ce79103cef9589bdebb66f4f00522babd51dfbc8655abf10',0],
 [1142,'df7375f8183eafb6f45e9c65083e68d528ffabe07d66717b0ccf0f020c5b064f',1,'2','c023d1c98d04ae422e6eadd7dd0aeae664ad83745c61ebd6e67a1dc54759e0dc',0],
 [1264,'74b067b81be20aa0262a0cc58795f3b25488aa9c749d825b7b33f656dd1ae089',1,'4','08957986bb6035fef5ddc9225e41a3f8928a2e7e3fc1c785f51a9934b4b1a65e',0],
 [1547,'998f20402054ca6d0454da83ffc8e1ff6951a576b48836a32e81e524c5985214',1,'2','20c668b065aeebeea65ea4ff655d2dd0634e85a28d82846cfe70e30a346b3c88',0],
 [1615,'8cdb86259405652622f2ea129bffbdb239076ac612fd7fcebb86b9d5bdc451ec',2,'2','fd0f755f1855a8a59d87185302e0251e651bfa8a66bad8a10b80f6403e31d4b1',0],
 [1203,'668689642ca997cf817c9f9f6608d2835efe898e3162b050d7b22b51f225d363',1,'2','ec92de921de4dc8cce7e8189f28c110b5760f793885b3d040eacb6f40a3812ce',0],
];
export function businessCostsReplacements(r){const m={
 108:[['B(x) = 0.5x2 − 4x + 6','B(x)=0,5x²−4x+6']],
 482:[['I (t) = −2t 2 + 51t','I(t)=−2t²+51t'],['G(t) = t 2 − 3t + 96','G(t)=t²−3t+96']],
 1113:[['f (x) = 40 − 6x + x2','f(x)=40−6x+x²']],
 1142:[['f (x) = −2x2 + 36x + 138','f(x)=−2x²+36x+138']],
 1264:[['f(x) = x2 − 6x + 10','f(x)=x²−6x+10'],['¾Cuál','¿Cuál'],['¾Cuál','¿Cuál'],['grá\u001ccamente','gráficamente']],
 1547:[['R(x) = −0.001x2 + 0.4x + 3.5','R(x)=−0,001x²+0,4x+3,5']],
 1615:[['f (x) = 2x2 − 36x + 200','f(x)=2x²−36x+200']],
 1203:[['C(x) = 9000 + 0.08 x + 2000000 ,              con 1000 ≤ x ≤ 6000.\n                                              x','C(x)=9000+0,08x+frac{2000000}{x}, con 1000≤x≤6000.']],
 };return(m[r.queueIndex]||[]).map(([before,after])=>[before,after,'OFFICIAL_PDF_VISIBLE_POWER_FRACTION_OR_TEXT_GLYPH']);}
