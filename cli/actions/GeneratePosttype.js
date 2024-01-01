const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const backToMainMenu = require('../backToMainMenu');

function replacePatternsInFiles(folderPath, replacements) {
  try {
    // Read the contents of the folder
    const files = fs.readdirSync(folderPath);

    // Iterate through files and subdirectories
    for (const file of files) {
      const filePath = path.join(folderPath, file);

      // Check if it's a directory
      if (fs.statSync(filePath).isDirectory()) {
        // Recursively process subdirectory
        replacePatternsInFiles(filePath, replacements);
      } else {
        // Process file content
        replacePatternsInFile(filePath, replacements);
      }
    }

    console.log(`Patterns replaced successfully in folder: ${folderPath}`);
  } catch (err) {
    console.error(`Error replacing patterns in folder: ${folderPath}`, err);
  }
}

function replacePatternsInFile(filePath, replacements) {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace patterns with corresponding variables
    for (const [pattern, variable] of Object.entries(replacements)) {
      const regex = new RegExp(pattern, 'g');
      content = content.replace(regex, variable);
    }

    // Write the modified content back to the file
    fs.writeFileSync(filePath, content, 'utf-8');
  } catch (err) {
    console.error(`Error replacing patterns in file: ${filePath}`, err);
  }
}


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

  // server model
  const templateServerFolder = path.resolve(__dirname, '../template/Posttype')
  const targetServerDestination = path.resolve(__dirname, `../../server/routers/posttype/${posttypeName}`)
  fs.mkdirSync(targetServerDestination);
  await copyFiles(templateServerFolder, targetServerDestination);
  console.log('Files copied server successfully.');
  replacePatternsInFiles(targetServerDestination, {
    '%POSTYPE_NAME%': posttypeName,
  });
  console.log('%POSTYPE_NAME% replace server successfully.');

  // client model
  const templateFolder = path.resolve(__dirname, '../template/VueClient')
  const targetDestination = path.resolve(__dirname, `../../client/src/views/Posttype/${posttypeName}`)
  fs.mkdirSync(targetDestination);
  await copyFiles(templateFolder, targetDestination);
  console.log('Files copied client successfully.');
  replacePatternsInFiles(targetDestination, {
    '%POSTYPE_NAME%': posttypeName,
  });
  console.log('%POSTYPE_NAME% replace client successfully.');

  await backToMainMenu();
};

module.exports = generatePostType;