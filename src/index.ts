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


client.once(Events.ClientReady , c => {
    console.log(`Logged in as ${c.user.tag}`);
})

client.on(Events.InteractionCreate , async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`${interaction.commandName} does not exist!`)
        return;
    }

    try {
        await command.execute(interaction);
    } catch(e) {
        console.error(e)
        if (interaction.replied || interaction.deferred) {
            interaction.followUp('There was an error while executing this command! UWU')
        } else {
            interaction.reply('There was an error while executing this command! UWU')
        }
    }


})

client.login(process.env.token);