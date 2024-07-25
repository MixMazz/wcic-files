import { User } from '../../src/models/user';

const sampleUser: User = {
  _id: '',
  name: 'Tom',
  email: '',
  password: '',
  bug: '00000000000010000000000000000000000010000000001000000000000000000000000000000000',
  fish: '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
  sealife: '1111111111111111111111111111111111111111',
  createdAt: '',
  updatedAt: '',
};

describe('Testing User Home', () => {
  beforeEach(() => {
    const newTime = new Date(2024, 0, 1, 10);
    cy.clock(newTime);
    cy.visit('/');
  })

  it('successfully loads', () => {
    cy.visit('/');
  })

  it('should hide critters the user has already collected', () => {
    cy.intercept('/api/users', sampleUser);

    cy.contains("Common Butterfly");
    cy.contains("Moth").should('not.exist');

    let numBugsAvailable = 0;
    let numBugsRemaining = 0;

    Promise.all([
      cy.get('tr').then(rows => {
        numBugsAvailable = rows.length;
      }),
      cy.get('[data-testid="showMissingToggle"]').parent().click(),
      cy.get('tr').then(rows => {
        numBugsRemaining = rows.length;
      }),
    ]).then(() => {
      expect(numBugsRemaining).to.be.eql(numBugsAvailable - 2);
    })

    cy.get('[data-testid="showMissingToggle"]').parent().click(),
    cy.get('#sealifeRadio').parent().click();

    Promise.all([
      cy.get('tr').then(rows => {
        expect(rows.length).to.be.gt(0);
      }),
      cy.get('[data-testid="showMissingToggle"]').parent().click(),
      cy.get('tr').should('not.exist')
    ]).then(() => {
      cy.contains("You caught all available creatures!");
    })
  })


  it('logs in', () => {
    cy.visit('/');
    cy.intercept('/api/users/login', sampleUser);

    cy.get('.loginText').click();

    cy.get('input[id="email"]').type("placeholder@gmail")
    cy.get('input[id="password"]').type("placeholder")

    cy.get('button').contains("Log In").click();
    
    cy.get('button').contains("My Account").click();

    cy.contains(`Welcome, ${sampleUser.name}!`)
  })

  it('logs out', () => {
    cy.intercept('/api/users', sampleUser);
    cy.get('button').contains('My Account');
    cy.get('.logoutText').click();
    cy.get('button').contains('My Account').should('not.exist');
    cy.get('button').contains("Sign Up");
  })
})