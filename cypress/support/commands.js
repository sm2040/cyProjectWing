// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// Cypress.Commands.add('loginWingeat', (username, password) => {
// 	cy.get('#user_login').type(username)
// 	cy.get('#user_password').type(password)
// 	cy.get('#user_remember_me').click()
// 	cy.contains('Sign in').click()
// })

Cypress.Commands.add('visitPage', (url) => {
	cy.visit(url)
	cy.closeModal()
	cy.wait(500)
})


// 회원가입
Cypress.Commands.add('signUp', () => {

	let rand1 = Math.floor(Math.random() * 99999999)

	cy.get('.bottom-nav-login').click({ force: true })
	cy.get('.app-template__main').contains('회원가입').click()
	cy.get('input[name="phone"]').clear().type('011' + rand1); // 휴대폰 번호 입력
	cy.contains('인증번호 받기').click() // 인증번호 받기
	// 인증요청 팝업 확인
	cy.get('[data-pc-fixed-style="modal-block"]').should('include.text', '인증 번호를 보냈습니다.')
	cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click() // 팝업 닫기
	cy.get('input[name="verificationCode"]').type('000000') // 인증번호 입력
	cy.get('button').contains('인증하기').click() // 인증하기
	// 인증완료 팝업 확인
	cy.get('[data-pc-fixed-style="modal-block"]').should('be.visible').should('include.text', "인증 완료!")
	cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click()
	cy.get('input[type="email"]').type('sm' + rand1 + '@wingeat.com')

	cy.get('input[name="password"]').type('tmdah12!@')
	cy.get('input[name="checkPassword"]').type('tmdah12!@')

	cy.get('input[name="name"]').type('정승모test')

	// cy.get('input[name="inviteCode"]').type('9436783018')

	cy.contains('전체동의').click()

	cy.get('button[type=submit').contains('윙잇 가입하기').click()

})

// 주문(무통장 입금)
Cypress.Commands.add('addCart', (quantity) => {
	cy.get('[data-cy=cy_search_store_result]')
		.find('li')
		.find('[data-cy=cy_item_card_cart_button]')
		.eq(0).click() // 상품카드내 장바구니 버튼 선택

	cy.get('[data-cy=cy_item_option_modal_options]')
		.find('li')
		.find('input[type="number"]')
		.eq(0).type(6)
	// 모달에서 수량 증가
	cy.get('[data-cy=cy_item_option_modal_cart_button]').click() // 장바구니 담기 버튼
	cy.get('[data-pc-fixed-style=modal-block').contains('장바구니로 이동').click() // 장바구니 이동

})

Cypress.Commands.add('searchItems', (keyword) => {
	cy.get('input[name="search"]').type(keyword + '{enter}') // 검색어 입력
})

Cypress.Commands.add('orderVirtualBank', () => {

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

	cy.contains('원 주문하기').click()

	cy.get('body').then((body) => {
		if (body.find("div[data-pc-fixed-style='modal-block']").length > 0) {
			cy.contains('그냥 주문하기').click()
		}
	})

	cy.wait(2000)
	cy.contains('일반 결제').click()
	cy.contains('무통장 입금')
	.should('not.be.disabled')
	cy.contains('무통장 입금').click()
	cy.contains('결제하기').click()
	cy.get('[data-pc-fixed-style="modal-block"]').contains('확인').click()
	cy.wait(6000)
	// cy.get('.imp-frame.imp-frame-pc.imp-frame-default.imp-frame-kcp').its('0.contentWindow.body').should('exist')
	cy.get('.imp-dialog iframe:visible')
	paymentIframeBody().find('label[for="chk_all"]').click();
	paymentIframeBody().find('#select_bank').select('기업은행');
	// 다음
	paymentIframeBody().find('#spayNext').click();
	cy.wait(2000);
	paymentIframeBody().find('label[for="chk_num2"]').click();
	// 결제요청
	paymentIframeBody().find('#spayNext').click();

})

Cypress.Commands.add('login', (userId, userPass) => {
	// 로그인 내비 선택
	cy.get('.bottom-nav-login').click({ force: true })

	// 아이디값이 남아있는 경우 로그인하려는 계정과 비교
	cy.get('input[type="email"]')
		.invoke('val')
		.then((val1) => {
			// 저장된 아이디 = 로그인하려는 아이디 일떄는 비밀번호만 입력
			if (val1 == userId) {
				cy.get('input[type=password').type('tmdah12!@')
			}
			// 저장된 아이디 != 로그인 아이디 인 경우 아이디, 비밀번호 모두 입력
			else {
				cy.get('input[type="email"]').clear().type(userId)
				cy.get('input[type=password').type(userPass)

			}
		})
	cy.get('button[type=submit]').contains('로그인').click()
	cy.wait(1500)
	cy.closeModal()


})

Cypress.Commands.add('closeModal', () => {
	cy.get('body').then((body) => {
		const modal = body.find('div[data-pc-fixed-style="modal-block"]');
		if (modal.length > 0) {
			cy.get(modal).then((text) => {
				if (modal.length > 0 && text.text().includes('괜')) {
					cy.get(modal).contains('괜').click();
				}
				else {
					cy.log('bye')
					cy.get(modal).find('button').eq(0).click()
				}

			})
		}

	})
})

Cypress.Commands.add('goCart', () => {
	cy.get('a[data-cy="cy_home_header_cart').click()
})

Cypress.Commands.add('logout', () => {
	cy.get('.bottom-nav-mypage').click({force : true});
	cy.wait(1000)
	cy.get('h3').contains('로그아웃').click({force : true});
})