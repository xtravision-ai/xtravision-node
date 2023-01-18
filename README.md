# xtravision-node
The official node.js library for the XtraVision API.


## For Demo Application:
1. Clone repo and install dependencies using below commands  
    ```sh
    git clone https://github.com/xtravision-ai/xtravision-node.git
    yarn install
    ````


2. Update credentials in index.ts file (demo/index.ts) 

    ```javascript
    let credentials = {
        orgId: "__ORG-ID__",
        appId: "__App-ID__",
        appSecret:"__App-Secret-Key__",
        userId: null
    }
    ```
    Kindly update your testing user details also in same file. (firstName, lastName and email).  

3. Compile and run using below command on root directory:  

    ```sh
    yarn build
    yarn start:demo
    ```

 Auth token and other response data will be printed in console log. 

## For Developer/Team Xtra : 

For quick start use below command:
1. Clone repo and install dependencies using below commands  
    ```sh
    git clone https://github.com/xtravision-ai/xtravision-node.git
    yarn install
    ````
2. (for Linux/Mac) use the below command to set the Server URL and all required credentials to generate auth token and other API testing

    ```bash
    XTRA_SERVER_URL=https://saasapi.xtravision.ai/api/v1/graphql XTRA_ORG_ID=__ORG-ID__ XTRA_APP_ID=__APP-ID__ XTRA_APP_SECRET=__App-Secret__ XTRA_APP_USER=__NAME@xtravision.ai__ yarn start:dev
    ```

    changes server url as per your demand (prod/staging/local)


## SDK API: 

- For API reference, kindly check [XtraVision GraphQL API Portal](https://xtravision-ai.github.io/)
