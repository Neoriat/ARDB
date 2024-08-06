import { Embed, EmbedBuilder } from "discord.js";

export const errorEmbed:EmbedBuilder = new EmbedBuilder()
    .setTitle('Error')
    .setDescription('There was an error while executing this command!')
    .setColor('DarkRed')

export const permissionErrorEmbed:EmbedBuilder = new EmbedBuilder()
    .setTitle('Insufficient Permission')
    .setDescription('Not enough permission to do that action!')
    .setColor('DarkRed')

export const userNotFoundErrorEmbed:EmbedBuilder = new EmbedBuilder()
    .setTitle('User not found!')
    .setDescription('User either does\'nt exist or is not part of the server!')
    .setColor('DarkRed')