const path = require('path');
const fs = require('fs');
const afs = fs.promises;

async function rmdirRecursiveAsync(directory, removeDirectory=true) {
    if (!fs.existsSync(directory))
		return;
	for (let entry of await afs.readdir(directory)) {
		const currentPath = path.join(directory, entry);
		if ((await afs.lstat(currentPath)).isDirectory())
			await rmdirRecursiveAsync(currentPath);
		else await afs.unlink(currentPath);
	}
	if (removeDirectory)
		await afs.rmdir(directory);
}

module.exports = rmdirRecursiveAsync;
