const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const deleteFilesInFolder = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      } else if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmdirSync(filePath, { recursive: true });
      }
    });
    console.log(`Arquivos deletados da pasta: ${folderPath}`);
  } else {
    console.log(`Pasta não encontrada: ${folderPath}`);
  }
};

const clearFolders = () => {
  const foldersToClear = [
    'cypress/downloads',
    'cypress/videos',
    'cypress/screenshots',
    'cypress/support/logs',
  ];

  foldersToClear.forEach((folder) => {
    const fullPath = path.join(__dirname, folder);
    deleteFilesInFolder(fullPath);
  });
};

const runTests = () => {
  const getTestFiles = (dir) => {
    const fullPath = path.join('cypress/e2e', dir);
    return fs.existsSync(fullPath)
      ? fs
        .readdirSync(fullPath)
        .filter((file) => file.endsWith('.cy.ts'))
        .map((file) => path.join(fullPath, file))
      : [];
  };

  const testDirectories = ['cadastro/localizacoes/cidades/',];

  const testFiles = testDirectories.flatMap(getTestFiles).join(',');

  if (testFiles) {
    try {
      execSync(`npx cypress run --spec "${testFiles}"`, { stdio: 'inherit' });
    } catch (error) {
      console.error('Erro ao executar os testes:', error.message);
    }
  } else {
    console.error('Nenhum arquivo de teste encontrado.');
  }
};

const main = () => {
  const args = process.argv.slice(2);

  if (args.includes('clear')) {
    clearFolders();
  }

  if (args.includes('run')) {
    runTests();
  }

  if (!args.includes('clear') && !args.includes('test')) {
    console.log(
      'Nenhuma funcionalidade especificada. Use "clear" para limpar pastas, "run" para rodar testes ou ambos.'
    );
  }
};

main();
