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
require("dotenv/config");
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds]
});
client.commands = new discord_js_1.Collection();
const foldersPath = path_1.default.join(__dirname, 'commands');
const folders = fs_1.default.readdirSync(foldersPath);
for (const folder of folders) {
    const commandsPath = path_1.default.join(foldersPath, folder);
    const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('js'));
    for (const file of commandFiles) {
        const filePath = path_1.default.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`[Success]${command.data.name} command has been loaded successfully`);
        }
        else {
            console.log(`Missing data or execute properties in ${filePath}`);
        }
    }
}
client.once(discord_js_1.Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`${interaction.commandName} does not exist!`);
        return;
    }
    try {
        yield command.execute(interaction);
    }
    catch (e) {
        console.error(e);
        if (interaction.replied || interaction.deferred) {
            interaction.followUp('There was an error while executing this command! UWU');
        }
        else {
            interaction.reply('There was an error while executing this command! UWU');
        }
    }
}));
client.login(process.env.token);
