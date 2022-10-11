describe('새 탭 관리', () => {
    it('Hi', function () {
        cy.visitPage('https://develop.wingeat.com/')

        cy.get('body').then((body) => {
            if (body.find('div[data-pc-fixed-style="modal-block"]').length > 0) {
                if (cy.contains['카카오 연결하기']) {
                    cy.get('[data-pc-fixed-style="modal-block"]').find('button').eq(0).click()
                }
                else {
                    cy.get('div[data-pc-fixed-style="modal-block"]').contains('괜찮아요').click();

                }
            }
        })

        cy.login('smjung@wing.com', 'tmdah12!@')
        cy.xpath('//a[@data-cy="cy_home_header_cart"]').click()
        cy.get('section[role="button"]').click()


        cy.get('body').then((body) => {
            if (body.find("//div[contains(@class,'app-template__main')]", "제주")==false) {
                cy.log('제주지역 없음')
            }
            else cy.log('제주지역 존재')
        })
        // 배송지 갯수 확인
        // ("//div[contains(@class, 'app-template__main')]/div/div").length


    })
})