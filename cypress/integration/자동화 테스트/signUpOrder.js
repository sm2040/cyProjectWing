describe('윙잇 홈페이지 진입', () => {
  it('페이지 진입', () => {
    cy.visitPage('https://develop.wingeat.com/');
  });
  it('회원가입', () => {
    cy.login('smjung@wingeat.com', 'tmdah12!@');
  });
  it('상품 ', () => {
    cy.searchItems('qa', 2);
  });
  it('주문 & 결제', () => {
    cy.orderVirtualBank();
  });
});
