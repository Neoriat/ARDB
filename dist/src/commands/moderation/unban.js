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
const embeds_1 = require("../../embeds");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('unban')
        .setDescription('unbans the specified user!')
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.BanMembers)
        .setDMPermission(false)
        .addUserOption(option => option
        .setName('target')
        .setDescription('The user that you need to unban!')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = interaction.options.getUser('target');
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.avatarURL() })
                .setTitle('Success!')
                .setDescription('The user has been successfully unbanned!')
                .addFields({ name: 'The user unbanned', value: `<@${target.id}>` }, { name: 'Moderator', value: `<@${interaction.user.id}>` })
                .setFooter({ text: `Command invoked by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
                .setTimestamp()
                .setColor('Green');
            try {
                yield interaction.guild.members.unban(target);
                yield interaction.reply({ embeds: [embed] });
            }
            catch (error) {
                yield interaction.reply({ embeds: [embeds_1.errorEmbed] });
                yield interaction.followup({ content: error, ephemeral: true });
            }
        });
    }
};
