# Advance Tuition

This app aims to help automate most of administration for paying tutors. It will enable tutors to
create timesheets for the hours they have worked to seek approval and then emails for payment can be
automatically sent to customers for payment.

## Contributing to the Project

The app is designed using React Native which is a JavaScript/TypeScript framework for designing
mobile applications. In order to get started you will need to install a few tools. You can follow
[this](https://reactnative.dev/docs/environment-setup) guide on the React Native website or follow
along with this README.

The project is currently converting from JavaScript to TypeScript so for now there is a mix of both.

## Preparation

To get started you will need to [install git](https://github.com/git-guides/install-git) and
[install expo](https://docs.expo.dev/get-started/installation/) which requires
[Node.js](https://nodejs.org/en/) \(currently expo does not support Node 17+ so after installing
nvm, install Node 16 with `nvm install 16`\). It is also recommended to
[install yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) as a package manager for
the project \(although you can use npm which comes with Node.js\) and a text editor such as
[VSCode](https://code.visualstudio.com/download). Finally, it is a good idea to download the
[Expo Go](https://expo.dev/client) app on your smartphone to make it easy to test the app on your
own device.

## Opening the Project

Once you have all of these tools installed, open your terminal and navigate to the directory where
you would like to save the project with `cd`. Now you can run:

```
git clone --recurse-submodules https://github.com/zo1nk3dd/advance-tuition.git
```

in order to download the necessary project files onto your computer. Now you can open the project
directory in your text editor. If you are using VSCode, simply `cd` into the project directory and
run `code .`. Now, still inside the project directory in your terminal, run `yarn install` to
install all the packages for the project \(if you didn't install yarn use `npm install` instead\).

After the packages have finished installing you can run `npx expo start` in order to test the app.
You will see some options for viewing the app in emulators if you have them installed or you can
scan the QR code that appears in order to open the app on your smartphone. \(You may see an error
about a missing import file. See [Backend](#backend) if this happens.\)

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

## Other Useful Tools

There are some other useful tools that I would encourage you to install to keep style consistent.
These are [Prettier](https://prettier.io/) which is an automatic code formatter and
[ESLint](https://eslint.org/) which is a code linter that will highlight errors and some style
violations as you are typing code. While the linter is really up to you, Prettier is highly
recommended since it will automatically apply a consistent format to the code to avoid unnecessary
changes to existing code that will show up in diffs after commits. The configurations for these
tools are included in the repo \(.eslintrc.js and .prettierrc.json\) so you do not need to manually
configure them.

## Project Structure

There are lots of files in the root directory but you can ignore most of them. The only important
one is the App.js. This is the entry point to the application.

### Screens

Next you might want to look in the screens directory. The app can be thought of as a collection of
screens. You can interact with each of these screens and then you might navigate away from one and
onto another. There are three main ways of navigating between screens that React Native provides
which are stacks, tabs and drawers. To learn more about how navigation works visit the
[React Navigation website](https://reactnavigation.org/) and read the docs. This app primarily uses
a tab navigator which holds stacks in each tab. Therefore, inside the screens directory, you will
see more directories which organise the screens by which stack they belong to.

For example, once the user is logged in, they will see some tabs at the bottom of the screen, one of
which is the "Payroll" tab. Therefore, in screens > payrollStack we see the screens that are
displayed in this tab. When navigating to the payroll tab, the default screen displayed is the
TimesheetListScreen. Now if the user presses one of the items in the list which represents a
timesheet, they will be taken to the TimesheetScreen with some details about that particular
timesheet. Therefore, these screens are part of the same stack and so they are both in the
payrollStack directory. Similarly, if the user presses the plus button in the bottom right of the
TimesheetListScreen, then they will be taken to the AddTimesheetScreen where they can enter details
to create a new timesheet. The other screens will be located in the folders corresponding to their
stack. There is also a navigation folder which handles some of the more intricate navigation
details.

### Components

Since React Native is a JavaScript/TypeScript framework, designing screens is very similar to using
HTML, CSS and JavaScript for designing webpages. Just like webpages have lots of useful elements
such as \<div\> and \<p\> e.t.c, React Native has components such as \<View\> and \<TextInput\>.
What makes React so powerful is the ability to define your own reusable components by customising
the components provided by React. This is what is inside the components directory at the root of the
project -- custom components designed for this app.

### Styles

Finally we can look at the styles directory at the root of the project. Just like HTML/JavaScript
uses CSS for styling, React Native uses stylesheets. Common styles used throughout the project are
stored in here.

### Miscellaneous

The utils folder can be used to define some useful utilities functions. The firebase directory is
used for setting up some of the details for the cloud infrastructure used for the project such as
the firestore database.

## Backend

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

Now create a file in the project `localIp.ts` and add the below line,

```
export const LOCAL_IP = '<YOUR_IP>';
```

Now you can follow the instructions in the
[advance-tuition-backend project](https://github.com/TSoli/advance-tuition-backend) to start the
emulators.
