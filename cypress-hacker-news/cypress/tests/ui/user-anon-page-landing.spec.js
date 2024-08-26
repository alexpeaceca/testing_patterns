import { faker } from "@faker-js/faker"


describe('User - Anonymous - Page - Landing', { tags: ['user-anon', 'page-landing'] }, () => {

  /**
   * *** Header ***
   */

  it('Header - Icon - redirect', { tags: 'page-landing-001' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.get('a > img').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/')
  })

  it('Header - Name - redirect', { tags: 'page-landing-002' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('Hacker News').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/news')
  })

  it('Header - New - redirect', { tags: 'page-landing-003' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('new').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/newest')
  })

  it('Header - Past - redirect', { tags: 'page-landing-004' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('past').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/front')
  })

  it('Header - Comments - redirect', { tags: 'page-landing-005' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('comments').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/newcomments')
  })

  it('Header - Ask - redirect', { tags: 'page-landing-006' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('ask').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/ask')
  })

  it('Header - Show - redirect', { tags: 'page-landing-007' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('show').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/show')
  })

  it('Header - Jobs - redirect', { tags: 'page-landing-008' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('jobs').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/jobs')
  })

  it('Header - Submit - redirect', { tags: 'page-landing-009' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.contains('submit').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/submit')
  })

  it('Header - Login - redirect', { tags: 'page-landing-010' }, () => {
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
  it('Table - Result - Title Line - index', { tags: 'page-landing-101' }, () => {
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

  it('Table - Result - Title Line - vote arrow - redirect', { tags: 'page-landing-102' }, () => {
    /** Given */
    cy.visit('/')
    cy.getItemIdByRank('1.')
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

  it('Table - Result - Title Line - title - redirect', { tags: 'page-landing-103' }, () => {
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

  it('Table - Result - Title Line - site - redirect', { tags: 'page-landing-104' }, () => {
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

  it('Table - Result - Sub-line - score', { tags: 'page-landing-105' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.getItemIdByRank('1.')
      /** Then */
      .then((id) => {
        // Find score by item id
        const scoreId = "score_" + id
        cy.get(`[id*=${scoreId}]`).contains(' points')
      })
  })

  it('Table - Result - Sub-line - user - redirect', { tags: 'page-landing-106' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.getItemIdByRank('1.')
      /** Then */
      .then((id) => {
        cy.findSubline(id)
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


  // it('Table - Result - Sub-line - age', { tags: 'page-landing-107' }, () => {})
  // [tech-debt] use library to assert timestamp following hour,hours,day,days pattern


  it('Table - Result - Sub-line - age - redirect', { tags: 'page-landing-108' }, () => {
    /** Given */
    cy.visit('/')
    /** When */
    cy.getItemIdByRank('1.')
      /** Then */
      .then((id) => {
        cy.findSubline(id)
          .find('span[class="age"]')
          .click()
        /** Then */
        cy.url().should('include', 'https://news.ycombinator.com/item?id=' + id)
      })
  })

  it('Table - Result - Sub-line - hide - redirect', { tags: 'page-landing-109' }, () => {
    /** Given */
    cy.visit('/')
    cy.getItemIdByRank('1.')
      .then((id) => {
        cy.findSubline(id)
          .find('a')
          .contains('hide')
          /** When */
          .click()
        /** Then */
        cy.url().should('include', 'https://news.ycombinator.com/hide?id=' + id + '&goto=news')
      })
  })

  it('Table - Result - Sub-line - comments', { tags: 'page-landing-110' }, () => {
    /** Given */
    cy.visit('/')
    cy.getItemIdByRank('1.')
      .then((id) => {
        cy.findSubline(id)
          /** When */
          .find('a')
          /** Then */
          .contains(' comments')
          .invoke('attr', 'href')
          .should('include', 'item?id=' + id)
      })
  })

  it('Table - Result - Sub-line - comments - redirect', { tags: 'page-landing-111' }, () => {
    /** Given */
    cy.visit('/')
    cy.getItemIdByRank('1.')
      .then((id) => {
        cy.findSubline(id)
          .find('a')
          .contains(' comments')
          /** When */
          .click()
        /** Then */
        cy.url().should('include', 'https://news.ycombinator.com/item?id=' + id)
      })
  })

  it('Table - More', { tags: 'page-landing-113' }, () => {
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
  // it('Footer - Announcement', { tags: 'page-landing-201' }, () => {}})
  // it('Footer - Announcement - redirect', { tags: 'page-landing-202' }, () => {})
  // [tech-debt] use API to assert current announcement text + link and expiration date

  it('Footer - Guidlines - redirect', { tags: 'page-landing-203' }, () => {
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

  it('Footer - FAQ - redirect', { tags: 'page-landing-204' }, () => {
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

  it('Footer - Lists - redirect', { tags: 'page-landing-205' }, () => {
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

  it('Footer - API - redirect', { tags: 'page-landing-206' }, () => {
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

  it('Footer - Security - redirect', { tags: 'page-landing-207' }, () => {
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

  it('Footer - Legal - redirect', { tags: 'page-landing-208' }, () => {
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

  it('Footer - Apply to YC - redirect', { tags: 'page-landing-209' }, () => {
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
  // it('Footer - Contact - redirect', { tags: 'page-landing-210' }, () => {})

  it('Footer - Search - input', { tags: 'page-landing-211' }, () => {
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

