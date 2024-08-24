import { faker } from "@faker-js/faker"


describe('User - Anonymous - Page - News', { tags: ['user-anonymous', 'page-news'] }, () => {

  /**
   * *** Header ***
   */

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

  /**
   * *** Table ***
   */
  it('Table - Result - Title Line - index', { tags: 'page-news-101' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .invoke('index')
      /** Then */
      .then((i) => {
        expect(i).to.eql(0)
      });
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '30.'))
      .parents('tr[class="athing"]')
      .invoke('index')
      /** Then */
      .then((i) => {
        expect(i).to.eql(87)
      })
  })

  it('Table - Result - Title Line - vote arrow - redirect', { tags: 'page-news-102' }, () => {
    /** Given */
    cy.visit('/')
    // Retrive item id
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .invoke('attr', 'id')
      .then((id) => {
        cy.get('tbody')
          .find('span')
          .contains(('span[class="rank"]', '1.'))
          .parents('tr[class="athing"]')
          .find('div[class="votearrow"]')
          /** When */
          .click()
        /** Then */
        cy.url().should('include', 'https://news.ycombinator.com/vote?id=' + id + '&how=up&goto=news')
      })
  })

  it('Table - Result - Title Line - title - redirect', { tags: 'page-news-103' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .find('span[class="titleline"] > a[href]')
      /** Then */
      .should("not.have.attr", "href", "#undefined")
      /** Then */
      .then((link) => {
        cy.request('HEAD', link.prop('href'))
          .its('status')
          .should('eq', 200);
      });

  })

  it('Table - Result - Title Line - site - redirect', { tags: 'page-news-104' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .find('span[class="sitestr"]')
      .click()
      /** Then */
      .then(($span) => {
        const text = $span.text()
        cy.url().should('include', 'https://news.ycombinator.com/from?site=' + text)
      })
  })

  it('Table - Result - Sub-line - score', { tags: 'page-news-105' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    // Retrive item id
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .invoke('attr', 'id')
      /** Then */
      .then((id) => {
        // Find score by item id
        const scoreId = "score_" + id

        cy.get(`[id*=${scoreId}]`).contains(' points')
      })
  })

  it('Table - Result - Sub-line - user - redirect', { tags: 'page-news-106' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    // Retrive item id
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .invoke('attr', 'id')
      /** Then */
      .then((id) => {
        // Find subline using score + item id
        const scoreId = "score_" + id
        cy.get(`[id*=${scoreId}]`)
          //Find parent span
          .parents('span[class="subline"]')
          .find('a[class="hnuser"]')
          .click()
          /** Then */
          .then(($a) => {
            //Store userId
            const userId = $a.text()
            cy.url().should('include', 'https://news.ycombinator.com/user?id=' + userId)
          })
      })
  })


  // it('Table - Result - Sub-line - age', { tags: 'page-news-107' }, () => {})
  // [tech-debt] use library to assert timestamp following hour,hours,day,days pattern


  it('Table - Result - Sub-line - age - redirect', { tags: 'page-news-108' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    // Retrive item id
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .invoke('attr', 'id')
      /** Then */
      .then((id) => {
        // Find subline using score + item id
        const scoreId = "score_" + id
        cy.get(`[id*=${scoreId}]`)
          //Find parent span
          .parents('span[class="subline"]')
          .find('span[class="age"]')
          .click()
        /** Then */
        cy.url().should('include', 'https://news.ycombinator.com/item?id=' + id)
      })
  })

  it('Table - Result - Sub-line - hide - redirect', { tags: 'page-news-109' }, () => {
    /** Given */
    cy.visit('/')
    // Retrive item id
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .invoke('attr', 'id')
      .then((id) => {
        // Find subline using score + item id
        const scoreId = "score_" + id
        cy.get(`[id*=${scoreId}]`)
          //Find parent span
          .parents('span[class="subline"]')
          .find('a')
          .contains('hide')
          /** When */
          .click()
        /** Then */
        cy.url().should('include', 'https://news.ycombinator.com/hide?id=' + id + '&goto=news')
      })
  })

  it('Table - Result - Sub-line - comments', { tags: 'page-news-110' }, () => {
    /** Given */
    cy.visit('/')
    // Retrive item id
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .invoke('attr', 'id')
      .then((id) => {
        // Find subline using score + item id
        const scoreId = "score_" + id
        cy.get(`[id*=${scoreId}]`)
          //Find parent span
          .parents('span[class="subline"]')
          /** When */
          .find('a')
          /** Then */
          .contains(' comments')
          .invoke('attr', 'href')
          .should('include', 'item?id=' + id)
      })
  })

  it('Table - Result - Sub-line - comments - redirect', { tags: 'page-news-111' }, () => {
    /** Given */
    cy.visit('/')
    // Retrive item id
    cy.get('tbody')
      .find('span')
      .contains(('span[class="rank"]', '1.'))
      .parents('tr[class="athing"]')
      .invoke('attr', 'id')
      .then((id) => {
        // Find subline using score + item id
        const scoreId = "score_" + id
        cy.get(`[id*=${scoreId}]`)
          //Find parent span
          .parents('span[class="subline"]')
          .find('a')
          .contains(' comments')
          /** When */
          .click()
        /** Then */
        cy.url().should('include', 'https://news.ycombinator.com/item?id=' + id)
      })
  })

  it('Table - More', { tags: 'page-news-113' }, () => {
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('td[class="title"]')
      .contains(('More'))
      /** When */
      .click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/?p=2')
  })
  /**
   * *** Footer ***
   */
  // it.only('Footer - Announcement', { tags: 'page-news-201' }, () => {}})
  // it.only('Footer - Announcement - redirect', { tags: 'page-news-202' }, () => {})
  // [tech-debt] use API to assert current announcement text + link and expiration date

  it('Footer - Guidlines - redirect', { tags: 'page-news-203' }, () => {
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('span[class="yclinks"]')
      .find('a')
      .contains(('Guidelines'))
      /** When */
      .click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/newsguidelines.html')
  })

  it('Footer - FAQ - redirect', { tags: 'page-news-204' }, () => {
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('span[class="yclinks"]')
      .find('a')
      .contains(('FAQ'))
      /** When */
      .click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/newsfaq.html')
  })

  it('Footer - Lists - redirect', { tags: 'page-news-205' }, () => {
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('span[class="yclinks"]')
      .find('a')
      .contains(('Lists'))
      /** When */
      .click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/lists')
  })

  it('Footer - API - redirect', { tags: 'page-news-206' }, () => {
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('span[class="yclinks"]')
      .find('a')
      .contains(('API'))
      /** When */
      .click()
    /** Then */
    cy.origin('https://github.com', () => {
      cy.url().should('include', 'https://github.com/HackerNews/API')
    })
  })

  it('Footer - Security - redirect', { tags: 'page-news-207' }, () => {
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('span[class="yclinks"]')
      .find('a')
      .contains(('Security'))
      /** When */
      .click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/security.html')
  })

  it('Footer - Legal - redirect', { tags: 'page-news-208' }, () => {
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('span[class="yclinks"]')
      .find('a')
      .contains(('Legal'))
      /** When */
      .click()
    /** Then */
    cy.url().should('include', 'https://www.ycombinator.com/legal')
  })

  it('Footer - Apply to YC - redirect', { tags: 'page-news-209' }, () => {
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('span[class="yclinks"]')
      .find('a')
      .contains(('Apply to YC'))
      /** When */
      .click()
    /** Then */
    cy.url().should('include', 'https://www.ycombinator.com/apply')
  })

  // [tech-debt] capture mailto: address and assert on email
  // it.only('Footer - Contact - redirect', { tags: 'page-news-210' }, () => {})

  it('Footer - Search - input', { tags: 'page-news-211' }, () => {
    let searchTerm = faker.word.words({ count: { min: 1, max: 10 } })
    /** Given */
    cy.visit('/')
    cy.get('tbody')
      .find('form[action="//hn.algolia.com/"]')
      .contains(('Search: '))
      .find('input')
      .type(searchTerm)
      /** When */
      .type('{enter}')
    /** Then */
    cy.origin('https://hn.algolia.com', { args: { searchTerm } } , (searchTerm) => {
      let searchTermUrlEncode = searchTerm.searchTerm.replace(new RegExp(" ", "g"), '+')
      cy.log(searchTerm)
      cy.log(searchTermUrlEncode)
      cy.url().should('include', 'https://hn.algolia.com/?q=' + searchTermUrlEncode)
    })
  })
})

