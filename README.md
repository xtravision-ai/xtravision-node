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

 ## SDK API: (TODO: Check in demo app) 