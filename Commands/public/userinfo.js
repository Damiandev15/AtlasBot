const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user-info")
        .setDescription("📊 - Te muestra las estadísticas de un usuario.")
        .addUserOption((option) =>
            option
                .setName(`usuario`)
                .setDescription(`👤 - Elige al usuario para ver sus estadísticas.`)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser(`usuario`) || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const banner = await (
            await client.users.fetch(user.id, { force: true })
        ).bannerURL({ size: 4096 });
        const embed = new EmbedBuilder()
            .setTitle("📊 - Información del usuario.")
            .setDescription(
                "Estas son todas las estadísticas del usuario que puedes consultar:"
            )
            .setColor("Random")
            .setAuthor({
                name: `${user.username}`,
                iconURL: `${user.displayAvatarURL({
                    dynamic: true,
                    size: 1024,
                })}`,
            })
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setImage(user.bannerURL({ size: 512 }))
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
                        `📃 - Usuario: ${user.username}`,
                        `📜 - Nombre: ${user.globalName}`,
                        `🆔 - ID del usuario: \`(${user.id})\``,
                        `📅 - Fecha de creación: <t:${parseInt(
                            user.createdTimestamp / 1000
                        )}:R>`,
                        `🎁 - Boost: ${member.premiumSince ? `Si` : `No`}`,
                    ].join("\n"),
                },
                {
                    name: "Servidor:",
                    value: [
                        `📃 - Fecha de ingreso al servidor: <t:${parseInt(
                            member.joinedAt / 1000
                        )}:R>`,
                        `🔨 - Roles: \n${member.roles.cache
                            .map((role) => role.toString())
                            .join(", ")}`,
                    ].join("\n"),
                },
                {
                    name: "Banner:",
                    value: user.bannerURL() ? "** **" : "El usuario no tiene banner.",
                }
            );
        await interaction.reply({
            embeds: [embed],
        });
    },
};
