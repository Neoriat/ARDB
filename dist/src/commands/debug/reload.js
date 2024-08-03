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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const node_fs_1 = __importDefault(require("node:fs"));
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
            const currentPath = path_1.default.join(__dirname, '../');
            const folders = node_fs_1.default.readdirSync(currentPath);
            for (const folder of folders) {
                const filesPath = path_1.default.join(currentPath, folder);
                const files = node_fs_1.default.readdirSync(filesPath);
                for (const file of files) {
                    const filePath = path_1.default.join(filesPath, file);
                    if (file == `${commandName}.js`) {
                        delete require.cache[require.resolve(filePath)];
                        try {
                            const newCommand = require(filePath);
                            interaction.client.commands.set(newCommand.data.name, newCommand);
                            yield interaction.reply(`Successfully reloaded the ${newCommand.data.name}!`);
                        }
                        catch (error) {
                            console.error(error);
                            yield interaction.reply(`There was an error while reloading the ${command.data.name} command!`);
                        }
                    }
                }
            }
        });
    }
};
