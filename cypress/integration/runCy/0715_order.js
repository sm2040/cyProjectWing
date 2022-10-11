describe('hi', () => {
  it('hihi', () => {

    cy.visit('https://develop.wingeat.com')
    // cy.log(cy.getCookies().invoke('connect.sid'))
    cy.wrap(cy.getCookies())
    .its('connect.sid')
    .then((connect) => {
      cy.log(connect)
    })
  
  })
  
})