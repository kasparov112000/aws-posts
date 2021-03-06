// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //  apiUrl: "http://localhost:3000/api"
   // apiUrl: "http://Biolinkdepot-env.srfrwdmk7z.us-east-2.elasticbeanstalk.com/api"
   //  apiUrl: "http://bio2-env.2p5bbyxw9r.us-east-2.elasticbeanstalk.com/api"
  // apiUrl: "https://lit-mountain-42388.herokuapp.com/api",
 // api_url: "https://lit-mountain-42388.herokuapp.com/api"
  apiUrl: "http://localhost:3000/api",
  api_url: "http://localhost:3000/api",
  JWT_KEY: "secret_this_should_be_longer"
// apiUrl: "https://mean-course-back.herokuapp.com/api",
// api_url: "https://lit-mountain-42388.herokuapp.com/api"

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
 import 'zone.js/dist/zone-error';  // Included with Angular CLI.
