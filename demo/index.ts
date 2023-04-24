import { XtraVision } from '../dist/xtravision';

// 
// let credentials = {
//   orgId: "2ac131d9-2e16-11ed-adfc-0242ac120002", 
//   appSecret: "bd684e63b23088ec",
//   appId: "2ac14a10-2e16-11ed-adfc-0242ac120002",
// }

// required variable
const credentials: { orgId: string, appId: string, appSecret: string, userId?: any } = {
    orgId: "dd83059c-82f3-11ec-a9f5-a4bb6d6edc4e",
    appId: "95eacd45-82f5-11ec-a9f5-a4bb6d6edc4e",
    appSecret: "SK_WOLLENDANCE",
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
        email: process.env.XTRA_APP_USER ? process.env.XTRA_APP_USER as string : 'johnfly@yourdomain.com',
        firstName: 'John',
        lastName: 'Fly',
    };
    try {
        return await xtraObj.registerUser(userObj);
    } catch (e) {
        errorHandler(e);
    }
}

/* @ts-ignore */
async function doSomeOperation(userId: string) {
    // get xtra-Object for specific user with 30days validation
    const xtraObj = new XtraVision({ ...credentials, userId }, { expiresIn: '30d' });

    // IMP: serve below authToken to your frontend SDK for further real-time operation
    const authToken = xtraObj.getAuthToken();
    log(`Authtoken for user-id(${userId}): `, authToken);

    // get session-id
    let sessionData = await xtraObj.getSessionId()
    log("sessionData ", sessionData)

    // log(" Validate Request Data", await xtraObj.getAuthorizedData('mt', null, {assessmentName:"SQUATS", requestedAt:Date.now(), c:1}))

    // get results of current month
    const currentDate = new Date(); //Date("11/30/2012")
    const currentMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // adjust this for filtering the results
    const limit = 3;
    const offset = 0;
    const additionalStats = true;

    const assessmentResults = await xtraObj.getUserAssessmentResults(limit, offset, {
        startDate: currentMonthFirstDay,
        endDate: new Date('2023-04-24 16:44:09'),
        additionalStats,
    },
    );

    // show all assessmentResults: display empty array if data is not present
    log('User assessmentResults:', assessmentResults);

    // fist user assessmentResults
    assessmentResults.length > 0 ? log('First result of assessmentResults:', assessmentResults[0].results) : '';

}

// utility method
const log = function (param1: any, param2?: any) {
    param2 ? console.log(Date() + ' ' + param1, param2) : console.log(Date() + ' ' + param1);
};

// error handler
function errorHandler(e: any) {
    console.error('ErrorHandler: ', e?.message);
    console.error('Error Object', e);

    process.exit(1);
}

async function start() {
    try {
        //Register user, if user does not exit. (Get same details if email id already exist)
        const userDetails = await registerUser();

        //IMP: store user-id into required db so you can get data
        log('Fetch userDetails', userDetails);

        // let's do some operations
        await doSomeOperation(userDetails.id);

    } catch (e) {
        errorHandler(e)
    }

    process.exit(0);
}

start();
