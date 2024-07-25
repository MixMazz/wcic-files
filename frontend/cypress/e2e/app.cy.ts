
describe('Testing Base App Experience', () => {

  beforeEach(() => {
    const newTime = new Date(2024, 0, 1, 10);
    cy.clock(newTime);
    cy.visit('/');
  })

  it('successfully loads', () => {
    cy.visit('/');
  })

  it('should display the correct initial bugs', () => {
    cy.get('#bugRadio').should('be.checked');
    cy.get('#fishRadio').should('not.be.checked');
    cy.get('#sealifeRadio').should('not.be.checked');

    cy.contains("Common Butterfly");
    cy.contains("Snail");
    cy.contains("Emperor Butterfly").should('not.exist');
    cy.contains("Tarantula").should('not.exist');
  })

  it('should display the correct initial fish', () => {
    cy.get('#fishRadio').parent().click();

    cy.get('#bugRadio').should('not.be.checked');
    cy.get('#fishRadio').should('be.checked');
    cy.get('#sealifeRadio').should('not.be.checked');

    cy.contains("Koi");
    cy.contains("Coelacanth");
    cy.contains("Dace").should('not.exist');
    cy.contains("Barreleye").should('not.exist');
  })

  it('should display the correct initial sealife', () => {
    cy.get('#sealifeRadio').parent().click();

    cy.get('#bugRadio').should('not.be.checked');
    cy.get('#fishRadio').should('not.be.checked');
    cy.get('#sealifeRadio').should('be.checked');

    cy.contains("Seaweed");
    cy.contains("Acorn Barnacle");
    cy.contains("Sea Pig").should('not.exist');
    cy.contains("Abalone").should('not.exist');
  })

  it('should show the correct time', () => {
    cy.get('[data-testid="monthLabelText"]').contains("January");
    cy.get('[data-testid="hourLabelText"]').contains("10");
    cy.get('[data-testid="meridiemLabelText"]').contains("AM");
  })

  it('should handle time manipulation', () => {
    cy.get('[data-testid="monthLabelText"]').as("monthLabelText");
    cy.get('[data-testid="monthBtnDown"]').as("monthBtnDown");

    cy.get('@monthBtnDown').click();
    cy.get('@monthLabelText').contains("February");
    cy.get('[data-testid="monthBtnUp"]').click().click();
    cy.get('@monthLabelText').contains("December");
    cy.get('@monthBtnDown').click();
    cy.get('@monthLabelText').contains("January");

    cy.get('[data-testid="hourLabelText"]').as("hourLabelText");
    cy.get('[data-testid="hourBtnDown"]').as("hourBtnDown");

    cy.get('@hourBtnDown').click();
    cy.get('@hourLabelText').contains("11");
    cy.get('@hourBtnDown').click().click();
    cy.get('@hourLabelText').contains("1");
    cy.get('[data-testid="hourBtnUp"]').click();
    cy.get('@hourLabelText').contains("12");

    cy.get('[data-testid="meridiemBtnDown"]').as("meridiemBtnDown");
    cy.get('[data-testid="meridiemLabelText"]').as("meridiemLabelText");
    cy.get('[data-testid="meridiemBtnUp"]').as("meridiemBtnUp");

    cy.get('@meridiemBtnDown').click();
    cy.get('@meridiemLabelText').contains("PM");
    cy.get('@meridiemBtnDown').click();
    cy.get('@meridiemLabelText').contains("AM");
    cy.get('@meridiemBtnUp').click();
    cy.get('@meridiemLabelText').contains("PM");
    cy.get('@meridiemBtnUp').click();
    cy.get('@meridiemLabelText').contains("AM");
  })

  it('should update critters with hemisphere', () => {
    cy.get('span').contains('Southern').click();

    cy.contains("Tiger Butterfly");
    cy.contains("Great Purple Emperor");
    cy.contains("Damselfly").should('not.exist');
    cy.contains("Mole Cricket").should('not.exist');

    cy.get('span').contains('Northern').click();

    cy.contains("Damselfly");
    cy.contains("Mole Cricket");
    cy.contains("Tiger Butterfly").should('not.exist');
    cy.contains("Great Purple Emperor").should('not.exist');

    cy.get('[data-testid="meridiemBtnDown"]').click();

    cy.contains("Tarantula");
    cy.contains("Common Butterfly").should('not.exist');

    cy.get('#fishRadio').parent().click();

    cy.contains("Barreleye");
    cy.contains("Koi").should('not.exist');

    cy.get('#sealifeRadio').parent().click();

    cy.contains("Sea Pig");
  })

  it('should verify atAnytime override', () => {
    cy.contains("Common Butterfly");
    cy.contains("Cicada Shell").should('not.exist');
    cy.contains("Emperor Butterfly").should('not.exist');

    cy.get('[data-testid="atAnyTimeOverride"]').click();

    cy.contains("Common Butterfly");
    cy.contains("Cicada Shell").should('not.exist');
    cy.contains("Emperor Butterfly");
  })

  it('should toggle prices dynamically', () => {
    cy.get('[data-testid="critterPrice"]').as("critterPrice");

    const numTest = 3;
    const originalPrices = [];
    const adjustedPrices = [];
    
    cy.get('@critterPrice').should('have.length.gte', 3);
    
    for (let i = 0; i < numTest; i++) {
      cy.get('@critterPrice').eq(i).then(($element) => {
        const text = $element.text().trim();
        originalPrices.push(parseInt(text));
      })
    }
    
    cy.get('[data-testid="priceToggle"]').parent().click();
    
    for (let i = 0; i < numTest; i++) {
      cy.get('@critterPrice').eq(i).then(($element) => {
        const text = $element.text().trim();
        adjustedPrices.push(parseInt(text));
      })
    }
    
    for (let i = 0; i < numTest; i++) {
      expect(originalPrices[i]).to.equal(adjustedPrices[i]);
    }
  })
})