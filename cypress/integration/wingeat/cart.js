//div[@data-cy='cy_cart_shop_panel_0']/preceding-sibling::div[1]
// 장바구니 > 배송지 영역

describe('장바구니내 상품 확인', () => {
    
    it('장바구니 진입', () => {
        cy.visitPage('https://story-cypress.wingeat.com/')
        cy.xpath('//div[@data-pc-fixed-style="floating-nav"]/ul/li[5]/a')
            .then((body) => {
                if (body.hasClass('bottom-nav-login') == true) 
                {
                    cy.login('smjung@wingeat.com', 'tmdah12!@')
                }
            })
        cy.goCart();
    })
    it('카트 정보 불러오기', () => {
        cy.xpath('//div[@data-cy="cy_cart_shop_panel_0"]/div')
            .then((body) => {
                const countCartItmes = body.length
                cy.log(countCartItmes);
            })
        })
        // cy.log(cy.xpath("//div[contains(@class,'app-template__main')]/div/div").length)


        //     cy.get('body').then((body) => {
        //         body.find("//div[contains(@class,'app-template__main')]/div/div")
        //         .then((body) => {
        //             cy.log(body.text())

        //     })
        // })

    })