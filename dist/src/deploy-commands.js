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
const config_json_1 = require("../config.json");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const commands = [];
const foldersPath = node_path_1.default.join(__dirname, 'commands');
const folders = node_fs_1.default.readdirSync(foldersPath);
for (const folder of folders) {
    const filesPath = node_path_1.default.join(foldersPath, folder);
    const files = node_fs_1.default.readdirSync(filesPath).filter(file => file.endsWith('.js'));
    for (const file of files) {
        const filePath = node_path_1.default.join(filesPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.ToJSON());
        }
        else {
            console.log(`There is no "data" or "execute" property in ${filePath}!`);
        }
    }
}
const rest = new discord_js_1.REST().setToken(config_json_1.token);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Started registering ${commands.length}!`);
        const data = yield rest.put(discord_js_1.Routes.applicationGuildCommands(config_json_1.client_id, config_json_1.guild_id), { body: commands });
        console.log(`Registered ${commands.length} application commands!`);
    }
    catch (error) {
        console.error(error);
    }
}));
