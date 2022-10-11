describe('새 탭 관리', () => {
    it('Hi', function () {
        cy.visitPage('https://develop.wingeat.com/')       
        cy.login('smjung@wing.com', 'tmdah12!@')
        cy.searchItems('qa')
        cy.addCart(3)
        cy.wait(1000)

        cy.get('button').contains('원 주문하기')
        .invoke('text')
        .then((text1)=> {
            const text2 = text1.split(' ')
            cy.log(text2[1].slice(0,-1))
        })




    })
})