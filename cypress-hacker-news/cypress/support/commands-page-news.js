/** 
 * @param {string}  itemRank Rank of item to retrieve id.
 * @returns {string} item id
 */
Cypress.Commands.add('getItemIdByRank', (itemRank) => {
    let id
    cy.get('tbody')
        .find('span')
        .contains(('span[class="rank"]', itemRank))
        .parents('tr[class="athing"]')
        .invoke('attr', 'id')
        .then((id) => {
            return id
        })
    return id
});

/** 
* @param {string}  id id of Item
*/
Cypress.Commands.add('findSubline', (id) => {
    // Find subline using score + item id
    const scoreId = "score_" + id
    cy.get(`[id*=${scoreId}]`)
        //Find parent span
        .parents('span[class="subline"]')
});


