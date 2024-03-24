const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    ChannelType,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server-info")
        .setDescription("📊 - Te muestra las estadísticas del servidor."),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { members, memberCount } = interaction.guild;
        const botCount = members.cache.filter((member) => member.user.bot).size;
        const getChannelTypeSize = (type) =>
            interaction.guild.channels.cache.filter((channel) =>
                type.includes(channel.type)
            ).size;
        const embed = new EmbedBuilder()
            .setTitle("📊 - Información del servidor.")
            .setDescription(
                "Estas son todas las estadísticas del servidor que puedes consultar:"
            )
            .setColor("Aqua")
            .setThumbnail(interaction.guild.iconURL())
            .setImage(interaction.guild.bannerURL({ size: 1024 }))
            .setAuthor({
                name: `${interaction.guild.name}`,
                iconURL:
                    interaction.guild.iconURL({ dynamic: true, size: 1024 }) ||
                    "https://cdn.discordapp.com/attachments/1053464482095050803/1053464952607875072/PRywUXcqg0v5DD6s7C3LyQ.png",
            })
            .setTimestamp()
            .setFooter({
                text: `${interaction.user.username}`,
                iconURL:
                    interaction.user.displayAvatarURL({ dynamic: true }) ||
                    "https://cdn.discordapp.com/attachments/1053464482095050803/1053464952607875072/PRywUXcqg0v5DD6s7C3LyQ.png",
            })
            .addFields(
                {
                    name: "General:",
                    value: [
                        `📃 - Nombre del servidor: ${interaction.guild.name}`,
                        `👑 - Owner: ${await interaction.guild.fetchOwner()}`,
                        `🆔 - ID del servidor: \`(${interaction.guild.id})\``,
                        `📅 - Fecha de creación: <t:${parseInt(
                            interaction.guild.createdTimestamp / 1000
                        )}:R>`,
                        `🔗 - URL Personalizada: ${interaction.guild.vanityURLCode || "No disponible."
                        }`,
                    ].join("\n"),
                },
                {
                    name: "Usuarios:",
                    value: [
                        `👥 - Miembros: ${members.cache.filter((m) => !m.user.bot).size}`,
                        `🤖 - Bots: ${botCount}`,
                        `🎲 - Total: ${memberCount}`,
                    ].join("\n"),
                },
                {
                    name: "Canales:",
                    value: [
                        `💬 - Texto: ${getChannelTypeSize([
                            ChannelType.GuildText,
                            ChannelType.GuildNews,
                        ])}`,
                        `🎙 - Voz: ${getChannelTypeSize([
                            ChannelType.GuildVoice,
                            ChannelType.GuildStageVoice,
                        ])}`,
                        `📝 - Foros: ${getChannelTypeSize([ChannelType.GuildForum])}`,
                        `🧵 - Hilos: ${getChannelTypeSize([
                            ChannelType.GuildPublicThread,
                            ChannelType.GuildPrivateThread,
                            ChannelType.GuildNewsThread,
                        ])}`,
                        `📕 - Categoria: ${getChannelTypeSize([
                            ChannelType.GuildCategory,
                        ])}`,
                        `📻 - Escenarios: ${getChannelTypeSize([
                            ChannelType.GuildStageVoice,
                        ])}`,
                    ].join("\n"),
                },
                {
                    name: "Otros:",
                    value: [
                        `🔨 - Roles: ${interaction.guild.roles.cache.size}`,
                        `😀 - Emojis: ${interaction.guild.emojis.cache.size}`,
                        `🔰 - Nivel de mejoras: ${interaction.guild.premiumTier}`,
                        `🔮 - Boosts: ${interaction.guild.premiumSubscriptionCount.toString()}`,
                    ].join("\n"),
                },
                {
                    name: "Banner:",
                    value: interaction.guild.bannerURL()
                        ? "** **"
                        : "El server no tiene banner.",
                }
            );
        interaction.reply({
            embeds: [embed],
        });
    },
};
