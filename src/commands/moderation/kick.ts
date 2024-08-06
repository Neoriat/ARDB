import { SlashCommandBuilder , EmbedBuilder , PermissionFlagsBits, GuildMember, Embed } from "discord.js";
import { errorEmbed, permissionErrorEmbed, userNotFoundErrorEmbed } from '../../embeds';


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
            const embed:EmbedBuilder = new EmbedBuilder()
                .setAuthor({name:interaction.client.user.tag , iconURL:interaction.client.user.avatarURL()})
                .setTitle('Success!')
                .setDescription('The user has been successfully kicked!')
                .addFields(
                    {name:'The user kicked' , value:`<@${target.id}>`},
                    {name:'Reason' , value:reason},
                    {name:'Moderator' , value:`<@${interaction.user.id}>`}
                )
                .setFooter({text:`Command invoked by ${interaction.user.tag}` , iconURL:interaction.user.avatarURL()})
                .setTimestamp()
                

            
           

            try {
                if (target.kickable) {
                    await interaction.reply({embeds:[embed]});
                    await target.kick(`Kicked by ${interaction.user.tag} | reason: ${reason}`);
                } else {
                    await interaction.reply({embeds:[permissionErrorEmbed]});
                }
            } catch (error) {
                if (error = TypeError) {
                    await interaction.reply({embeds:[userNotFoundErrorEmbed]});
                } else {
                    await interaction.reply({embeds:[errorEmbed]});
                    await interaction.followUp({content:error , ephemeral:true})
                }

            }
            
        }

}