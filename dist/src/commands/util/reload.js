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
        .setName('reload')
        .setDescription('reload a command!')
        .addStringOption(option => option.setName('command')
        .setDescription('the command you want to reload!')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandName = interaction.options.getString('command').toLowerCase();
            const command = interaction.client.commands.get(commandName);
            if (!command) {
                return yield interaction.reply('There is no such command as that name!');
            }
            delete require.cache[require.resolve(`./${command.data.name}.js`)];
            try {
                const newCommand = require(`./${command.data.name}.js`);
                interaction.client.commands.set(newCommand.data.name, newCommand);
                yield interaction.reply(`Successfully reloaded the ${newCommand.data.name}!`);
            }
            catch (error) {
                console.error(error);
                yield interaction.reply(`There was an error while reloading the ${command.data.name} command!`);
            }
        });
    }
};
