const { glob } = require("glob")

async function loadFiles(dirname) {

    const files = await glob(`${process.cwd().replace(/\\/g, "/")}/${dirname}/**/*.js`, { ignore: 'node_modules/**' })

    files.forEach(file => delete require.cache[require.resolve(file)]);

    return files
}

module.exports = { loadFiles }