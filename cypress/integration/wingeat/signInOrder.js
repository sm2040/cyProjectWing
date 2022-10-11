describe ('회원 주문 테스트 (가상결제)', () => {
    it('URL 진입', function () {
        cy.visitPage(this.user.visitURL)
    })
    it ('로그인', function () {
        cy.login(this.user.id, this.user.pwd)
    })
    it ('상품 검색', () => {
        cy.searchItems('qa')
    })
    it ('검색된 상품 장바구니 담기', () => {
        cy.addCart(2)
    })
    it ('주문_가상결제', () => {
        cy.orderVirtualBank()
    })

})