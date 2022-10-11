describe("hi", () => {
  it('hi', () => {
    cy.visit('https://develop.wingeat.com')
    cy.get('body').then((body) => {
      cy.log(body)
      cy.log(typeof (body))
    })

  })
})