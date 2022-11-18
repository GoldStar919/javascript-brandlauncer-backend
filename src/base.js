// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";

// import * as admin from "firebase-admin";

// require('dotenv').config();

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAHc0M-_CECtG0KBwKNxCFxexFTUw2zcW8",
//   authDomain: "launcher-backend-569a1.firebaseapp.com",
//   projectId: "launcher-backend-569a1",
//   storageBucket: "launcher-backend-569a1.appspot.com",
//   messagingSenderId: "203280305407",
//   appId: "1:203280305407:web:15e1009c0f69afe2aad0ca",
//   measurementId: "G-B401CR95PJ"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);


// const app = initializeApp({
//     "type": "service_account",
//     "project_id": "launcher-backend-569a1",
//     "private_key_id": "a5cab0e9fd610342d31c18a3edd5dea10dc7b030",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCPI/iYOtvyXfkm\nXrJs4nbf/ekgIP8IkyYwUzwPoWudFoQ36mhlRiX3jsFku6VZQU7KoQJtj8fMiSLD\nGLTvaWDtB1gi1Hl/NuZm/3qqqhzdyY7p4SeCH+x5Sj8lcbztA2B6lyDj0qlDp04w\n58zatdlNErCXr76Z8mMDu3rixQ4q+E8WqlmT1tooEOl1WTvGOPRZscQe9XlByRqN\n3Qo+baG9EPq60QBSFrH5QHcQnpD94KjI66P9rzFxWb9B5v8A0i338a274u4CqyJQ\nlQ5ex9psavyxDoCTXkkSiM7+z6xFCHun9y9GGc/UmjXz+kZs4gn7UV8ZvzCpbqOX\nGquix60VAgMBAAECggEAB0pjvQ0yarPSntuv5s/aEiqSlypXEw67oTZ8Fqe4HXYq\nIdb0nkPmZyeEPic4ksU6yCNPRllOaeKKPLmjbZZGc4wuNwfvcEVRkulsTAkCE2HS\nv6LSKlSJ7NuVP8j9QG0tmtDbwf7W1DVPTDpiOrmMadqL2A4BfUHVPTltVuOGhzWu\n+7iEWucqnJtiM13jm+dU8ciWrtKl8qXyVshPcOv7LAXmhHeKFs0A5QZhXwxceOZd\nWKo41p7ieNKhZj4lXnQdJBCBDAJLBobL0DcHWdpnzYW4CL1FiloVsVxBL1DO9S7t\njMUCo5ieebiW/o1vrwbX1a80CF3sZGH4VBJNkrsbQQKBgQDI4TXfLG57ybLwAN3g\nbV6yuZN2jESDRSdV96zV1JMkNiUHjvSsv93bXbl2V/TGGIBN5csc0ttcKMd57YC1\nw54/n2tR8JsS6jCsk5UISmCgnHNIXpnyrTbrtbKSCwL1o9sOR7riOax/EjiFL5pn\n+Nz8BxIjYF+0jQ9FpYn45sJRvQKBgQC2at8TOFrobseYTfmr4+adkjI1E5YPMivk\nb1UAA75CoHRr23t/acxD0M7BuUwcZnZscpNMWypCNZ7U1NFg98JNvN2z84Srov+5\nw4f01TooLbkA+sWsc5qNuLf6uQ26T70Xz2WbYcQgQ3NGYizGB4k0350gdFpdaQmR\n8CLmzmACOQKBgDUCKQMhaG5GBXAL6oDkm46yJdWsog+52e13lCZBGCsAFrlt4ecM\nInFWxDAUecUkhgcIUpbilXw2Tp1ALSzJ2CKV4O4YffN51SpVL4imh+UaI9m/DQTa\n7Jk6s0qSmU9U0+NqzkgQTBKkLkIHE8nIBBiFjSXEsrykVJleW5BQ5IpJAoGAa7dB\n0IynibbYn4Pz2V9y7zrD8PmG06RRrMtdCuwq7hbniEULcNpdZvInFNfBLMgIR9OE\nTUNL+drF1nFwzeyfTN4ooDk870kJ7nyajKVYeR8+rmhmT4XYDrWz1hZuF8U8KJIs\nMouRj2ek6zvPqoQKrjEZDHAIaD49C3MceOQGZ2kCgYEAp564vP8+lQMJluGBI5CV\nQHFDI0c6IrdYVF9M89ZAS6rbERezmvNBvo1w2zrnjuFitD2VX6nQnUUnbWHhZ4lk\nz9CrRW4ma5CQ+YCt8AXNm9PYoqmWPKKwTMNv6d7RaXTX4pvAvMi0qgepyk6duF8m\nF0FBsSMrINbKSk5NZ+uOAOE=\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-h4519@launcher-backend-569a1.iam.gserviceaccount.com",
//     "client_id": "104676847789002936356",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h4519%40launcher-backend-569a1.iam.gserviceaccount.com"
// });


// export default app