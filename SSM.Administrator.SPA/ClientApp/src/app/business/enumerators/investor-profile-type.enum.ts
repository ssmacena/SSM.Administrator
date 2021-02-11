/*
Suitability (1-4) e KYC (1-5). 
---------------------------------
OBS: No atual momento, o Suitability não contém a classificação "Conservador-intermediário" (2).
 */
export enum InvestorProfileType {
  None = 0,
  Conservative = 1, /*Conservador*/
  Intermediary = 2, /*Intermediario*/
  IntermediaryConservative = 3, /*IntermediarioConservador*/
  IntermediaryBold = 4, /*IntermediarioArrojado*/
  Bold = 5, /*Arrojado*/
  Exempt = 6 /*Isento*/
}