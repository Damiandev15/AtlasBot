const { loadCommands } = require("../../Handlers/commandHandler");
const { ActivityType, ActionRow, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "ready",
    once: true,
    async execute(client, member, interaction) {

        const canal = client.channels.cache.get('1220928243314720788')

        const embed = new EmbedBuilder()
            .setTitle(`**Atlas Tech Activity**`)
            .setDescription(`✅ Estoy Online\n\n`)
            .addFields(
                { name: "\`💵\` Servidores", value: `${client.guilds.cache.size}`, inline: false },
            )
            .setColor(`#2b2d31`);

        const decoration = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId('dcorarionready')
                    .setDisabled(true)
                    .setLabel(`DevGuild: Atlas Tech`)
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('dcorarionready1')
                    .setDisabled(true)
                    .setLabel(`${client.user.tag}`)
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('dcorarionready2')
                    .setDisabled(true)
                    .setLabel(`Developer: damiandev`)
                    .setStyle(ButtonStyle.Secondary),

            )

        canal.send({ embeds: [embed], components: [decoration] })
        loadCommands(client);
        console.log(`✅ El bot esta ON en: ${client.user.tag}.`.red);


        client.user.setPresence({
            activities: [{
                name: `@damianpy15`,
                type: ActivityType.Streaming,
                url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g'
            }
            ],
        });

    },
};