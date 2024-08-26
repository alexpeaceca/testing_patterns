
const apiUrl = `${Cypress.env("apiUrl")}/item/`;

describe("API - Items - Story", { tags: ['user-basic', 'api-items-story'] }, function () {

  let userBasic = Cypress.env('USER_BASIC')
  let userBasicPass = Cypress.env('USER_BASIC_PASS')


  context("GET /item", { tags: 'api-items-story-get' }, function () {

    let searchTermNews = 'cats'
    let id


    beforeEach('Sumbit New Story', () => {
      cy.newLogin(userBasic, userBasicPass)
      // Get Testdata from NewsApi
      cy.getNewsApi(searchTermNews).then((response) => {
        return response
      }).then((response) => {
        cy.submitNewStory(response.body.articles[1].title,
          response.body.articles[1].url,
          response.body.articles[1].description)
          return response
      }).then((response) => {
        // Submit New Story
        cy.getItemIdByTitle(response.body.articles[1].title)
      })
      return id
    })

    it.only("GET - Story", function () {
      cy.request("GET", apiUrl + id + '.json').then((response) => {
        expect(response.status).to.eq(200);
        // by {string}
        expect(response.body.by).to.eq(userBasic);
        // descendants {number}
        expect(response.body.descendants).to.eq("1046");
        // id {number}
        expect(response.body.id).to.eq("41342017");
        // kids {Array<number>}
        //expect(response.body.kids).to.eq("41342017");
        // score {number}
        expect(response.body.score).to.eq("41493");
        // text {string}
        //expect(response.body.score).to.eq("41342017");
        // time {number}
        //expect(response.body.time).to.eq("41342017");
        // title {string}
        expect(response.body.title).to.eq("41342017");
        // type {string}
        expect(response.body.type).to.eq("story");
      });
    });
  });
});