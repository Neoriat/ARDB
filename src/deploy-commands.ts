import {REST , Routes} from 'discord.js';
import {client_id , guild_id , token} from '../config.json';
import fs from 'node:fs';
import path from 'node:path';

const commands:string[] = [];

const foldersPath:string = path.join(__dirname , 'commands');
const folders:string[] = fs.readdirSync(foldersPath);

for (const folder of folders) {
    const filesPath:string = path.join(foldersPath , folder);
    const files:string[] = fs.readdirSync(filesPath).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const filePath:string = path.join(filesPath , file);
        const command = require(filePath)

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`There is no "data" or "execute" property in ${filePath}!`)
        }
    }
}

const rest:REST = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started registering ${commands.length} commands!`)
        const data = await rest.put(Routes.applicationGuildCommands(client_id , guild_id) ,
        { body:commands },
    );

        console.log(`Registered ${commands.length} application commands!`)
    } catch(error) {
        console.error(error);
    }


})();