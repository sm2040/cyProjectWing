
const verifyICcode = () => {
    let rand2 = Math.floor(Math.random() * 999999999)
    let inviteUrl = 'https://story-app.wingeat.com/account/signup?ic=' + rand2
    cy.visit(inviteUrl);
    // cy.get("input[id='inviteCode']").type(rand2)
    cy.wait(500)
    cy.get("input[id='inviteCode']").should('have.value', rand2.toString())

}



describe('추천인 코드 확인', () => {
    for (var i = 0; i < 50; i++) {

        it(i + 1 + '회차 확인', function () {
            verifyICcode()


        })
    }

})
