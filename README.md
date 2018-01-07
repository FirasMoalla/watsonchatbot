# Getting started with Node and Watson Chatbot on IBM Cloud

This lab will take you through the steps to get started with a simple Node application for a Chatbot on IBM Cloud and help you:
- Set up a development environment
- Download sample code
- Run the application on IBM Cloud Foundry
- Add an IBM Cloud Conversation service for a Chatbot
- Implement a Chatbot

This lab is in two parts. In the first part, we will build a sample Node application for a chatbot. In the second part, we will implement the Chatbot.

## Prerequisites

You'll need the following:
* [IBM Cloud account](https://console.ng.bluemix.net/registration/)
* [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads)
* [Git](https://git-scm.com/downloads)

# Part 1: Build a Chatbot app on IBM Cloud

## 1. Create a Chatbot service

In what follows we will create a Watson Conversation service on IBM Cloud.

1. Log in to IBM Cloud in your Browser. Click on `Catalog` on the top right.
2. Click on `Watson` on the left menu and then click on `Conversation`.
3. Click on `Create` to create the service.
4. Click on `Launch tool` from the Conversation services.
5. Navigate to the IBM Watson Conversation dashboard tab and click on `Create` to create a new workspace. Enter a name for the worksspace in the `Name` field and select `Arabic` from the `Language` list, then click on `Create`.
6. From the left menu on the IBM Watson Conversation dashboard, click on `Deploy`. This will display the credentials to access the Conversation services and the workspace that you have just created. Save the `Workspace ID`, `Username` and `Password` somwehere safe for later use.

## 2. Clone the sample Node app

Clone the following repo and change your directory to where the sample application is located.
  ```
git clone https://github.com/FirasMoalla/watsonchatbot.git
cd watsonchatbot
  ```

## 3. Install dependencies (optional for local development)

  ```
npm install --save
  ```

## 4. Bind the sample Node app to the Conversation service

Open the `server.js` file in the `watsonchatbot` folder and modify the `username`, `password` and `workspace_id` in the following lines to match the credentials and workspace information that you have saved earlier.

```javascript
var conversation = new ConversationV1({
  username: '',
  password: '',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});
```

```javascript
workspace_id: ''
```

## 5. Deploy the app

You can use the Cloud Foundry CLI to deploy applications.

Choose your API endpoint
   ```
bx api https://api.eu-gb.bluemix.net
   ```

Login to your IBM Cloud account

   ```
bx login
   ```

Set the target to your organisation and space

   ```
bx target -o <organisation> -s <space>
   ```

From within the *chatbot* directory push your app to IBM Cloud
   ```
bx app push
   ```

This can take a minute. If there is an error in the deployment process you can use the command `bx logs <Your-App-Name> --recent` to troubleshoot.

When deployment completes you should see a message indicating that your app is running. View your app at the URL listed in the output of the push command. You can also issue the
  ```
bx app list
  ```
command to view your apps status and see the URL.

# Part 2: Implementing a Chatbot

## Chatbot dialog excercise

Write down a dialog in notes stumilating a use case.

Browse to the Watson Conversation workspace and open the workspace that you have created in Part 1 to implement the use case.

Test your use case through the application interface that you have deployed in Part 1.

# Resources

* [Build a chatbot in 10 min with Watson](https://www.ibm.com/blogs/watson/2016/12/build-chat-bot/)
* [Build a configurable, retail-ready chatbot](https://developer.ibm.com/code/patterns/create-cognitive-retail-chatbot/)
* [Enhance a chatbot conversation with Context Variables and System Entities](https://www.ibm.com/blogs/bluemix/2017/11/enhance-chatbot-conversation-context-variables-system-entities/)
* [3 types of business chatbots you can build](https://www.ibm.com/blogs/watson/2017/12/3-types-of-business-chatbots-you-can-build/)
* [IBM Cloud Private](https://www.ibm.com/cloud-computing/products/ibm-cloud-private/) 
