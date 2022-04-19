// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    firebaseConfig: {
        apiKey: 'AIzaSyB8SHm7JuPH3m13MlNjQNoKg9pKayrdvyU',
        authDomain: 'xaviers-connect.firebaseapp.com',
        databaseURL: 'https://xaviers-connect.firebaseio.com',
        projectId: 'xaviers-connect',
        storageBucket: 'xaviers-connect.appspot.com',
        messagingSenderId: '717372984367',
    },
    general_const: {
        BASE_URL: 'http://localhost:4200/',
        dateFormate: 'MM/d/yyyy'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
