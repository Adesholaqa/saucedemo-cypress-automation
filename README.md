# SauceDemo Cypress Automation

## Project Overview  
This repository contains Cypress automation tests for the SauceDemo e-commerce website. The tests cover key user flows such as login (valid, invalid, empty inputs), logout, product selection, cart operations, and checkout validation.

## Features Tested  
- Login with valid credentials  
- Login with invalid credentials  
- Login with empty fields  
- Logout workflow  
- Product selection and details verification  
- Add and remove items from cart  
- Verify cart badge count  
- Checkout subtotal and tax calculation validation  

## Technologies Used  
- Cypress 13.17.0  
- JavaScript (Node.js)  
- Git & GitHub for version control  

## Setup Instructions  

1. Clone the repository  
   git clone https://github.com/Adesholaqa/saucedemo-cypress-automation.git

2.  Navigate into the project folder and install dependencies
cd saucedemo-cypress-automation
     npm install

3. Running Tests
To open Cypress Test Runner (headed mode):
   npx cypress open
To run tests in headless mode (CI/CD friendly):
    npx cypress run

    Folder Structure
    /cypress
  /e2e          # Test specs
  /fixtures     # Test data
  /support      # Reusable commands and configuration
cypress.config.js  # Cypress configuration file
README.md          # Project documentation

Notes:
Tests are written in JavaScript using Cypress v13.17.0.

Videos and screenshots are disabled/enabled depending on your Cypress configuration.

This repo focuses on key workflows for demonstration and portfolio purposes.





