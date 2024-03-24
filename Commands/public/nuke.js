const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nuke")
        .setDescription("Elimina el canal y lo clona para que se eliminen los pings.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption((option) =>
            option
                .setName("canal")
                .setDescription("El canal para bombardear")
                .setRequired(false)
        ),
    async execute(interaction) {
        const channel =
            interaction.options.getChannel("canal") || interaction.channel;

        const message = await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("🤯 Canal Nukeado")
                    .setDescription(`Hey, estas seguro que quieres nukear el canal ${channel}?`)
                    .setColor("Blue"),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel("Si")
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("si")
                        .setEmoji("✔"),
                    new ButtonBuilder()
                        .setLabel("No")
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId("no")
                        .setEmoji("❌")
                ),
            ],
            fetchReply: true,
        });

        const collector = message.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id,
            time: 60000,
            max: 1,
        });

        collector.on("collect", async (i) => {
            collector.stop();
            await i.deferUpdate();
            if (i.customId === "si") {
                channel.clone().then((newChannel) => {
                    channel.delete();
                    newChannel.setPosition(channel.position);
                    newChannel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("🗑️ Canal Nukeado")
                                .setDescription(
                                    `${channel.name} Este canal fue nukeado por ${interaction.user}`
                                )
                                .setColor("Blue"),
                        ],
                    });
                    if (channel.id !== interaction.channelId) {
                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("🗑️ Canal Nukeado")
                                    .setDescription(`${channel.name} ha sido nukeado correctamente`)
                                    .setColor("Blue"),
                            ],
                            components: [],
                        });
                    }
                });
            } else if (i.customId === "no") {
                interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("🗑️ Canal Nukeado")
                            .setDescription(`${channel} Se Detuvo el nuke del canal`)
                            .setColor("Blueed"),
                    ],
                    components: [],
                });
            }
        });
    },
};