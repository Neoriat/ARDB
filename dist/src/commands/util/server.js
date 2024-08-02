"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('server')
        .setDescription('Shows info on the current server!')
        .setDMPermission(false)
        .addBooleanOption(option => option.setName('ephemeral')
        .setDescription('ephemeral')),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeStamp = Math.floor(interaction.guild.createdTimestamp / 1000);
            const membersCount = interaction.guild.memberCount;
            console.log(interaction.guild.emojis);
            const embed = new discord_js_1.EmbedBuilder()
                .setColor('NotQuiteBlack')
                .setTitle('Information about the server!')
                .setDescription(`Information about ${interaction.guild.name}`)
                .setAuthor({ name: `${interaction.client.user.tag}`, iconURL: interaction.client.user.avatarURL() })
                .setThumbnail(interaction.guild.iconURL())
                .addFields({ name: 'Server ID', value: interaction.guild.id }, { name: 'Created at', value: `<t:${timeStamp}> => <t:${timeStamp}:R>` }, { name: 'Members count', value: String(membersCount) }, { name: 'Owner', value: `<@${interaction.guild.ownerId}>` })
                .setTimestamp()
                .setFooter({ text: `Command invoked by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() });
            yield interaction.reply({ embeds: [embed], ephemeral: interaction.options.getBoolean() });
        });
    }
};
