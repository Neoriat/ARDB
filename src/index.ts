import 'dotenv/config';
import { Client , Events , GatewayIntentBits , Collection} from 'discord.js';
import fs from 'fs';
import path from 'path';

// Extends the base client
interface clientCommands extends Client{
    commands: Collection<string,any>;
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
}) as clientCommands

client.commands = new Collection()  

const foldersPath:string = path.join(__dirname , 'commands');
const folders:string[] = fs.readdirSync(foldersPath);

for (const folder of folders) {
    const commandsPath:string = path.join(foldersPath , folder);
    const commandFiles:string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));
    
    for (const file of commandFiles){

        const filePath:string = path.join(commandsPath , file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {

            client.commands.set(command.data.name , command)
            console.log(`[Success]${command.data.name} command has been loaded successfully`)

        } else {

            console.log(`Missing data or execute properties in ${filePath}`);

        }

    }
}

const eventsPath = path.join(__dirname , 'events');
const eventFiles = fs.readdirSync(eventsPath);

for (const file of eventFiles) {

    const eventPath = path.join(eventsPath , file);
    const event = require(eventPath);
    
    if (event.once) {
        client.once(event.name , (...args) => event.execute(...args));
    } else {
        client.on(event.name , (...args) => event.execute(...args));
    }

}

client.login(process.env.token);