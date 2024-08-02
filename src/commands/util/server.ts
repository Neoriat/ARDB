import { SlashCommandBuilder , EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Shows info on the current server!')
        .setDMPermission(false)
        .addBooleanOption(option => 
            option.setName('ephemeral')   
                .setDescription('ephemeral')            
        ) ,
        async execute(interaction:any) {
            const timeStamp:number = Math.floor(interaction.guild.createdTimestamp/ 1000);
            const membersCount:number = interaction.guild.memberCount;
            console.log(interaction.guild.emojis)
            const embed:EmbedBuilder = new EmbedBuilder()
                .setColor('NotQuiteBlack')
                .setTitle('Information about the server!')
                .setDescription(`Information about ${interaction.guild.name}`)
                .setAuthor({name:`${interaction.client.user.tag}` , iconURL:interaction.client.user.avatarURL()})

                .setThumbnail(interaction.guild.iconURL())
                .addFields(
                    {name:'Server ID' , value:interaction.guild.id},
                    {name:'Created at' , value:`<t:${timeStamp}> => <t:${timeStamp}:R>`},
                    {name:'Members count' , value:String(membersCount)},
                    {name:'Owner' , value:`<@${interaction.guild.ownerId}>`}
                    
                )
                .setTimestamp()
                .setFooter({text:`Command invoked by ${interaction.user.tag}` , iconURL:interaction.user.avatarURL()})


            await interaction.reply({embeds:[embed] , ephemeral:interaction.options.getBoolean()})
        }
}
