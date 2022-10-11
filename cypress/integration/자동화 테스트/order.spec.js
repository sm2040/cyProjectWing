const search_keyword = "랠리"

const paymentIframeBody = () => {
  const iamportIframe = cy.get('.imp-dialog iframe:visible')
    .its('0.contentDocument')
    .should('exist')
    .its('body').should('not.be.undefined')
    .then(cy.wrap);

  return iamportIframe.find('iframe:visible')
    .its('0.contentDocument')
    .should('exist')
    .its('body').should('not.be.undefined')
    .then(cy.wrap);
};


describe ('[조건] 홉페이지 진입 및 로그인', () => {
    it ('윙잇 접속', () => {
        cy.visit('https://develop.wingeat.com/') // URL
        cy.reload()
        // 로그인
        cy.get('.bottom-nav-login').click({force:true}) // 로그인 버튼 선ㅐ
        cy.get('input[name="email"]').type('smjung@wing.com')
        cy.get('input[name="password"]').type('tmdah12!@')
        cy.get('button[type=submit]').contains('로그인').click()
        cy.get('[data-pc-fixed-style="modal-block"]').find('button').eq(0).click() // 모달 닫ㅣ

    })
})

describe('상품 담기', () =>{
    it ('상품 검색', () => {
        cy.get('.bottom-nav-search').click() // 검색지면
        cy.get('input[name=search]').last().clear().type(search_keyword) // 검색어 입력
        cy.get('button[type=button]').contains('검색').click()
    })
    it ('장바구니 담기', () => {
        // 상품카드 내 장바구니 버튼 선택
        cy.get('[data-cy=cy_search_store_result]')
        .find('li')
        .find('[data-cy=cy_item_card_cart_button]')
        .eq(0).click()
        // 옵션 모달에서 옵션 선택
        cy.get('[data-cy=cy_item_option_modal_options]')
        .find('li')
        .find('[data-cy=cy_item_option_modal_stepper_plus_button]')
        .eq(0).click()

        // 장바구니 담기 버튼 선택
        cy.get('[data-cy=cy_item_option_modal_cart_button]').click()
        
        // 팝업에서 '장바구니로 이동' 버튼 선택
        cy.get('[data-pc-fixed-style=modal-block]').contains('장바구니로 이동').click()
        

    })
    it ('주문지면 진입', () => {
        // cy.get('section[role=button]').click()
        cy.log(cy.get('button').contains('원 주문하기').invoke('text'))
        // click()
        cy.wait(2000);

    })
    // it ('[결제수단] 무통장입금', () =>{
    //     cy.wait(6000)
    //     cy.get('.imp-dialog iframe:visible')
    //     paymentIframeBody().find('label[for="chk_all"]').click();
    //     paymentIframeBody().find('#select_bank').select('기업은행');
    //     // 다음
    //     paymentIframeBody().find('#spayNext').click();
    //     cy.wait(2000);
    //     paymentIframeBody().find('label[for="chk_num2"]').click();
    //     // 결제요청
    //     paymentIframeBody().find('#spayNext').click();
    // })
   
    
})

// const paymentIframeBody = () => {
//   const iamportIframe = cy.get('.imp-dialog iframe:visible')
//     .its('0.contentDocument')
//     .should('exist')
//     .its('body').should('not.be.undefined')
//     .then(cy.wrap);

//   return iamportIframe.find('iframe:visible')
//     .its('0.contentDocument')
//     .should('exist')
//     .its('body').should('not.be.undefined')
//     .then(cy.wrap);
// };

//       cy.wait(2000);
//       paymentIframeBody().find('label[for="chk_all"]').click();
//       paymentIframeBody().find('#select_bank').select('기업은행');
//       // 다음
//       paymentIframeBody().find('#spayNext').click();
//       cy.wait(2000);
//       paymentIframeBody().find('label[for="chk_num2"]').click();
//       // 결제요청
//       paymentIframeBody().find('#spayNext').click();
//     });
//   });
// });
