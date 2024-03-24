const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    Events,
    EmbedBuilder
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, GuildMember, Message, ThreadMember } = Partials;

const client = new Client({
    intents: [
        Guilds, GuildMembers, GuildMessages
    ],
    partials: [
        User, GuildMember, Message, ThreadMember
    ],
});

const { loadEvents } = require('./handlers/eventHandler.js');

client.config = require('./config.json');
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);

client.login(client.config.token);
