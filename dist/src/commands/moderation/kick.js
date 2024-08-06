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
        .setName('kick')
        .setDescription('Kicks the specified user!')
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.KickMembers)
        .setDMPermission(false)
        .addUserOption(option => option
        .setName('target')
        .setDescription('The user that you need to kick!')
        .setRequired(true))
        .addStringOption(option => option
        .setName('reason')
        .setDescription('Why do you want to kick that member?')
        .setRequired(false)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const target = interaction.options.getMember('target');
            const reason = (_a = interaction.options.getString('reason')) !== null && _a !== void 0 ? _a : 'No reason provided';
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.avatarURL() })
                .setTitle('Success!')
                .setDescription('The user has been successfully kicked!')
                .addFields({ name: 'The user kicked', value: `<@${target.id}>` }, { name: 'Reason', value: reason }, { name: 'Moderator', value: `<@${interaction.user.id}>` })
                .setFooter({ text: `Command invoked by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
                .setTimestamp();
            try {
                if (target.kickable) {
                    yield interaction.reply({ embeds: [embed] });
                    yield target.kick(`Kicked by ${interaction.user.tag} | reason: ${reason}`);
                }
                else {
                    yield interaction.reply({ embeds: [embeds_1.permissionErrorEmbed] });
                }
            }
            catch (error) {
                if (error = TypeError) {
                    yield interaction.reply({ embeds: [embeds_1.userNotFoundErrorEmbed] });
                }
                else {
                    yield interaction.reply({ embeds: [embeds_1.errorEmbed] });
                    yield interaction.followUp({ content: error, ephemeral: true });
                }
            }
        });
    }
};
