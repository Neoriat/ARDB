import { SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echo the chosen msg!')
        .addStringOption(option => 
            option.setName('msg')
                .setDescription('The msg you want to echo!')
                .setRequired(true)),
        async execute(interaction:any) {
            const msg:string = interaction.options.getString('msg');

            await interaction.reply(msg);
        },
}