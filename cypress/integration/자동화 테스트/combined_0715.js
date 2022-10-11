// optionNum [0, 1, 3]

// let rand1 = Math.floor(Math.random() * 7)
// let rand2 = Math.floor(Math.random() * 7)

const shp = {

    FF : 0,
    CF : 1,
    CC : 2,
    CB : 3,
    RF : 4,
    RC : 5,
    RR : 6,
    RB : 7

}


const selectOptions = (optionNums = []) => {

  // 검색어로 검색
  cy.get('input[name=search').clear().type('2온도{enter}')
  
  // 상품카드의 장바구니 버튼 선택
  cy.get('[data-cy=cy_search_store_result]')
  .find('li')
  .find('[data-cy=cy_item_card_cart_button]')
  .eq(0).click()
  
  // 옵션 모달에서 특정 옵션 선택
  for (const optionNum of optionNums) {
    cy.get('[data-cy=cy_item_option_modal_options]')
      .find('li')
      .find('[data-cy=cy_item_option_modal_stepper_plus_button]')
      .eq(optionNum).click()
  }
  // 장바구니 담기 버튼 선택
  cy.get('[data-cy=cy_item_option_modal_cart_button]').click()
  
  // 팝업에서 '장바구니로 이동' 버튼 선택
  cy.get('[data-pc-fixed-style=modal-block').contains('장바구니로 이동').click()

  cy.contains('원 주문하기').click()
  cy.wait(2000);
  cy.contains('전액 사용').click()
  cy.contains('결제하기').click()
  cy.wait(5000)
}


  describe ('[조건] 홉페이지 진입 및 로그인', () => {
      it ('윙잇 접속', () => {
          cy.visit('https://develop.wingeat.com/') // URL
          cy.reload()
      })
      it('하단 내비 (로그인) 선택', () => {
          cy.get('.bottom-nav-login').click({force:true})
      })
      it ('로그인', () => {
        cy.get('input[name="email"]').type('sm_test@wingeat.com')
        cy.get('input[name="password"]').type('tmdah12!@')
        cy.get('button[type=submit]').contains('로그인').click()
        cy.get('[data-pc-fixed-style="modal-block"]').find('button').eq(0).click()
    })
  })


  describe('상품 주문', () =>{
    it ('주문', ()=> {
      selectOptions([shp.FF, shp.RC, shp.RB]);
    })
    it ('주문', ()=> {
      selectOptions([shp.RC, shp.CB, shp.CF, shp.RF, shp.FF]);
    })
    it ('주문', ()=> {
      selectOptions([shp.RC, shp.RB, shp.RF]);
    })
    it ('주문', ()=> {
      selectOptions([shp.FF, shp.RC, shp.RB]);
    })
    it ('주문', ()=> {
      selectOptions([shp.RC, shp.CB, shp.RB]);
    })
    it ('주문', ()=> {
      selectOptions([shp.RC, shp.RB, shp.RF]);
    })
    it ('주문', ()=> {
      selectOptions([shp.FF, shp.CB, shp.RB, shp.RF]);
    })
    it ('주문', ()=> {
      selectOptions([shp.FF, shp.CF, shp.RB, shp.CB, shp.RF]);
    })
    it ('주문', ()=> {
      selectOptions([shp.FF, shp.RB, shp.CB, shp.RF]);
    })
    it ('주문', ()=> {
      selectOptions([shp.FF, shp.RB, shp.RF]);
    })
    it ('주문', ()=> {
      selectOptions([shp.RB, shp.CB]);
    })




    // it ('상품 검색', () => {
    //   cy.get('[data-cy=cy_home_header_search').click()
    //   cy.get('[data-cy=cy_search_top_header_input').clear().type('2온도{enter}')
    
    // })

    // it ('장바구니 담기 버튼 선택', () => {
    //   cy.get('[data-cy=cy_search_store_result]')
    //   .find('li')
    //   .find('[data-cy=cy_item_card_cart_button]')
    //   .eq(0).click()
    // })

    // it ('옵션 모달에서 수량 선택 후 장바구니 담기', () => {
    //   selectOptions([0, 1, 3]);
    // })

    // it ('주문지면 진입', () => {
    //     // cy.get('.css-1yjhjv9').click()
    //     cy.contains('원 주문하기').click()
    //     console.log('point')
    //     cy.contains('전액 사용').click()
    //     cy.contains('결제하기').click()
    // })
  })
  