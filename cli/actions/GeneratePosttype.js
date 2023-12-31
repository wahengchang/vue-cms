const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const backToMainMenu = require('../backToMainMenu');

async function copyFiles(src, dest) {
  try {    
    const files = fs.readdirSync(src);

    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      if (fs.statSync(srcPath).isDirectory()) {
        await fs.mkdirSync(destPath);
        await copyFiles(srcPath, destPath);
      }
      else {
        await fs.copyFileSync(srcPath, destPath);
      }
    }

    console.log('Files copied successfully.');
  } catch (err) {
    console.error('Error copying files:', err);
  }
}


function deleteFolderIfExistsSync(folderPath) {
  try {
    // Check if the folder exists
    const folderExists = fs.existsSync(folderPath);

    if (folderExists) {
      // Remove the folder and its contents
      fs.rmdirSync(folderPath, { recursive: true });
      console.log(`Folder '${folderPath}' and its contents deleted.`);
    } else {
      console.log(`Folder '${folderPath}' does not exist.`);
    }
  } catch (err) {
    console.error(`Error deleting folder '${folderPath}':`, err);
  }
}

const generatePostType = async () => {
  const { posttypeName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'posttypeName',
      message: 'Enter the Name of Posttype:'
    }
  ]);

  console.log(`The Post type going to create is "${posttypeName}"`);

  if(!posttypeName) {
    console.log('posttypeName is required, but null')
    return
  }

  const templateFolder = path.resolve(__dirname, '../template')
  const targetDestination = path.resolve(__dirname, './server/routers/')

  console.log('targetDestination: ' , targetDestination)

  // deleteFolderIfExistsSync(targetDestination)
  // await copyFiles(templateFolder, targetDestination);

  await backToMainMenu();
};

module.exports = generatePostType;