import { SlashCommandBuilder , EmbedBuilder , PermissionFlagsBits, GuildMember } from "discord.js";


module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks the specified user!')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user that you need to kick!')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Why do you want to kick that member?')
                .setRequired(false)
        ),

        async execute(interaction:any) {

            const target:GuildMember = interaction.options.getMember('target');
            const reason:string = interaction.options.getString('reason') ?? 'No reason provided';
            try {
                if (target.kickable) {
                    await interaction.reply(`<@${target.user.id}> has been kicked`);
                    await target.kick(`Kicked by ${interaction.user.name} | reason: ${reason}`);
                } else {
                    await interaction.reply('You can\'t do that!');
                }
            } catch (error) {
                if (error = TypeError) {
                    await interaction.reply('The user is not part of the server!');
                } else {
                    await interaction.reply(error);
                }

            }
            
        }

}