"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("../config.json");
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
console.log(config_json_1.token);
console.log(typeof (config_json_1.token));
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
const eventsPath = path_1.default.join(__dirname, 'events');
const eventFiles = fs_1.default.readdirSync(eventsPath);
for (const file of eventFiles) {
    const eventPath = path_1.default.join(eventsPath, file);
    const event = require(eventPath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
client.login(config_json_1.token);
