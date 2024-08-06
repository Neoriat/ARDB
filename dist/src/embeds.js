"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNotFoundErrorEmbed = exports.permissionErrorEmbed = exports.errorEmbed = void 0;
const discord_js_1 = require("discord.js");
exports.errorEmbed = new discord_js_1.EmbedBuilder()
    .setTitle('Error')
    .setDescription('There was an error while executing this command!')
    .setColor('DarkRed');
exports.permissionErrorEmbed = new discord_js_1.EmbedBuilder()
    .setTitle('Insufficient Permission')
    .setDescription('Not enough permission to do that action!')
    .setColor('DarkRed');
exports.userNotFoundErrorEmbed = new discord_js_1.EmbedBuilder()
    .setTitle('User not found!')
    .setDescription('User either does\'nt exist or is not part of the server!')
    .setColor('DarkRed');
