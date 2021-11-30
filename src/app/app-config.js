"use strict";
var __spreadArray = (this && this.__spreadArray) || function(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msalAngularConfig = exports.protectedResourceMap = exports.tokenRequest = exports.loginRequest = exports.msalConfig = exports.apiConfig = exports.b2cPolicies = exports.isIE = void 0;
// this checks if the app is running on IE
exports.isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 ||
    window.navigator.userAgent.indexOf('Trident/') > -1;
/***********************************************************
 * STEP 1 - B2C Policies and User Flows
 ***********************************************************/
exports.b2cPolicies = {
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
};
/***********************************************************
 * STEP 2 - Web API Scopes & URLs
 ***********************************************************/
exports.apiConfig = {
    b2cScopes: ["https://oriontechiottech.onmicrosoft.com/eaedddc1-f4be-426b-9d5b-7c3ef29a1095/read"],
    webApi: 'https://localhost:44379/weatherforecast'
};
/***********************************************************
 * STEP 3 - Authentication Configurations
 ***********************************************************/
exports.msalConfig = {
    auth: {
        clientId: "eaedddc1-f4be-426b-9d5b-7c3ef29a1095",
        authority: exports.b2cPolicies.authorities.signUpSignIn.authority,
        redirectUri: "http://localhost:4200/",
        postLogoutRedirectUri: "http://localhost:4200/",
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: "localStorage",
        // Set this to "true" to save cache in cookies
        // to address trusted zones limitations in IE
        storeAuthStateInCookie: exports.isIE,
    },
};
/***********************************************************
 * STEP 4 - Scopes Required For Login
 ***********************************************************/
exports.loginRequest = {
    scopes: ['openid', 'profile'],
};
/***********************************************************
 * STEP 5 - Scopes which will be used for the access token
 *          request for your web API
 ***********************************************************/
exports.tokenRequest = {
    scopes: exports.apiConfig.b2cScopes
};
/***********************************************************
 * STEP 6 - MSAL Angular Configurations
 *          Define protected API URLs and required scopes
 ***********************************************************/
exports.protectedResourceMap = [
    [exports.apiConfig.webApi, exports.apiConfig.b2cScopes]
];
/***********************************************************
 * STEP 7 - MSAL Angular specific configurations
 *
 ***********************************************************/
exports.msalAngularConfig = {
    popUp: !exports.isIE,
    consentScopes: __spreadArray(__spreadArray([], exports.loginRequest.scopes), exports.tokenRequest.scopes),
    // API calls to these coordinates will NOT activate MSALGuard
    unprotectedResources: [],
    // API calls to these coordinates will activate MSALGuard
    protectedResourceMap: exports.protectedResourceMap,
    extraQueryParameters: {}
};
//# sourceMappingURL=app-config.js.map