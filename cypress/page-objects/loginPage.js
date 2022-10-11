const inputId = 'input[type="email"]'
const inputPass = 'input[type=password'
const btnLogin = cy.get('button[type=submit]').contains('로그인')
const btnSignUp = cy.get('button[type=submit]').contains('회원가입')



export default class loginPage {

    static gotoLoginPage (){
        cy.get('.bottom-nav-login').click({force:true})
    }
    static fillId (id){
        inputId.type(id)
    }
    static fillPass (pass){
        inputPass.type(pass)
    }
    static login () {
        btnLogin.click();
    }
        
}