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
            await interaction.reply(`<@${target.user.id}> has been kicked`);
            target.kick(`Kicked by ${target.nickname} | reason: ${reason}`);
            
        }

}