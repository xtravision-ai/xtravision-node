import { XtraVision } from '../dist/xtravision';

// required variable
let credentials = {
  orgId: 'b86fa346-43cc-11ed-bac9-0492261dcf77',
  appId: 'bb3482fd-43cc-11ed-bac9-0492261dcf77',
  appSecret: '614f0f67a7811308',
  userId: null,
};

/**
 * code Snippet for user registration
 */
async function registerUser() {
  /**
   * IMP:
   *  - You can use, "xtraObj" to register your all existing user or new users.
   *  - it will register user if email-id does not exit, else return existing details.
   *
   */
  // create auth token for user registration
  const xtraObj = new XtraVision(credentials);

  //user:
  const userObj = {
    email: 'johnfly@yourdomain.com',
    firstName: 'John',
    lastName: 'Fly',
  };
  try {
    return await xtraObj.registerUser(userObj);
  } catch (e) {
    errorHandler(e);
  }
}

async function doSomeOperation(userId: string) {
  // get xtra-Object for specific user with 30days validation
  const xtraObj = new XtraVision({ ...credentials, userId }, { expiresIn: '30d' });

  // IMP: serve below authToken to your frontend SDK for further real-time operation
  const authToken = xtraObj.getAuthToken();
  log(`Authtoken for user-id(${userId}): `, authToken);

  // get results of current month
  const currentDate = new Date(); //Date("11/30/2012")
  const currentMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // adjust this for filtering the results
  const limit = 5;
  const offset = 0;

  const classSceduleId = 'c4fc8001-4727-4653-a6ac-d605937743f0';

  const assessmentResults = await xtraObj.getUserAssessmentResults(limit, offset, {
    startDate: currentMonthFirstDay,
    endDate: currentDate,
  });

  // show all assessmentResults: display empty array if data is not present
  log('User assessmentResults:', assessmentResults);

  // fist user assessmentResults
  assessmentResults.length > 0 ? log('First result of assessmentResults:', assessmentResults[0].results) : '';

  // get stats of current month
  const stats = await xtraObj.getUserClassStats(classSceduleId, currentMonthFirstDay, currentDate);
  //   show all stats: display empty array if data is not present
  log('User stats:', stats);
}

// utility method
const log = function (param1: any, param2?: any) {
  param2 ? console.log(param1 + '\n', param2) : console.log(param1);
};

// error handler
function errorHandler(e: any) {
  console.error('ErrorHandler: ', e?.message);
  console.error('Error Object', e);

  process.exit(1);
}

async function start() {
  //Register user, if user does not exit. (Get same details if email id already exist)
  const userDetails = await registerUser();

  //IMP: store user-id into required db so you can get data
  log('Fetch userDetails', userDetails);

  // let's do some operations
  await doSomeOperation(userDetails.id);

  process.exit(0);
}

start();

// Step 1: Create an instance of XTRA with the userId as null to register the user first time
// const xtraObj = new XtraVision('YOUR_APP_ID', 'YOUR_ORGANIZATION_ID', 'YOUR_APP_SECRET', null);
// const xtraObj = new XtraVision(appId, orgId, appSecret);

// // Step 2: Call this to register the user the first time. Please store the user id returned by the API
// xtraObj.registerUser('John', 'Fly', 'johnfly@yourdomain.com').then((response) => {
//   console.log(response);
// });

//// xtraObj.registerUser('johndoe1@yourdomain.com').then((response) => {
////   console.log(response);
//// });

// // Step 3: Create an instance of XTRA with the userId as null to register the user first time
// const xtraUserObj = new XtraVision(
//  '4e9503fc-2796-11ed-8bdc-12fab4ffabed', '1af719ff-2792-11ed-8bdc-12fab4ffabed', 'vNxr90yBtR9KrLwB3LobS6KLIwIEKiIq',
//   'b55836d9-1aa3-4dba-9a2e-5b0be0d34346',
// );

// console.log('Auth Token:', xtraObj.getAuthToken());

// // const janStartDate = new Date();
// // janStartDate.setMonth(janStartDate.getMonth() - 1);

// // xtraUserObj.getUserClassStats(null, janStartDate).then((userStats) => {
// //   console.log(userStats);
// // });

// // xtraUserObj.getUserAssessmentResults(janStartDate).then((results) => {
// //   console.log(results);
// // });
