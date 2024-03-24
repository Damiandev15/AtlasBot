require("colors");

async function loadEvents(client) {
    const { loadFiles } = require("../Functions/fileLoader.js");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Events", "Status");

    await client.events.clear();

    try {
        const Files = await loadFiles("Events");
        Files.forEach((file) => {
            const event = require(file);

            const execute = (...args) => event.execute(...args, client);
            client.events.set(event.name, execute);

            if (event.rest) {
                if (event.once) client.rest.on(event.name, execute);
                else client.rest.on(event.name, execute);
            } else {
                if (event.once) client.once(event.name, execute);
                else client.on(event.name, execute);
            }

            table.addRow(event.name, "🟩 Loaded");
        });

        console.log(table.toString(), `\nLoaded Events.`.yellow);
    } catch (err) {
        console.error("Error loading event files:", err);
    }
}

module.exports = { loadEvents };
