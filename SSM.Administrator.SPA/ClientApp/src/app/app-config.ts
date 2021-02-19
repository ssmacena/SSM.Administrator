/*
 * Labels:
 *  API -> Application Program Interface
 *  SN -> Storage Name
 */
//http://localhost:59921/public/init
export const appConfig: any = {
  API_URL: '/api/public/',
  API_SECURE_URL: '/api/secure/',
  BASE_URL: '/',

  SITEMINDER_LOGOUT_URL: '/customer/ib/accesssm/processlogout',
  SITEMINDER_MAIN_ROUTE_REDIRECT: '/account',

  SN_TOKEN: 'userData',
  SN_DATE_DOMAIN: 'BNPP.DateDomain',
  SN_CONFIG_DOMAIN: 'BNPP.ConfigDomain',
  SN_INVESTOR_PROFILE: 'BNPP.InvestorProfile',

  MAIN_ROUTE: '/home',
  MAIN_ACCOUNT_ROUTE: '/account',
  MAIN_ALL_ACCOUNT_ROUTE: 'account/all-accounts',
};
