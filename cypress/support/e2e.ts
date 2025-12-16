import './commands';

import errorMessages from '../fixtures/errors/errorMessages.json';
import errorCypress from '../fixtures/errors/errorCypress.json';

Cypress.on('fail', (error, runnable) => {
  const errorMap = new Map([
    [new RegExp(errorCypress.elementNotFound, 'i'), errorMessages.elementNotFound],
    [new RegExp(errorCypress.expectedNotExist, 'i'), errorMessages.expectedNotExist],
    [new RegExp(errorCypress.expectedNotToBeEmpty, 'i'), errorMessages.expectedNotToBeEmpty],
    [new RegExp(errorCypress.noAliasFound, 'i'), errorMessages.noAliasFound],
    [new RegExp(errorCypress.fileNotFound, 'i'), errorMessages.fileNotFound],
    [new RegExp(errorCypress.invalidCharacter, 'i'), errorMessages.invalidCharacter],
    [new RegExp(errorCypress.expectedNotToBeVisible, 'i'), errorMessages.expectedNotToBeVisible],
    [new RegExp(errorCypress.noClickableElement, 'i'), errorMessages.noClickableElement],
    [new RegExp(errorCypress.nullTyped, 'i'), errorMessages.nullTyped],
    [new RegExp(errorCypress.responseTimeout, 'i'), errorMessages.responseTimeout],
    [new RegExp(errorCypress.clickOnSingleElement, 'i'), errorMessages.clickOnSingleElement],
    [new RegExp(`${errorCypress.unexpectedURL[0]}.*${errorCypress.unexpectedURL[1]}`, 'i'), errorMessages.unexpectedURL],
    [new RegExp(errorCypress.noRequestFound, 'i'), errorMessages.noRequestFound],
  ]);

  let customMessage = errorMessages.genericError;

  for (const [regex, message] of errorMap) {
    if (regex.test(error.message)) {
      customMessage = message;
      break;
    }
  }

  const errorData = {
    errorMessage: customMessage,
    originalMessage: error.message,
    testLocation: runnable.title,
    relativePath: Cypress.spec.relative,
    lineNumber: error.stack?.match(/:(\d+):\d+/)?.[1] || '',
    stackTrace: error.stack || '',
  };

  cy.task('logErrorToFile', errorData);

  throw error;
});
