import { XtraVision } from '../dist/xtravision';

// Step 1: Create an instance of XTRA with the userId as null to register the user first time
// const xtraObj = new XtraVision('YOUR_APP_ID', 'YOUR_ORGANIZATION_ID', 'YOUR_APP_SECRET', null);

// Step 2: Call this to register the user the first time. Please store the user id returned by the API
// xtraObj.identifyUser('John', 'Doe', 'johndoe@yourdomain.com').then((response) => {
//   console.log(response);
// });

// Step 3: Create an instance of XTRA with the userId as null to register the user first time
const xtraUserObj = new XtraVision(
  'YOUR_APP_ID',
  'YOUR_ORGANIZATION_ID',
  'YOUR_APP_SECRET',
  'USER_ID_FROM_PREVIOUS_STEP',
);

console.log('Auth Token:', xtraUserObj.getAuthToken());

const janStartDate = new Date();
janStartDate.setMonth(janStartDate.getMonth() - 1);

xtraUserObj.getUserClassStats(null, janStartDate).then((userStats) => {
  console.log(userStats);
});
