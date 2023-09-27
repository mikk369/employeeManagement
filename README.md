# EmployeeManagement


## How to start

- Clone app to computer:

```
  git clone https://github.com/mikk369/movieApi.git
  cd to movieApi folder
  - Split terminal, cd one terminal to client and other to server
  then make npm i on each to get dependencies.
  - In client side "npm run serve" and in server "npm run dev "

- .env template:

  DATABASE =
  PORT =
  USERNAME =
  PASSWORD =

  JWT_SECRET=
  JWT_EXPIRES_IN=
  JWT_COOKIE_EXPIRES_IN=

```

## How to Create a MongoDB Account and Connect to a MongoDB Database

Step 1: Create a MongoDB Account
Go to the MongoDB website: https://www.mongodb.com/.

Click on the "Try Free" button in the top right corner.

Fill out the registration form with your information, including your name, email address, and password.

Click the "Get started free" button to create your MongoDB Atlas account.

You will receive a verification email. Open your email and click the verification link to verify your account.

Step 2: Create a New Cluster
Once you've verified your account, log in to MongoDB Atlas.

After logging in, click Create deployment.

Choose right side FREE version, can leave default options or provider AWS, region Stockholm and name your cluster.

Use username and password, need them in .env file, enter user and the random password and click create user.

Next add my curent IP address if its not already added.

Clic Next and close.

Step 3: Get Your Database Connection String
After your cluster is created, click on the "CONNECT" button.

Under "Connect to your application" choose Drivers

Driver: Node.js version: 5.5 or later

need to add the username, password and connection string to .env file

follow the instructions from there.
