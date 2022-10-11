//div[@data-cy='cy_cart_shop_panel_0']/preceding-sibling::div[1]
// 장바구니 > 배송지 영역

describe('장바구니내 상품 확인', () => {
  it('로그인 > 장바구니', () => {
    cy.visitPage('https://develop.wingeat.com/');
    cy.xpath('//div[@data-pc-fixed-style="floating-nav"]/ul/li[5]/a').then(
      body => {
        if (body.hasClass('bottom-nav-login') == true) {
          cy.login('smjung@wingeat.com', 'tmdah12!@');
        }
      }
    );
    cy.goCart();
  });

  it('async await 확인', () => {
    const itemId = cy
      .xpath('//div[@data-cy="cy_cart_shop_panel_0"]/div')
      .then(item => {
        const wrapItemId = cy.wrap(item)
        .log('item : ' + item);
        cy.log('wrapItem' + wrapItemId)
      });
  });
});
