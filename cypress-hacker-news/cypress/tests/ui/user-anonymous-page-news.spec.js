describe('User - Anonymous - Page - News', { tags: ['user-anonymous', 'page-news'] }, () => {

  it('Header - Icon - redirect', { tags: 'page-news-001' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.get('a > img').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/')
  })

  it('Header - Name - redirect', { tags: 'page-news-002' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('Hacker News').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/news')
  })

  it('Header - New - redirect', { tags: 'page-news-003' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('new').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/newest')
  })

  it('Header - Past - redirect', { tags: 'page-news-004' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('past').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/front')
  })

  it('Header - Comments - redirect', { tags: 'page-news-005' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('comments').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/newcomments')
  })

  it('Header - Ask - redirect', { tags: 'page-news-006' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('ask').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/ask')
  })

  it('Header - Show - redirect', { tags: 'page-news-007' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('show').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/show')
  })

  it('Header - Jobs - redirect', { tags: 'page-news-008' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('jobs').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/jobs')
  })

  it('Header - Submit - redirect', { tags: 'page-news-009' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('submit').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/submit')
  })

  it('Header - Login - redirect', { tags: 'page-news-010' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('login').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/login?goto=news')
  })

})
