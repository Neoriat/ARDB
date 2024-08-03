import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong'),
        
    async execute(interaction:any){
        const embed:EmbedBuilder = new EmbedBuilder()
            .setTitle('Latency')
            .addFields(
                {name:'Bot latency' , value:`${Date.now() - interaction.createdTimestamp}ms.`},
                {name:'Api latency' , value:`${Math.round(interaction.client.ws.ping)}ms`}
            )
            .setFooter({text:`Command invoked by ${interaction.user.tag}` , iconURL:interaction.user.avatarURL()})

        await interaction.reply({embeds : [embed]})
    }

}
