## Setting up Shelf to run on your machine (LocalHost)
In order to ensure that these instructions work correctly for you, please make sure that you have [NodeJS](https://www.nodejs.org/) installed.
1. [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) the 326-final-sigma repository onto your machine.
2. Using Terminal or Command Line, navigate to the directory where the 326-final-sigma is stored.
3. In the top level directory, and type in `npm install`. This will install all the required dependencies for Shelf.
4. Navigate to the `src\server` directory, and run the command `ts-node myserver.ts` (or just node `node myserver.js` as all TS files should be compiled) in your command shell. You can also run the command `npm start` from the top level directory both commands should do the same thing. This will run the server on your localhost. Successfully running the server will give similar feedback to the following:

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/Screenshots/ts-node.PNG)

5. Open your browser and type into your URL `http://localhost:4000/index.html`. From here, you will be able to navigate the site locally on your machine. The main features require the user to login. You can do this by creating an account under the sign up page.
