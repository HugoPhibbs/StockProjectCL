# Project Brief and Specs

## Main goal

- The main goal of this project is to create a working command line application that interacts with the Polygon.io API. The general idea is to give a user tools to interact with stock market data.

## Structure of this application

- A user types in commands and requests into the command line for node.js. This is going to be done using the Readline module that comes with Node.js.

## Application flow

- A user starts the application directly from the command line
- A user selects options by typing the number corresponding to an option
- A user then enters in their name. If a save already exists under this name, then they will be prompted to be asked if they would like to overwrite this previous save with a fresh new one. Otherwise this previous save will be loaded. On the other hand, if a user hasnt already created a save, then a new save will be created.
- The main menu should display key prompts to interact with the application. Eg 1. View Porfolios, 2. Search for Symbol, 3. Create porfolio..... n. Quit application. If the application is quit, obviously all information should be saved.

### Moving between menus

- As previously stated, a user selects options by typing in numbers.
- A user can go back to previous menus by either typing in the number to go back, or enter "BACK".
- A user can quit the application at any point, saving their progress (will be notified if any temporary progress cannot be saved. For example, quitting app in the middle of adding a new holding), by typing "QUIT" or when they are in the main menu, entering the correct number. A user should be asked if they would like to quit before actually quitting.
- Responding to yes/no requests can be done with "Y" or "N"
- options are printed out to a user. In TypeScript, options will be implemented via a nested array. Nested array contains a message, and the command correseponding to this message

### Displaying of portfolios

- Portfolios should be displayed in a tabular manner, with columns in table corresponding to key portfolio statistics. Eg daily gain, total gain etc, total value etc.
- A user can select a portfolio, and then they are given options for how they can interact with this portfolio. Eg add holding, change name, view performance, edit holdings, delete portfolio etc.

### Displaying of holdings belonging to a portfolio

- holdings should be displayed in a tabular manner, showing daily and total gain since buying this holding etc.

### Creating a new portfolio

- User should be prompted to enter a name, this should be checked for validity.
- Once a portfolio has been created, a user should then be asked if they would like to holdings to it right away. A user should be able to consecutively add holdings to a portfolio without changing menus.

### Adding a holding

- User should be asked what symbol they bought for this holding, (this should be checked for validity), purchase date, purchase price etc.

## Classes and packages involved

### Package: ui.uiLogic

- package to contain any ui logic

#### Package: ui.uiLogic

- package to contain any classes that directly manipulate uiFacade classes. Contain methods that control the flow of their complimentary uifacade logic classes. 

#### UILogic

- Class that is extended by other uiLogic classes. 
- Has methods to start the interaction with a user, by sending controlling requests to uiFacade classes. Then sends requests back to coreLogic classes. In principle UILogic classes act as a go-between coreLogic and uiFacade objects.
- 

#### LoadAppUILogic

- Controls LoadAppUI class. Makes sure that entered input is otherwise valid by passing requests to a LoadApp object from coreLogic. 

### Package ui.uiFacade

- package to contain any classes that directly print and take input from users

#### UIMenu

- Abstract class extended by other UI classes that gives them general utility methods
- Has abstract message welcome() to print welcome message for any ui class. Eg for starting the app, a user will be given welcome message to app, for editing a portfolio, a user will be asked to enter input etc...
- Provides static methods to print and take input from a user. Eg print options that a user can select, methods to parse input from numbers and strings, these are checked for basic validity - eg string is a string. Then their logic class can handle any other checking for valid input. For example, making sure that an entered directory actually exists.

#### CmdLineUI

- Class that all other ui classes extend
- provides general methods for getting input from a user. This includes methods to to take string and number input

#### NewPortfolioUI

- Class to handle UI logic relating to creating a new portfolio

#### EditPortfolioUI

- Class to handle UI logic relating to editing a portfolio

#### EditHoldingUI

- Class to handle UI logic of editing a holding

#### NewHoldingUI

- Class to handle UI logic of creating a new Holding

#### MainMenuUI

- Class to handle UI logic of main menu options

#### CloseApplicationUI

- Class to handle UI logic with closing and saving the application. Including interface to ask user if they would like to quit and save the application.

### Package: coreLogic

- Holds any classes relating to logic that allows application to run at it's core

#### Setup

- Class that helps initialiaze the application.
- Functions to create a new save file for this application locally to this computer. Application progress is saved under a user's name.

#### SaveApp

- Class to handling the saving of the application

#### LoadApp

- Class to handle the loading of the application

### Package: coreObjects

#### Holding

- A TypeScript class
- has attributes for the stock symbol, date bought, shares bought, and share price at purchase
- method to calculate the return of a holding over a period, should be a parameter to return either percentage or dollar wise return.
- method to calculate if a holding has had positive or negative return over a specific period
- method to find its current value
- implements measurable interface

#### Portfolio

- A TypeScript class
- has attributes for the name of the portfolio, a list of all the holdings that it has.
- methods to calculate the percentage and actual return of the portfolio over a period
- method to find the current value of a portfolio
- method to add a new holding to a portfolio
- method to delete a holding from a portfolio
- method to rename a portfolio
- implements Measureable interface

#### PortfolioCollection

- a TypeScript class
- manages a collection of portfolios for a user
- makes sure that actions done to a portfolio are correct in the grand scheme of things. This includes making sure that no two portfolios have the same name
- Belongs to a user
- manages deleting portfolios, renaming portfolios etc

#### User

- a TypeScript class
- represents a user object for the website
- has attributes for the name of a user, their password, Along with a PortfolioCollection.
- Their preferences for the website should also be stored

#### Measureable

- a TypeScript interface
- defines methods for interacting with a object that can be measured with regards to it's performance

#### Watchlist

- has a collection of symbols that a user is watching for their performance
- method for actualReturn(period), percentageReturn(period)
