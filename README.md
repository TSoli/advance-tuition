# Advance Tuition

This app aims to help automate most of administration for paying tutors. It will enable tutors to
create timesheets for the hours they have worked to seek approval and then emails for payment can
be automatically sent to customers for payment.

# Contributing to the Project

The app is designed using React Native which is a JavaScript/TypeScript framework for designing
mobile applications. In order to get started you will need to install a few tools. You can follow
[this](https://reactnative.dev/docs/environment-setup) guide on the React Native website or follow
along with this README.

The project is currently converting from JavaScript to TypeScript so for now there is a mix of both.

# Preparation

To get started you will need to [install git](https://github.com/git-guides/install-git) and
[install expo](https://docs.expo.dev/get-started/installation/) which requires
[Node.js](https://nodejs.org/en/). It is also recommended to
[install yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) as a package manager for
the project \(although you can use npm which comes with Node.js\) and a text editor such as
[VSCode](https://code.visualstudio.com/download). Finally, it is a good idea to download the
[Expo Go](https://expo.dev/client) app on your smartphone to make it easy to test the app on your
own device.

# Opening the Project

Once you have all of these tools installed, open your terminal and navigate to the directory where
you would like to save the project with `cd`. Now you can run:

```
git clone https://github.com/zo1nk3dd/advance-tuition.git
```

in order to download the necessary project files onto your computer. Now you can open the project
directory in your text editor. If you are using VSCode, simply `cd` into the project directory and
run `code .`. Now, still inside the project directory in your terminal, run `yarn install` to
install all the packages for the project \(if you didn't install yarn use `npm install` instead\).

After the packages have finished installing you can run `npm start` in order to test the app.
You will see some options for viewing the app in emulators if you have them installed or you can
scan the QR code that appears in order to open the app on your smartphone. \(You may see an error
about a missing import file. See [Firebase](#firebase) if this happens.\)

You will be presented with a log in screen. To see the rest of the app you can log in with:

```
email: rolihik327@chnlog.com
password: 123456
```

\(Note: See the Firebase section for details about logging in as this will likely not work without
updating some configurations.\)

Whenever there are changes from the remote repo you can use `git pull` to pull them down to your
local repo and then just run `yarn install` and `npm start` to run the app. If there are no new
packages to install \(or you have installed them already\) you only have to run the last command.

# Other Useful Tools

There are some other useful tools that I would encourage you to install to keep style consistent.
These are [Prettier](https://prettier.io/) which is an automatic code formatter and
[ESLint](https://eslint.org/) which is a code linter that will highlight errors and some style
violations as you are typing code. While the linter is really up to you, Prettier is highly
recommended since it will automatically apply a consistent format to the code to avoid
unnecessary changes to existing code that will show up in diffs after commits. The configurations
for these tools are included in the repo \(.eslintrc.js and .prettierrc.json\) so you do not need
to manually configure them.

# Project Structure

There are lots of files in the root directory but you can ignore most of them. The only important
one is the App.js. This is the entry point to the application.

## Screens

Next you might want to look in the screens directory. The app can be thought of as a collection of
screens. You can interact with each of these screens and then you might navigate away from one and
onto another. There are three main ways of navigating between screens that React Native provides
which are stacks, tabs and drawers. To learn more about how navigation works visit the
[React Navigation website](https://reactnavigation.org/) and read the docs. This app primarily uses
a tab navigator which holds stacks in each tab. Therefore, inside the screens directory, you will
see more directories which organise the screens by which stack they belong to.

For example, once the user is logged in, they will see some tabs at the bottom of the screen,
one of which is the "Payroll" tab. Therefore, in screens > payrollStack we see the screens that are
displayed in this tab. When navigating to the payroll tab, the default screen displayed is the
TimesheetListScreen. Now if the user presses one of the items in the list which represents a
timesheet, they will be taken to the TimesheetScreen with some details about that particular
timesheet. Therefore, these screens are part of the same stack and so they are both in the
payrollStack directory. Similarly, if the user presses the plus button in the bottom right of the
TimesheetListScreen, then they will be taken to the AddTimesheetScreen where they can enter details
to create a new timesheet. The other screens will be located in the folders corresponding to their
stack. There is also a navigation folder which handles some of the more intricate navigation
details.

## Components

Since React Native is a JavaScript/TypeScript framework, designing screens is very similar to using
HTML, CSS and JavaScript for designing webpages. Just like webpages have lots of useful elements
such as \<div\> and \<p\> e.t.c, React Native has components such as \<View\> and
\<TextInput\>. What makes React so powerful is the ability to define your own reusable components by
customising the components provided by React. This is what is inside the components directory at the
root of the project -- custom components designed for this app.

## Styles

Finally we can look at the styles directory at the root of the project. Just like HTML/JavaScript
uses CSS for styling, React Native uses stylesheets. Common styles used throughout the project are
stored in here.

## Miscellaneous

The utils folder can be used to define some useful utilities functions. The firebase directory is
used for setting up some of the details for the cloud infrastructure used for the project such as
the firestore database.

# Firebase

For now, this app uses [Firebase](https://firebase.google.com/) to handle most of the backend
services required for the app such as authentication and the database. While in development, it is
possible to use local emulators for the firebase functionalities. For now this is enabled in the
project \(and below are some details on how to set this up\). You can read more about these local
emulators in the Firebase documentation in the
[Emulator Suite](https://firebase.google.com/docs/emulator-suite). Otherwise follow along here.

## Disabling Local Emulators \(Connecting to the Cloud\)

If you wish to connect to the cloud instead of using local emulators, open
`firebase/firebase.js` and comment out the following lines:

```
// Connect to local emulators - remove this before deployment
connectAuthEmulator(auth, 'http://' + LOCAL_IP + ':9099');
connectFirestoreEmulator(db, LOCAL_IP, 8080);
```

If you wish to use the local emulators, read on.

## Getting Your Local IP Address

The local emulators will be served on your local network so the first thing to do is to find out
what your local IP Address is. You can do this in the terminal with:

Windows \(in cmd or Powershell\):

```
ipconfig
```

\(It will be the IPv4 address under the Wireless LAN Adapter Wi-Fi section.\)

Mac:

```
ipconfig getifaddr en0
```

Linux:

```
hostname -I
```

Now create a file in the project `model/localConfig.js` \(if you choose another name then you will
need to update the .gitignore with it and the import in `firebase/firebase.js`\) and add

```
export const LOCAL_IP = '<YOUR_IP>';
```

## Using the Firebase CLI

To use the emulators \(and generally to interact with firebase project on the command line\) you
need to install the Firebase Command Line Interface. To do this run:

```
npm install -g firebase-tools
```

\(Note the -g flag will install it globally - not just for this project.\)

Now you can run:

```
firebase login
```

and log in with the advance tuition google account details. The project is already setup with the
configuration for the local firebase project so you do NOT need to run `firebase init`. Instead
you can start the emulators by running:

```
firebase emulators:start
```

Now you should be able to access UI for interacting with these emulators by visiting the links
presented in a web browser. Here you can manipulated the authentication and users or the firestore
database. To keep the authentication and database details available between sessions, you can use
the `--import localDir` flag to import the data from a local directory and the
`--export-on-exit localDir` flag to export the data to the `localDir` on exit. Alternatively, you
can use the `firebase emulators:export fileDir` command to export the current state. In our case,
the local directory used to store the firebase files is `localFirebase`. For example, if you would
like to use the local firebase files for testing but not save any changes you make you could run:

```
firebase emulators:start --import localFirebase
```

### Authentication Example

With the firebase emulators still running in one terminal, open a new one and start the project
with `npm start`. Once it is ready you can open the app however you usually would \(i.e on your
device or in an emulator on your computer\). Initially, there will be no authenticated users. You
can either click Sign Up on the app Login screen to create a new user or add one using the web UI
that you opened before. The firebase emulator terminal should display a link that you can click to
verify the email address. Alternatively, go to the web UI and click on the three dots next to the
user. Click Edit User and change the slider so that the email is verified. Now you should be able to
Login to the app normally.
