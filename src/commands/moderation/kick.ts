import { SlashCommandBuilder , EmbedBuilder , PermissionFlagsBits, User , GuildMember } from "discord.js";


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
        ),

        async execute(interaction:any) {

            const target:GuildMember = interaction.options.getMember('target');
            await interaction.reply(`<@${target.user.id}> has been kicked`);
            target.kick();
            
        }

}