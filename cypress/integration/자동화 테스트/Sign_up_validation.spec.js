const rand1 = Math.floor(Math.random() * 99999999)

describe ('[조건] 회원가입 지면 진입', () => {
    it ('윙잇 회원가입 접속', () => {
        cy.visit(`https://dev-service.wingeat.com/account/signup`)
    })
})

describe('#1 유효성 체크 [휴대폰 번호]', () => {
    it('휴대폰 번호 미입력', () =>{
        cy.contains('인증번호 받기').click()
        cy.get('.css-1ocfajw').should('include.text','휴대폰 번호를 입력해주세요.')
        cy.get('.css-gwhcx2').click()

        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text','휴대폰 번호를 입력해주세요.')
        cy.get('.css-gwhcx2').click()
    })

    it ('양식에 맞지 않은 휴대폰 번호 입력', () => {
        cy.get('input[name="phone"]').type('00' + rand1); // 휴대폰 번호 입력
        cy.contains('인증번호 받기').click()
        cy.get('.css-1ocfajw').should('include.text','휴대폰 번호를 다시 확인해 주세요.')
        cy.get('.css-gwhcx2').click()

    })
    
    it ('이미 가입된 번호', () => {
        cy.get('input[name="phone"]').clear().type('01033953496'); // 휴대폰 번호 입력
        cy.contains('인증번호 받기').click()
        cy.get('.css-uv6akj').should('include.text','이미 회원가입된 번호입니다. 이메일 찾기를 이용하시겠습니까?')
        cy.get('.css-1ocfajw')
        .should('include.text','취소')
        .should('include.text','이메일 찾기')
        .contains('취소').click()
    })

    it ('미인증', () => {
            
        // 이메일 입력
        cy.get('input[type="email"]').type('sm'+rand1+'@wingeat.com')
        
        //패스워드 입력
        cy.get('input[name="password"]').type('tmdah12!@')
        cy.get('input[name="checkPassword"]').type('tmdah12!@')

        // 이름 입력
        cy.get('input[name="name"]').type('정승모test')

        // 약관 동의
        cy.get('.css-2qfqtl').contains('전체동의').click()

        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text','휴대폰 인증을 해주세요.')
        cy.get('.css-gwhcx2').click()
      
    })
    it ('올바른 휴대폰 번호 + 인증 완료', ()=> {
        // 휴대폰 번호 입력
        cy.get('input[name="phone"]').clear().type('011'+rand1); // 휴대폰 번호 입력
        cy.contains('인증번호 받기').click()
        cy.get('.css-1wk4bm1').click() // 팝업 닫기
        cy.get('input[name="verificationCode"]').type('000000') // 인증번호 입력
        
        // 인증번호 입력
        cy.get('.css-1c840kx').contains('인증하기').click() // 인증하기
        cy.get('.css-uv6akj').should('be.visible').should('have.text',"인증 완료!")
        cy.get('.css-1wk4bm1').contains('확인').click()
    })
})

describe('유효성 체크 [이메일]', () => {
    it('이미 가입된 이메일', () => {
        cy.get('input[type="email"]').clear().type('smjung@wing.com')
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click().click()
        cy.get('.css-1ocfajw').should('include.text', '이미 회원가입된 이메일입니다. 이메일 찾기를 이용하시겠습니까?')
        .should('include.text', '취소')
        .should('include.text', '이메일 찾기')
        .contains('취소').click()
    })
    it('이메일 미입력', () => {
        cy.get('input[type="email"]').clear()
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '이메일을 입력해주세요.')
        cy.get('.css-gwhcx2').click()
    })
    it('이메일 양식에 맞지 않음', () => {

        cy.get('input[type="email"]').type('sm123@navercom') // .com 생략
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '이메일 형식을 확인해주세요.')
        cy.get('.css-gwhcx2').click()


        cy.get('input[type="email"]').clear().type('sm123naver.com') // @ 생략
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '이메일 형식을 확인해주세요.')
        cy.get('.css-gwhcx2').click()
    })

})

describe('#2 유효성 체크 [패스워드]', () => {
    it ('비밀번호 미입력', () => {
        cy.get('input[name="password"]').clear() 
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '비밀번호를 입력해주세요.')
        cy.get('.css-gwhcx2').click()
    })
    it('비밀번호 양식 에러 (비밀번호 길이)', () => {
        cy.get('input[name="password"]').clear().type('tmdah12')
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '비밀번호는 영문 + 숫자 조합으로 8~20자 이내로 입력해주세요.')
        cy.get('.css-gwhcx2').click()
    })

    it('비밀번호 양식 에러 (영문, 숫자 조합x))', () => {
        cy.get('input[name="password"]').clear().type('tmdahtmdah')
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '비밀번호는 영문 + 숫자 조합으로 8~20자 이내로 입력해주세요.')
        cy.get('.css-gwhcx2').click()
    })  

    it('비밀번호 확인 미입력', ()=> {
        cy.get('input[name="password"]').clear().type('tmdah12!@')
        cy.get('input[name="checkPassword"]').clear()
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '비밀번호 확인을 입력해주세요.')
        cy.get('.css-gwhcx2').click()

    })
    
    it('비밀번호 확인 불일치', ()=> {
        cy.get('input[name="checkPassword"]').clear().type('tmdah12!@#')
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '비밀번호가 일치하지 않습니다.')
        cy.get('.css-gwhcx2').click()

    })

})
describe('#3 유효성 체크 [이름]', () => {
    it('이름 미입력', ()=> {
        cy.get('input[name="name"]').clear()
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '이름을 입력해주세요.')
        cy.get('.css-gwhcx2').click()
    })
    it ('한글, 영문 외 문자 입력 (숫자, 특수문자)', () => {
        cy.get('input[name="name"]').type('승모1')
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '이름은 한글 또는 영문으로만 입력해주세요.')
        cy.get('.css-gwhcx2').click()
    })
    it ('초성만 입력', () => {
        cy.get('input[name="name"]').type('ㅅㅁ')
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '이름에는 초성이 포함될 수 없습니다.')
        cy.get('.css-gwhcx2').click()
    })
    it ('초성, 모음만 입력', () => {
        cy.get('input[name="name"]').type('승모ㅅ')
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '이름에는 초성이 포함될 수 없습니다.')
        cy.get('.css-gwhcx2').click()

        cy.get('input[name="name"]').type('승모ㅡ')
        cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
        cy.get('.css-1ocfajw').should('include.text', '이름에는 모음이 포함될 수 없습니다.')
        cy.get('.css-gwhcx2').click()
    })

})

// describe('회원가입 - 마케팅 동의', () => {
//     it ('휴대폰 번호', () => {
//         cy.get('input[name="phone"]').type('011' + rand1); // 휴대폰 번호 입력
//         cy.contains('인증번호 받기').click() // 인증번호 받기
        
//         // 인증요청 팝업 확인
//         cy.get('.css-1ocfajw').should('include.text','인증 번호를 보냈습니다.')
//         // cy.get('.css-1ocfajw').should('include.text','확인')
//         cy.get('.css-1wk4bm1').click() // 팝업 닫기
//         cy.get('.css-uv6akj').should('not.exist') // 팝업 종료 확인

//         cy.get('input[name="verificationCode"]').type('000000') // 인증번호 입력
//         cy.get('.css-1c840kx').contains('인증하기').click() // 인증하기
//         // 인증완료 팝업 확인
//         cy.get('.css-uv6akj').should('be.visible').should('have.text',"인증 완료!")
//         cy.get('.css-1wk4bm1').contains('확인').click()

//         })
//     it('이메일 입력',() => {
//         cy.get('input[type="email"]').type('sm'+rand1+'@wingeat.com')
//         // .invoke('val')
//         // .then(sometext => cy.log('회원 ID : ' + sometext)) // 입력창 내 값 로그로 출력
//     })
//     it('비밀번호 입력',() => {
//         cy.get('input[name="password"]').type('tmdah12!@')
//         cy.get('input[name="checkPassword"]').type('tmdah12!@')
//     })
//     it('이름 입력', ()=> {
//         cy.get('input[name="name"]').type('정승모test')
//     })
//     it('약관 전체동의', ()=> {
//         cy.get('.css-2qfqtl').contains('전체동의').click()
//     })
//     it('윙잇 가입하기', () => {
//         cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
//     })
//     it('회원가입 완료 확인 (쿠폰함 이동)', ()=> {
//         cy.url().should('eq','https://dev-service.wingeat.com/mypage/coupon')
//         cy.get('.css-qav79l')
//         .contains('[신규 전용 쿠폰]')
//         .contains('3,000원')
//         cy.wait(2000)
//     })
//     it('로그아웃', ()=> {
//         cy.get('.css-10qzv0k').last().click()
//         cy.get('.css-aelt9y').contains('로그아웃').click()
//     })
// })

// describe('회원가입 - 마케팅 비동의', () => {

//     it ('휴대폰 번호', () => {
//         cy.get('input[name="phone"]').clear().type('011' + rand1); // 휴대폰 번호 입력
//         cy.contains('인증번호 받기').click() // 인증번호 받기
//         // 인증요청 팝업 확인
//         cy.get('.css-1ocfajw').should('include.text','인증 번호를 보냈습니다.')
//         // cy.get('.css-1ocfajw').should('include.text','확인')
//         cy.get('.css-1wk4bm1').click() // 팝업 닫기
//         cy.get('.css-uv6akj').should('not.exist') // 팝업 종료 확인
//         cy.get('input[name="verificationCode"]').type('000000') // 인증번호 입력
//         cy.get('.css-1c840kx').contains('인증하기').click() // 인증하기
//         // 인증완료 팝업 확인
//         cy.get('.css-uv6akj').should('be.visible').should('have.text',"인증 완료!")
//         cy.get('.css-1wk4bm1').contains('확인').click()
//         })

//     it('이메일 입력',() => {
//         cy.get('input[type="email"]').type('sm'+rand1+'@wingeat.com')
//         // .invoke('val')
//         // .then(sometext => cy.log('회원 ID : ' + sometext)) // 입력창 내 값 로그로 출력
//     })

//     it('비밀번호 입력',() => {
//         cy.get('input[name="password"]').type('tmdah12!@')
//         cy.get('input[name="checkPassword"]').type('tmdah12!@')
//     })

//     it('이름 입력', ()=> {
//         cy.get('input[name="name"]').type('정승모test')
//     })

//     it ('약관 및 정보사용 동의', () => {
//         cy.contains('서비스 이용약관').click()
//         cy.contains('개인정보 수집/이용약관 동의').click()
//         cy.contains('본인은 만 14세 이상입니다.').click()
//     });

//     it('윙잇 가입하기', () => {
//         cy.get('.css-68ukgv').contains('윙잇 가입하기').click()
//     })

//     it('할인 정보 수신 동의 여부 [미동의]', () => {
//         cy.get('.css-1ocfajw').should('be.visible')
//         .should('include.text','쿠폰 안 받고 가입')
//         .should('include.text','동의하고 가입')
//         .contains('쿠폰 안 받고 가입').click()
//     })

//     it('회원가입 완료 확인 (윙잇홈 이동)', ()=> {
//         cy.url().should('eq','https://dev-service.wingeat.com/')

//     })

//     it('쿠폰 미지급 확인', ()=> {
//         cy.get('.bottom-nav-mypage').click()
//         cy.wait(10000)
//         cy.get('.css-etm5w1').contains('내 쿠폰').click()
//         cy.get('.css-1gk5z3z').should('have.text','사용가능 쿠폰이 없습니다.')
//     })

// })
