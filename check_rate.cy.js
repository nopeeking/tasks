describe('template spec', () => {
  it('fails when change rate is negative', () => {
    cy.visit('https://spectrocoin.com/en/bitcoin-price-rates.html')
    cy.wait(2000)
    
    cy.get('[class=" css-b62m3t-container"]')
      .should('exist')
      .first()
      .type("Bit{enter}")

    cy.get('.css-1836tev')
      .should('have.text', 'USD')

    cy.get('.css-1836tev')
      .click()
      .get('#react-select-currency-select-option-0')
      .should('have.text', 'EUR')
      .click()

    const headings = ['Bitcoin BTC', 'Price', 'Last 24 hours', 'Last month']

    cy.get(':nth-child(1) > .MobileTable_label__oaB0R').should('have.text', headings[0])
    cy.get(':nth-child(2) > .MobileTable_label__oaB0R').should('have.text', headings[1])
    cy.get(':nth-child(3) > .MobileTable_label__oaB0R').should('have.text', headings[2])
    cy.get(':nth-child(4) > .MobileTable_label__oaB0R').should('have.text', headings[3])

    cy.get('[data-cy="last-24"] > .CurrencyExchangeData_value__4Ghte').should(($change) => {
      const text = $change.text()
      expect(text).to.contain('%')
    })

    cy.get('[data-cy="last-24"] > .CurrencyExchangeData_value__4Ghte').should(($change) => {
      const text = $change.text()
      text.slice(0, -1)
      expect(parseFloat(text)).to.satisfy((num) => num > 0)
    })

  })

})