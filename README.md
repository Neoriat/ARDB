# ARDB
A random discord bot. A multi purpose bot with different commands and functionalities.

# Setup

1. Make a file named 'config.json'
2. Copy the below text into the file
```json
{
    "token":"Insert-token-here",
    "guild_id":"Insert-guild-id-here",
    "client_id":"Insert-client-id-here"
}
```
3. Replace the information with the wanted info
4. Run ```npm init``` in the project directory to install the dependencies
5. Run ```npm run deploy``` or ```node dist/src/deploy-commands.js``` to register the commands
6. Run ``` npm run start ``` or ```node .``` to run the bot
7. Enjoy

# Npm scripts

1. Starting the bot 
```npm run start```
2. Watching the tsc files
```npm run watch```
3. Build typescript files
```npm run build```
4. Deploy slashCommands
```npm run deploy```

# Contribution

1. Make a fork of this repo
2. Do your changes to the project
3. Open a pull request

