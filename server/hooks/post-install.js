const { spawnSync } = require("child_process");
const path = require("path");

async function ensureSqliteBinaryFile() {
    const cwd = path.join(process.env.BLOCKLET_APP_DIR, "node_modules/@louislam/sqlite3");
    spawnSync("npm", [ "install", "node-pre-gyp-github" ], { cwd,
        stdio: "inherit",
        shell: true });
    spawnSync("npm", [ "run", "install" ], { cwd,
        stdio: "inherit",
        shell: true });
}

(async () => {
    try {
        await ensureSqliteBinaryFile();
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
})();
