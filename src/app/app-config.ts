import { Configuration } from 'msal';
import { MsalAngularConfiguration } from '@azure/msal-angular';

// this checks if the app is running on IE
export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 ||
                    window.navigator.userAgent.indexOf('Trident/') > -1;


/***********************************************************
 * STEP 1 - B2C Policies and User Flows
 ***********************************************************/
export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_oriontech",
    resetPassword: "B2C_1_Reset",
  },
  authorities: {
    signUpSignIn: {
      authority: "https://oriontechiottech.b2clogin.com/oriontechiottech.onmicrosoft.com/B2C_1_oriontech"
    },
    resetPassword: {
      authority: "https://samplead.b2clogin.com/samplead.onmicrosoft.com/b2c_1_reset"
    }
  }
}


/***********************************************************
 * STEP 2 - Web API Scopes & URLs 
 ***********************************************************/
export const apiConfig: { b2cScopes: string[], webApi: string } = {
  b2cScopes:["https://oriontechiottech.onmicrosoft.com/eaedddc1-f4be-426b-9d5b-7c3ef29a1095/read"],
  webApi: 'https://localhost:44379/weatherforecast'
};



/***********************************************************
 * STEP 3 - Authentication Configurations
 ***********************************************************/
export const msalConfig: Configuration = {
  auth: {
    clientId: "eaedddc1-f4be-426b-9d5b-7c3ef29a1095",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    redirectUri: "http://localhost:4200/",
    postLogoutRedirectUri: "http://localhost:4200/",
    navigateToLoginRequestUrl: true,
    validateAuthority: false,
  },
  cache: {
    cacheLocation: "localStorage",
    // Set this to "true" to save cache in cookies
    // to address trusted zones limitations in IE
    storeAuthStateInCookie: isIE,
  },
}


/***********************************************************
 * STEP 4 - Scopes Required For Login
 ***********************************************************/
export const loginRequest: { scopes: string[] } = {
  scopes: ['openid', 'profile'],
};


/***********************************************************
 * STEP 5 - Scopes which will be used for the access token
 *          request for your web API
 ***********************************************************/

export const tokenRequest: { scopes: string[] } = {
  scopes: apiConfig.b2cScopes 
};



/***********************************************************
 * STEP 6 - MSAL Angular Configurations
 *          Define protected API URLs and required scopes
 ***********************************************************/
export const protectedResourceMap: [string, string[]][] = [
  [apiConfig.webApi, apiConfig.b2cScopes]
];


/***********************************************************
 * STEP 7 - MSAL Angular specific configurations
 *          
 ***********************************************************/
export const msalAngularConfig: MsalAngularConfiguration = {
  popUp: !isIE,
  consentScopes: [
    ...loginRequest.scopes,
    ...tokenRequest.scopes,
  ],

  // API calls to these coordinates will NOT activate MSALGuard
  unprotectedResources: [],

  // API calls to these coordinates will activate MSALGuard
  protectedResourceMap,     
  extraQueryParameters: {}
}
