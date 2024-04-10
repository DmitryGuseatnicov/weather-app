import { userRepository } from '@/mocks/handlers/user';
import { weatherTypeRepository } from '@/mocks/handlers/weather';

import { CreateWeatherModal } from './CreateWeatherModal';

it('Should be work validation', () => {
  const userOptions = Array.from(
    userRepository.values()).map((item) => ({ id: item.id, label: `${item.name} ${item.surname}` }),
);
  const weatherOptions = Array.from(weatherTypeRepository.values());

  cy.mount(
    <CreateWeatherModal
      formData={{}}
      visible
      onHide={() => undefined}
      userOptions={userOptions}
      weatherTypeOptions={weatherOptions}
    />,
  );

  cy.get('[data-cy-input-number] input').type('80');
  cy.get('form').submit();
  cy.get('[data-cy-input-number] [data-cy-error-label]').should('be.visible');

  cy.get('[data-cy-ui-dropdown] .p-dropdown').each((item) => {
    item.click();
    cy.get('.p-dropdown-item').then((option) => option.click());
  });
  cy.get('[data-cy-input-number] input').clear().type('40');
  cy.get('[data-cy-input-number] [data-cy-error-label]').should('not.exist');
});

it('Should be call callback after success', () => {
  const userOptions = Array.from(
    userRepository.values()).map((item) => ({ id: item.id, label: `${item.name} ${item.surname}` }),
);
  const weatherOptions = Array.from(weatherTypeRepository.values());

  cy.intercept('POST', '/weather-note', {
    statusCode: 201,
    body: userRepository.get(1),
  });
  const fn = cy.spy().as('onHideSpy');

  cy.mount(
    <CreateWeatherModal
      formData={{}}
      visible
      onHide={fn}
      userOptions={userOptions}
      weatherTypeOptions={weatherOptions}
    />,
  );

  cy.get('[data-cy-ui-dropdown] .p-dropdown').each((item) => {
    item.click();
    cy.get('.p-dropdown-item').then((option) => option.click());
  });
  cy.get('[data-cy-input-number] input').clear().type('40');
  cy.get('form').submit();

  cy.get('@onHideSpy').should('be.called');
});
