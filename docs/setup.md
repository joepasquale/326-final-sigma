## Setting up Shelf to run on your machine (LocalHost)
In order to ensure that these instructions work correctly for you, please make sure that you have [NodeJS](https://www.nodejs.org/) installed.
1. [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) the 326-final-sigma repository onto your machine.
2. Using Terminal or Command Line, navigate to the directory where the 326-final-sigma is stored.
3. Navigate to the `src\server` directory, and type in `npm install`. This will install all the required modules for Shelf.
4. Run the command `ts-node myserver.ts` in your command shell. This will run the server on your localhost. Successully running the server will give similar feedback to the following: ![Successful ts-node execution](../src/public/resources/ts-node.png).
5. Navigate to the `src\public\html` directory and open `index.html`. 