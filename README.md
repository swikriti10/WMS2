# Delpoying a NodeJS app on SAP Cloud Platform Cloud Foundry
This is a HelloWorld Sample of NodeJS for demostrating how to deploy a NodeJS app on SAP Cloud Platform Cloud Foundry.

To get started with SAP Cloud Platform Cloud Foundry, please follow the how-to guide below:
https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/b8ee7894fe0b4df5b78f61dd1ac178ee.html

Assume you have went through the Sign Up, Set up and Log On steps detailed above: 

### 1.Sign Up: 
Sign up for a trial space on a Cloud Foundry instance.

### 2.Set Up:
Download and configure the Cloud Foundry command line interface (cf CLI).

### 3.Log On: 
Log on to your trial space on the Cloud Foundry instance.
```sh
$ cf api
$ cf login
```
NOW we'll start from here to deploy you app to SCP.

### 4.Deploy your app to SAP Cloud Platform with CLI

To deploy your Node JS App on SCP CF, you could follow the Cloud Foundry document in details like any other CF platform.
https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html

To prepare your node js app for CF deployment, you simply need two configurations.

1).Define a start script to launch the node js app in pacakge.json, which cf launches your nodejs app with command "npm start"
for example:
"scripts": 
    {
        "start": "node app.js"
    }

2).Define a start script to launch the node js app in pacakge.json, which cf launches your Create a manifest.yml about the applicaiton name, memory allocation, and number of instances

Finally, just use "cf push" command to deply your node js app to SAP Cloud Platform.
```sh
$ cf push
```

Once your Node JS all is deployed successfully, you can access it from SAP Cloud Platform Cloud Foundry.