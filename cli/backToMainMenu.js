const inquirer = require('inquirer');

const backToMainMenu = async () => {
  const { back } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'back',
      message: 'Back to main menu?'
    }
  ]);

  if (!back) {
    process.exit()
  } 
};

module.exports = backToMainMenu;