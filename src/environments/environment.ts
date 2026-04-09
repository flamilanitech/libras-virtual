// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const assets = '';
const imagePath = '../assets/imgs/logo.png';
const imgLoading = '../assets/loading.gif';
const iconSign = './../assets/imgs/sign-language.png';

export const environment = {
  production: false,
  assets,
  imagePath,
  imgLoading,
  iconSign,
  clerkPublishableKey:
    'pk_test_c3RlcmxpbmctY29sbGllLTQxLmNsZXJrLmFjY291bnRzLmRldiQ',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
