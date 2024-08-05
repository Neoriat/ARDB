import { SlashCommandBuilder } from 'discord.js';
import path from 'path';
import fs from 'node:fs';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('reload a command!')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('the command you want to reload!')
                .setRequired(true)
        ),
        
        async execute(interaction:any) {
            const commandName:string = interaction.options.getString('command').toLowerCase();
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                return await interaction.reply('There is no such command as that name!');    
            }

            const currentPath:string = path.join(__dirname , '../');
            const folders:string[] = fs.readdirSync(currentPath);
            
            for (const folder of folders) {
                const filesPath:string = path.join(currentPath , folder);
                const files:string[] = fs.readdirSync(filesPath);

                for (const file of files) {
                    const filePath:string = path.join(filesPath , file);

                    if (file == `${commandName}.js`){
                        delete require.cache[require.resolve(filePath)]

                        try {
                            const newCommand = require(filePath)
                            interaction.client.commands.set(newCommand.data.name , newCommand)
                            await interaction.reply(`Successfully reloaded the ${newCommand.data.name}!`)
                        } catch (error) {
                            console.error(error)
                            await interaction.reply(`There was an error while reloading the ${command.data.name} command!`)
                        }
                    } 
                }

                
            }

          


        }
            
} 