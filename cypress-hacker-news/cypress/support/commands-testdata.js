/** 
 * @param {string}  searchTerm Search Term
 * @returns {Object} Response
*/
const newsApiUrl = 'https://newsapi.org/v2/'
const newsApiKey = Cypress.env("NEWSAPI_API_KEY");
Cypress.Commands.add('getNewsApi', (searchTerm) => {
    cy.request("GET", newsApiUrl + 'everything?q=' + searchTerm + '&language=en&apiKey=' + newsApiKey).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('ok');
        return response
    })
});

/** 
 * @param {string}  title Story title
 * @param {string}  url Story url
 * @param {string}  description Story description
*/
Cypress.Commands.add('submitNewStory', (title, url, description) => {
    cy.contains('submit').click().then(() => {
        cy.url().should('include', 'https://news.ycombinator.com/submit')
        //Title
        cy.get(':nth-child(1) > :nth-child(2) > input').click().type(title)
        // Url
        cy.get(':nth-child(2) > :nth-child(2) > input').click().type(url)
        // Description
        cy.get('textarea').click().type(description)
        // Submit Button
        cy.get(':nth-child(5) > :nth-child(2) > input').click()
    })

});