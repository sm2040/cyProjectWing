it ('윙잇 회원가입 접속', () => {
    cy.visit(`/`)
})
it('[공통] 회원가입 유도 모달 종료', () => {
    cy.visit('/')
    cy.reload()
})    
it('하단 내비 (로그인) 선택', () => {
    cy.get('.bottom-nav-login').click({force:true})
})

describe('[#4] 로그인 테스트', () =>{
  it('로그인 확인', ()=> {
      cy.get('input[name="email"]').type('smjung@wing.com')
      cy.get('input[name="password"]').type('tmdah12!@')
      cy.get('button[type=submit').contains('로그인').click()
})
  })

  it('장바구니 이동', () => {
      cy.get('.css-1yjhjv9').click()
  })
  
      it('로그아웃', () => {
      cy.get('a[href="/mypage"]').contains('마이윙잇').click()  // 마이윙잇
      cy.get('.css-aelt9y').contains('로그아웃').click()

      cy.get('a[href="/mypage"]').should('not.exist')
      cy.get('a[href="/account/signin"]').should('exist')


  })

