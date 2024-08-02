import { SlashCommandBuilder } from 'discord.js';

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



            delete require.cache[require.resolve(`./${command.data.name}.js`)];

            try {
                const newCommand = require(`./${command.data.name}.js`)
                interaction.client.commands.set(newCommand.data.name , newCommand)
                await interaction.reply(`Successfully reloaded the ${newCommand.data.name}!`)
            } catch (error) {
                console.error(error)
                await interaction.reply(`There was an error while reloading the ${command.data.name} command!`)
            }
        }
            
} 