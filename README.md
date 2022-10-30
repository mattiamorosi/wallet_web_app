# Wallet_web_app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

To download the code, write on the terminal `git clone https://github.com/mattiamorosi/wallet_web_app.git`.
After that, open a terminal in the "wallet_web_app" folder and write on the terminal `npm start`. This will run the app in http://localhost:3000.

To use the application, you have to run both the Verifier (https://github.com/mattiamorosi/Verifier) and the Identity Provider (https://github.com/mattiamorosi/IdentityProvider).


## Usage
When the app starts, it is possilbe to insert an Alias to require the DID. By pressing the "Register" button, the DID generation starts. If the alias has not been used jet, the DID will appear on the screen, otherwise a new alias must be inserted.
Once the DID is created, it is possible to request for a credential by pressing the "Get a new VC!" button. In the page that will be loaded, the fieds of the credential to request must be inserted, and by pressing on the "Get VC" button, the Verifiable Credential will be created and displayed.
Then, it is possible to verify if the credential has been revoked by clicking on the "Verify your VC" button. After this, the result of the verification will be displayed on the screen.



### `npm test`

