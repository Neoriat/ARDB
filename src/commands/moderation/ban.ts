import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, GuildMember } from 'discord.js';
import { errorEmbed, permissionErrorEmbed, userNotFoundErrorEmbed } from '../../embeds';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('bans the specified user!')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user that you need to ban!')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Why do you want to ban that member?')
                .setRequired(false)
        ).addNumberOption(option =>
            option  
                .setName('deleted_messages')
                .setDescription('delete messages the user sent before <your choice> hours (by default is zero)')
                .setRequired(false)
                
        ),
        

        async execute(interaction:any) {

            const target:GuildMember = interaction.options.getMember('target');
            const reason:string = interaction.options.getString('reason') ?? 'No reason provided';
            const embed:EmbedBuilder = new EmbedBuilder()
                .setAuthor({name:interaction.client.user.tag , iconURL:interaction.client.user.avatarURL()})
                .setTitle('Success!')
                .setDescription('The user has been successfully banned!')
                .addFields(
                    {name:'The user banned' , value:`<@${target.id}>`},
                    {name:'Reason' , value:reason},
                    {name:'Moderator' , value:`<@${interaction.user.id}>`}
                )
                .setFooter({text:`Command invoked by ${interaction.user.tag}` , iconURL:interaction.user.avatarURL()})
                .setTimestamp()
                

            
           

            try {
                if (target.bannable) {
                    await interaction.reply({embeds:[embed]});
                    await target.ban({reason:`Banned by ${interaction.user.tag} | reason: ${reason}` , deleteMessageSeconds: interaction.options.getNumber('deleted_messages') * 60 * 60});
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