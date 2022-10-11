describe('Post TEsts', function() {
  it('Data layer Loaded1', function() {
    cy.visit('https://story-expand-fresh.wingeat.com/');
    cy.get('.css-1ax9c3m').click();
    cy.get('.css-1dibcr5')
      .contains('진지')
      .click();
    cy.window().then(win => {
      const res1 = win.dataLayer.findIndex(a => a.event === 'gtm.load');
      assert.isTrue(res1 >= 0, 'gtm.load값 확인');
    });
  });
  it('Data layer Loaded1', function() {
    cy.window().then(win => {
      const res2 = win.dataLayer.findIndex(a => a.event === 'clickItemCard');
      assert.isTrue(res2 >= 0, 'clickItemCard 이벤트 확인');
    });
  });
  it('Data layer Loaded1', function() {
    cy.window().then(win => {
      const res3 = win.dataLayer.findIndex(
        a => a.event === 'clickHomeItemCard'
      );
      assert.isTrue(res3 >= 0, 'clickHomeItemCard 이벤트 확인');
    });
  });
});

// const res = win.dataLayer.filter(a => a.event.includes('gtm.load'))
// expect(res1).to.be.greaterThan(-1)
// expect(res2).to.be.greaterThan(-1)
// expect(res3).to.be.greaterThan(-1)

// cy.log(res2)
// for (var i = 0; i < win.dataLayer.length; i++) {
//     cy.log(win.dataLayer[i])
// }
