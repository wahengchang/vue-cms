const inquirer = require('inquirer');

const mainMenu = async (options) => {
  const { menuOption } = await inquirer.prompt([
    {
      type: 'list',
      name: 'menuOption',
      message: 'Menu:',
      choices: options.map(option => option.name)
    }
  ]);

  const selectedOption = options.find(option => option.name === menuOption);

  if (selectedOption && selectedOption.value) {
    await selectedOption.value();
  } else {
    console.log('Goodbye!');
    return;
  }

  mainMenu(options);
};

module.exports = mainMenu;