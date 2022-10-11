describe ('커뮤니티 스크롤 확인', () =>{
    it('스크롤', () => {
        cy.visit('https://www.wingeat.com/community')
    })

    it('최하단까지 스크롤', () => {
        cy.comm_ex()
        .then(arry => { //[0] : 페이지 수 / [1] : 전체 갯수
            iter = parseInt(arry[0])

            for (var i=0 ; i<arry[0] ; i++)
            {
                // cy.get('.css-1a6ze89').scrollTo('bottom', {duration : 6000})  >> #1 일정시간동안 스크롤 (사용자와 비슷하게 스크롤)
                // .wait(1000)
                cy.get('.css-1a6ze89').scrollTo('0%', '100%')  // #2 최하단으로 스크롤 반복
                .wait(1500)
            }

            cy.request({
                url : 'https://api.wingeat.com/api/community?limit=12&page='+arry[0]

            }).then(resp1 => {
                var test1 = (12*arry[0]) - arry[1]
                cy.log(test1)
                var com_user = resp1.body.result.communityPosts[test1].userName // 마지막 후기의 유저이름 추출
                cy.get('.css-fnibfg').eq(test1).get('.css-1s14kef').contains(com_user.slice(0,-1))
            })

            
        })
    })

    // it('스크롤 다운', () => {
    //     cy.get('.css-1a6ze89').scrollTo('bottom', {duration : 6000})
    //     .wait(2000)

    //     // cy.get('.css-fnibfg').last().get('.css-1s14kef').contains('김보')

    // })
        
})
