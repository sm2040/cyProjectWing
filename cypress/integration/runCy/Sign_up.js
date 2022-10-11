
let signUserId;
let signPass;
let testArr2=[{}];

const signUp1 = () => {
    let rand1 = Math.floor(Math.random() * 99999999);
    signUserId = 'sm' + rand1 + '@wingeat.com';
    signPass = 'tmdah12!@';
    cy.get('.bottom-nav-login').click({ force: true });
    cy.get('.app-template__main')
      .contains('회원가입')
      .click();
    cy.get('input[name="phone"]')
      .clear()
      .type('011' + rand1); // 휴대폰 번호 입력
    cy.contains('인증번호 받기').click(); // 인증번호 받기
    // 인증요청 팝업 확인
    cy.get('[data-pc-fixed-style="modal-block"]').should(
      'include.text',
      '인증 번호를 보냈습니다.'
    );
    cy.get('[data-pc-fixed-style="modal-block"]')
      .contains('확인')
      .click(); // 팝업 닫기
    cy.get('input[name="verificationCode"]').type('000000'); // 인증번호 입력
    cy.get('button')
      .contains('인증하기')
      .click(); // 인증하기
    // 인증완료 팝업 확인
    cy.get('[data-pc-fixed-style="modal-block"]')
      .should('be.visible')
      .should('include.text', '인증 완료!');
    cy.get('[data-pc-fixed-style="modal-block"]')
      .contains('확인')
      .click();
    cy.get('input[type="email"]').type(signUserId);

    cy.get('input[name="password"]').type(signPass);
    cy.get('input[name="checkPassword"]').type('tmdah12!@');

    cy.get('input[name="name"]').type('정승모test');

    // cy.get('input[name="inviteCode"]').type('9436783018')

    cy.contains('전체동의').click();

    cy.get('button[type=submit')
      .contains('윙잇 가입하기')
      .click();
    testArr2.push({
        userName : signUserId,
        userPass : signPass
    })
    cy.logout()

}


describe('[조건] 회원가입 지면 진입', () => {
    
    
    it('json 작성', () => {
      cy.visit('https://develop.wingeat.com')
        signUp1();
        
        signUp1();

          cy.writeFile('test0902.json', testArr2);
        });


    })

//   it('회원가입', () => {


//   });
// });
