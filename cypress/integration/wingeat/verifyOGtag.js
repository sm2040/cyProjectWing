
describe('OG tag 확인', () => {
    // URL 인코딩
    const encdURI = (url) => {
        const api_url = 'https://www.opengraph.xyz/api/metadata/' + encodeURIComponent(url)
        return api_url;
    }

    it('상품 - OG tag 확인', function() {
        cy.log (this.user.itemsURL)
        // OG 태그 확인용 API 호출
        cy.request({
            method: 'GET',
            url: encdURI(this.user.itemsURL),
            headers: {
                "referer": "https://www.opengraph.xyz/"
            }
        // 응답값에서 body.metadata.image 필드 값 확인
        }).then((response) => {
            const image1 = response.body.metadata.ogImage
            cy.log(expect(image1).not.to.be.empty)
            expect(image1).not.to.be.empty
        })

    })

    it('이벤트 - OG tag 확인', function() {
        // OG 태그 확인용 API 호출
        cy.request({
            method: 'GET',
            url: encdURI(this.user.eventURL),
            headers: {
                "referer": "https://www.opengraph.xyz/"
            }
        // 응답값에서 body.metadata.image 필드 값 확인
        }).then((response) => {
            const image1 = response.body.metadata.ogImage
            cy.log(expect(image1).not.to.be.empty)
            expect(image1).not.to.be.empty
        })

    })
})