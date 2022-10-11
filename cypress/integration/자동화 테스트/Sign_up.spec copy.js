let rand1 = Math.floor(Math.random() * 99999999)


describe ('[조건] 회원가입 지면 진입', () => {
    it('[공통] 회원가입 유도 모달 종료', () => {
        // cy.get('.css-16y4dyp).contains('가입하고 쿠폰 받기').click() // 회원가입 유도 모달로 회원 가입
        cy.visit('/')
        // cy.get('.signup-counter-nudge-modal').should('be.visible')
        cy.reload()
        cy.wait(1000)
        // cy.get('.signup-counter-nudge-modal').should('not.exist')
    })    
})

describe('[#1] 회원가입 - 마케팅 동의', () => {

    it('하단 내비 (로그인) 선택', () => {
        cy.get('.bottom-nav-login').click({force : true})
    })
    it('회원가입 버튼 선택', () => {
        cy.get('.app-template__main').contains('회원가입').click()
    })

    it ('휴대폰 번호', () => {
        cy.get('input[name="phone"]').clear().type('011' + rand1); // 휴대폰 번호 입력
        cy.contains('인증번호 받기').click() // 인증번호 받기
        // 인증요청 팝업 확인
        cy.get('[data-pc-fixed-style="modal-block"]').should('include.text','인증 번호를 보냈습니다.')
        cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click() // 팝업 닫기
        cy.get('input[name="verificationCode"]').type('000000') // 인증번호 입력
        cy.get('button').contains('인증하기').click() // 인증하기
        // 인증완료 팝업 확인
        cy.get('[data-pc-fixed-style="modal-block"]').should('be.visible').should('include.text',"인증 완료!")
        cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click() 
    })
    it('이메일 입력',() => {
        cy.get('input[type="email"]').type('sm'+rand1+'@wingeat.com')
        // .invoke('val')
        // .then(sometext => cy.log('회원 ID : ' + sometext)) // 입력창 내 값 로그로 출력
    })

    it('비밀번호 입력',() => {
        cy.get('input[name="password"]').type('tmdah12!@')
        cy.get('input[name="checkPassword"]').type('tmdah12!@')
    })

    it('이름 입력', ()=> {
        cy.get('input[name="name"]').type('정승모test')
    })

    it ('약관 및 정보사용 동의', () => {
        cy.contains('전체동의').click()
    });

    it('윙잇 가입하기', () => {
        cy.get('button[type=submit').contains('윙잇 가입하기').click()
    })

    it('회원가입 완료 확인 (쿠폰함 이동)', ()=> {
        cy.url().should('contain','/mypage/coupon')
        cy.contains('[신규 전용 쿠폰]')
        .contains('3,000원')
    })

    it('회원탈퇴', () => {
        cy.wait(1000)
        cy.get('a[href="/mypage"]').contains('마이윙잇').click()  // 마이윙잇
        cy.get('a[href="/mypage/profile"').contains('내 정보 관리').click()
        cy.get('a[href="/mypage/profile/quit').contains('회원 탈퇴').click() // 회원탈퇴 버튼 선택
        cy.get('.app-template__main').contains('내가 찾는 상품이 없어요.').click()
        cy.get('input[type="password"]').type('tmdah12!@')
        cy.get('.app-template__main').contains('탈퇴하기').click()
        cy.get('[data-pc-fixed-style="modal-block"').contains('확인').click()
        cy.get('[data-pc-fixed-style="modal-block"').contains('확인').click()
    })
})

describe('[#2] 회원가입 - 마케팅 비동의 > 동의', () => {

    it('하단 내비 (로그인) 선택', () => {
        cy.get('.bottom-nav-login').click({force : true})
    })
    it('회원가입 버튼 선택', () => {
        cy.get('.app-template__main').contains('회원가입').click()
    })

    it ('휴대폰 번호', () => {
        cy.get('input[name="phone"]').clear().type('011' + rand1); // 휴대폰 번호 입력
        cy.contains('인증번호 받기').click() // 인증번호 받기
        // 인증요청 팝업 확인
        cy.get('[data-pc-fixed-style="modal-block"]').should('include.text','인증 번호를 보냈습니다.')
        cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click() // 팝업 닫기
        cy.get('input[name="verificationCode"]').type('000000') // 인증번호 입력
        cy.get('button').contains('인증하기').click() // 인증하기
        // 인증완료 팝업 확인
        cy.get('[data-pc-fixed-style="modal-block"]').should('be.visible').should('include.text',"인증 완료!")
        cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click() 
    })
    it('이메일 입력',() => {
        cy.get('input[type="email"]').type('sm'+rand1+'@wingeat.com')
    })

    it('비밀번호 입력',() => {
        cy.get('input[name="password"]').type('tmdah12!@')
        cy.get('input[name="checkPassword"]').type('tmdah12!@')
    })

    it('이름 입력', ()=> {
        cy.get('input[name="name"]').type('정승모test')
    })

    it ('약관 및 정보사용 동의', () => {
        cy.contains('서비스 이용약관').click()
        cy.contains('개인정보 수집/이용약관 동의').click()
        cy.contains('본인은 만 14세 이상입니다.').click()
    });

    it('윙잇 가입하기', () => {
        cy.get('button[type=submit').contains('윙잇 가입하기').click()
    })

    it('할인 정보 수신 동의 여부 [미동의]', () => {
        cy.get('[data-pc-fixed-style="modal-block"]').should('be.visible')
        .should('include.text','쿠폰 안 받고 가입')
        .should('include.text','동의하고 가입')
        .contains('동의하고 가입').click()

    })

    it('회원가입 완료 확인 (쿠폰함 이동)', ()=> {
        cy.url().should('contain','/mypage/coupon')
        cy.contains('[신규 전용 쿠폰]')
        .contains('3,000원')
    })

    it('회원탈퇴', () => {
        cy.wait(1000)
        cy.get('a[href="/mypage"]').contains('마이윙잇').click()  // 마이윙잇
        cy.get('a[href="/mypage/profile"').contains('내 정보 관리').click()
        cy.get('a[href="/mypage/profile/quit').contains('회원 탈퇴').click() // 회원탈퇴 버튼 선택
        cy.get('.app-template__main').contains('내가 찾는 상품이 없어요.').click()
        cy.get('input[type="password"]').type('tmdah12!@')
        cy.get('.app-template__main').contains('탈퇴하기').click()
        cy.get('[data-pc-fixed-style="modal-block"').contains('확인').click()
        cy.get('[data-pc-fixed-style="modal-block"').contains('확인').click()

    })
})


describe('[#3] 회원가입 - 마케팅 비동의', () => {
 
    it('하단 내비 (로그인) 선택', () => {
        cy.get('.bottom-nav-login').click({force : true})
    })
    it('회원가입 버튼 선택', () => {
        cy.get('.app-template__main').contains('회원가입').click()
    })

    it ('휴대폰 번호', () => {
        cy.get('input[name="phone"]').clear().type('011' + rand1); // 휴대폰 번호 입력
        cy.contains('인증번호 받기').click() // 인증번호 받기
        // 인증요청 팝업 확인
        cy.get('[data-pc-fixed-style="modal-block"]').should('include.text','인증 번호를 보냈습니다.')
        cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click() // 팝업 닫기
        cy.get('input[name="verificationCode"]').type('000000') // 인증번호 입력
        cy.get('button').contains('인증하기').click() // 인증하기
        // 인증완료 팝업 확인
        cy.get('[data-pc-fixed-style="modal-block"]').should('be.visible').should('include.text',"인증 완료!")
        cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click() 
    })
    it('이메일 입력',() => {
        cy.get('input[type="email"]').type('sm'+rand1+'@wingeat.com')

    })

    it('비밀번호 입력',() => {
        cy.get('input[name="password"]').type('tmdah12!@')
        cy.get('input[name="checkPassword"]').type('tmdah12!@')
    })

    it('이름 입력', ()=> {
        cy.get('input[name="name"]').type('정승모test')
    })

    it ('약관 및 정보사용 동의', () => {
        cy.contains('서비스 이용약관').click()
        cy.contains('개인정보 수집/이용약관 동의').click()
        cy.contains('본인은 만 14세 이상입니다.').click()
    });

    it('윙잇 가입하기', () => {
        cy.get('button[type=submit').contains('윙잇 가입하기').click()
    })

    it('할인 정보 수신 동의 여부 [미동의]', () => {
        cy.get('[data-pc-fixed-style="modal-block"]').should('be.visible')
        .should('include.text','쿠폰 안 받고 가입')
        .should('include.text','동의하고 가입')
        .contains('쿠폰 안 받고 가입').click()
    })

    it('회원가입 완료 확인 (홈 이동)', ()=> {
        cy.url().should('eq','https://dev-service.wingeat.com/')
        cy.reload()
    })

    it('회원탈퇴', () => {
        cy.wait(1000)
        cy.get('a[href="/mypage"]').contains('마이윙잇').click()  // 마이윙잇
        cy.get('a[href="/mypage/profile"').contains('내 정보 관리').click()
        cy.get('a[href="/mypage/profile/quit').contains('회원 탈퇴').click() // 회원탈퇴 버튼 선택
        cy.get('.app-template__main').contains('내가 찾는 상품이 없어요.').click()
        cy.get('input[type="password"]').type('tmdah12!@')
        cy.get('.app-template__main').contains('탈퇴하기').click()
        cy.get('[data-pc-fixed-style="modal-block"').contains('확인').click()
        cy.get('[data-pc-fixed-style="modal-block"').contains('확인').click()
    })
})
