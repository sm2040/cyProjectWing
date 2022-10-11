//div[@data-cy='cy_cart_shop_panel_0']/preceding-sibling::div[1]
// 장바구니 > 배송지 영역

describe('장바구니내 상품 확인', () => {
  it('로그인 > 장바구니', () => {
    cy.visitPage('https://develop.wingeat.com/');
    ///ul/li[5]/a
    cy.xpath('//div[@data-pc-fixed-style="floating-nav"]/ul/li[5]/a').then(
      body => {
        if (body.hasClass('bottom-nav-login') == true) {
          cy.login('smjung@wingeat.com', 'tmdah12!@');
        }
      }
    );
    // cy.searchItems("새벽배송테스트");
    // cy.addCart(2);
    // cy.get('.css-1tmokf5').click(
    // cy.xpath("//div[contains(@class,'app-template__main')]/div/div[2]/div/div[2]").then((body) => {
    // // cy.xpath("//div[contains(@class,'app-template__main')]/div/div[3]/div/div[3]").contains('수정').click()
    // if (body.text().includes('서울') === false)
    // {
    // cy.xpath("//div[contains(@class,'app-template__main')]/div/div[3]/div/div[3]").contains('선택').click()
    // }
    // })

    cy.goCart();
    // 샵 정보
    cy.xpath("//div[@data-cy='cy_cart_shop_panel_0']/div/div/a").then(body => {
      cy.log(body.text());
    });
    cy.xpath(
      "//div[@data-cy='cy_cart_shop_panel_0']/div[2]//button[@data-cy='cy_item_option_modal_stepper_plus_button']"
    ).click();

    cy.xpath(
      "//div[@data-cy='cy_cart_shop_panel_0']/div[2]//input[@inputmode='numeric']"
    ).then(body => {
      var Qval = body.attr('value');
      cy.log(Qval);
    });

    // 상품명, 옵션 정보 확인 (eq:0 - 상품명 / eq:1 - 옵션명)
    // cy.xpath("//div[@data-cy='cy_cart_shop_panel_0']/div[2]/div/div[1]").then((body)=>{
    // const name = body.eq(1)
    // cy.log(cy.xpath(body))
    // })
  });

  // it('장바구니 체크박스 선택', async () => {
  // const itemId = await cy.xpath('//div[@data-cy="cy_cart_shop_panel_0"]/div');
  // cy.wrap(itemId)
  // .eq(2)
  // .find('input[type="checkbox"]')
  // .uncheck({ force: true });

  // cy.log(itemId.length);
  // });
  // it('async await 확인', async () => {
  // const itemId = await cy.xpath('//div[@data-cy="cy_cart_shop_panel_0"]/div');

  // cy.log(itemId.length);
  // cy.wait(2000)
  // cy.xpath("//section[@role='button']").click()
  // // cy.xpath('//div[@class="app-template__main css-cssveg"]/section/section[1]').click()
  // });

  // it('카트 정보 불러오기', () => {
  // cy.xpath('//div[@data-cy="cy_cart_shop_panel_0"]/div').then(body => {
  // const countCartItmes = body.length;
  // cy.log(countCartItmes);
  // // 체크박스 선택
  // cy.wrap(body)
  // .eq(2)
  // .find('input[type="checkbox"]')
  // .check({ force: true });
  // });
  // cy.xpath('//div[@data-cy="cy_cart_shop_panel_0"]/div').then(body => {
  // // 가격 정보 불러오기
  // cy.wrap(body)
  // .eq(2)
  // .find('input[type="checkbox"]')
  // .check({ force: true });
  // });
  // });
  // cy.log(cy.xpath("//div[contains(@class,'app-template__main')]/div/div").length)

  // cy.get('body').then((body) => {
  // body.find("//div[contains(@class,'app-template__main')]/div/div")
  // .then((body) => {
  // cy.log(body.text())

  // })
  // })
});

/*
  
  * 배송지 선택
  주소지 : "//div[contains(@class,'app-template__main')]/div/div[2]/div/div[2]"
  [수정] : ("//div[contains(@class,'app-template__main')]/div/div[2]/div/div[3]").contains('수정').click()
  [선택] : "//div[contains(@class,'app-template__main')]/div/div[2]/div/div[3]"
  
  * 구매불가 상품 갯수 확인 : "//div[contains(text(),'구매 불가 상품')]/following-sibling::div".length
  상품명 : //div[@data-cy='cy_cart_shop_panel_0']/div[{2}]//p[1]
  옵션명 : //div[@data-cy='cy_cart_shop_panel_0']/div[{2}]//p[2]
  가격 : //div[@data-cy='cy_cart_shop_panel_0']/div[{2}]/div//span
  수량 : //div[@data-cy='cy_cart_shop_panel_0']/div[2]//input[@inputmode='numeric']
  업체명 :
  cy.xpath("//div[@data-cy='cy_cart_shop_panel_0']/div/div/a").then((body) => {
  cy.log(body.text())
  })
  });
  */
