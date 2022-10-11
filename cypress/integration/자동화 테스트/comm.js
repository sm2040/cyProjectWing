describe ('커뮤니티', () => {
  const userIds = ['sm45040296@wingeat.com',
  // 'sm50594903@wingeat.com',
  // 'sm96113974@wingeat.com',
  // 'sm79728464@wingeat.com',
  // 'sm50279370@wingeat.com',
  // 'sm75848227@wingeat.com',
  // 'sm76147562@wingeat.com',
  // 'sm4652222@wingeat.com',
  'sm79127123@wingeat.com']
  

  const favorite = () => {
    for (var i in userIds)
    {
      cy.visitPage('https://mvp-release.wingeat.com/community/stories/6311ca2c58b054ab98bf6696')
      if (cy.url() === "https://mvp-release.wingeat.com/community-landing")
      {
        cy.contains('바로 시작하기').click()
      }
      cy.visitPage('https://mvp-release.wingeat.com/community/stories/6311ca2c58b054ab98bf6696')
      cy.xpath('//section[@class="css-khxwmf"]/div[4]/button').click()
      cy.login(userIds[i], 'tmdah12!@')
      cy.xpath('//section[@class="css-khxwmf"]/div[4]/button').click()
      cy.logout()
    }
  }



  it('로그인', ()=> {
    favorite()
  })
  // it ('좋아요 선택', () => {
  //   cy.get('.bottom-nav-community').click()
  //   cy.contains('바로 시작하기').click()
  //   cy.get('.css-oeon6u').eq(1).click()
  // })
  // it('로그아웃', () => {
  //   cy.logout()
  // })



})