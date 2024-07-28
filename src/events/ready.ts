import { Events , Client } from 'discord.js';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(c:Client):void {
        console.log(`Logged in as ${c.user!.tag}!`);
    },
};