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
            try {
                if (target.kickable) {
                    yield interaction.reply(`<@${target.user.id}> has been kicked`);
                    yield target.kick(`Kicked by ${interaction.user.name} | reason: ${reason}`);
                }
                else {
                    yield interaction.reply('You can\'t do that!');
                }
            }
            catch (error) {
                if (error = TypeError) {
                    yield interaction.reply('The user is not part of the server!');
                }
                else {
                    yield interaction.reply(error);
                }
            }
        });
    }
};
