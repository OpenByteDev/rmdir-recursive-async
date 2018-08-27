const path = require('path');
const fs = require('fs');
const afs = fs.promises;

async function deleteFolderRecursive(directory, removeDirectory=true) {
    if (!fs.existsSync(directory))
		return;
	for (let entry of await afs.readdir(directory)) {
		const currentPath = path.join(directory, entry);
		if ((await afs.lstat(currentPath)).isDirectory())
			await deleteFolderRecursive(currentPath);
		else await afs.unlink(currentPath);
	}
	if (removeDirectory)
		await afs.rmdir(directory);
}

module.exports = deleteFolderRecursive;
