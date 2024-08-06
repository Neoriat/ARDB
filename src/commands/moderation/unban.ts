import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, User } from "discord.js";
import { errorEmbed } from "../../embeds";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unbans the specified user!')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user that you need to unban!')
                .setRequired(true)
        ),
        async execute (interaction:any) {
            const target:User = interaction.options.getUser('target');
            const embed:EmbedBuilder = new EmbedBuilder()
            .setAuthor({name:interaction.client.user.tag , iconURL:interaction.client.user.avatarURL()})
            .setTitle('Success!')
            .setDescription('The user has been successfully unbanned!')
            .addFields(
                {name:'The user unbanned' , value:`<@${target.id}>`},
                {name:'Moderator' , value:`<@${interaction.user.id}>`}
            )
            .setFooter({text:`Command invoked by ${interaction.user.tag}` , iconURL:interaction.user.avatarURL()})
            .setTimestamp()
            .setColor('Green')
            try {
                await interaction.guild.members.unban(target);
                await interaction.reply({embeds:[embed]})
            } catch(error) {
                await interaction.reply({embeds:[errorEmbed]})
                await interaction.followup({content:error , ephemeral:true})
            }

        }}