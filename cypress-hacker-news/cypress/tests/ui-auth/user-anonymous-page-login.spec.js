import { faker } from "@faker-js/faker"

describe('User - Anonymous - Page - Login', { tags: ['user-anonymous', '@page-login'] }, () => {

  let userBasic = Cypress.env('USER_BASIC')
  let userBasicPass = Cypress.env('USER_BASIC_PASS')

  let userNewValid = 'chn-' + faker.string.nanoid(11)
  let passNewValid = faker.internet.password({ length: 10 })

  let userNewInvalid = faker.string.symbol({ min: 2, max: 15 })
  let passNewInvalid = faker.internet.password({ length: 7 })

  /**
   *  *** Section - Login ***
   */

  it('Login - Username - input - is only input - invalid', { tags: '@page-login-001' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    cy.get(':nth-child(4) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    cy.get(':nth-child(4) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Bad login.')
  })

  it('Login - Username - input - empty - invalid', { tags: '@page-login-002' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    cy.get(':nth-child(4) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    cy.get(':nth-child(4) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Bad login.')
  })

  //it('Login - Username - input - empty - Recaptcha', { tags: '@page-login-003' }, () => {})
  // [tech-debt] validate recaptcha displays 

  it('Login - Username - input - cleared - invalid', { tags: '@page-login-004' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Valid Pass
    cy.get(':nth-child(4) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    // Input Vaild Username
    cy.get(':nth-child(4) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    // Clear Username
    cy.get(':nth-child(4) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .clear()
    cy.get(':nth-child(4) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Bad login.')
  })

  it('User - Anonymous - Page - Login', { tags: '@page-login-005' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Vaild Username
    cy.get(':nth-child(4) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    // Input Valid Pass
    cy.get(':nth-child(4) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    // Clear Pass
    cy.get(':nth-child(4) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .clear()
    cy.get(':nth-child(4) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Bad login.')
  })

  it('Login - Button - inputs are empty', { tags: '@page-login-006' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    cy.get(':nth-child(4) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Bad login.')
  })

  it('Login - Button - inputs are invalid', { tags: '@page-login-007' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Invaild Username
    cy.get(':nth-child(4) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewInvalid)
    // Input Invalid Pass
    cy.get(':nth-child(4) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewInvalid)
    cy.get(':nth-child(4) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Bad login.')
  })

  it('Login - Button - valid', { tags: '@page-login-008' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Username - User Basic
    cy.get(':nth-child(4) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(`${userBasic}`)
    // Input Pass - User Basic Pass
    cy.get(':nth-child(4) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(`${userBasicPass}`)
    cy.get(':nth-child(4) > [type="submit"]').click()
    /** Then */
    cy.url().should('include', 'https://news.ycombinator.com/')
    cy.get('#me').contains(userBasic)
    /** Then - Validate Cookie */
    cy.getCookies()
      .should('have.length', 1)
      .then((cookies) => {
        expect(cookies[0]).to.have.property('name', 'user')
        expect(cookies[0]).to.have.property('value')
        expect(cookies[0]).to.have.property('domain')
        expect(cookies[0]).to.have.property('httpOnly')
        expect(cookies[0]).to.have.property('path')
        expect(cookies[0]).to.have.property('secure')
      })

    /** Clean up */
    cy.get('#logout').click()
    cy.contains('login').click()
    cy.url().should('include', 'https://news.ycombinator.com/login?goto=news')
  })

  it('Login - Forgot Password', { tags: '@page-login-009' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    cy.contains('Forgot your password?').click()
    /** Then */
    cy.get('body').contains('Reset your password')
  })

  /**
   * *** Section - Create Account ***
   */

  it('Create Account - Username - input - is only input - invalid', { tags: '@page-login-100' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Passwords should be between 8 and 72 characters long. Please choose another.')
  })

  it('Create Account - Username - input - empty - invalid', { tags: '@page-login-101' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Usernames can only contain letters, digits, dashes and underscores, and should be between 2 and 15 characters long. Please choose another.')
  })

  it('Create Account - Username - input - cleared - invalid', { tags: '@page-login-102' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Valid Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    // Input Vaild Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    // Clear Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .clear()
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Usernames can only contain letters, digits, dashes and underscores, and should be between 2 and 15 characters long. Please choose another.')
  })

  it('Create Account - Username - input - min length - invalid', { tags: '@page-login-103' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Valid Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    // Input invaild Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type('a')
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Usernames can only contain letters, digits, dashes and underscores, and should be between 2 and 15 characters long. Please choose another.')
  })

  it('Create Account - Username - input - max length - invalid', { tags: '@page-login-104' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Valid Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    // Input invaild Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type('1234567890123456')
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Usernames can only contain letters, digits, dashes and underscores, and should be between 2 and 15 characters long. Please choose another.')
  })

  it('Create Account - Username - input - already exists - invalid', { tags: '@page-login-105' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Valid Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    // Input invaild Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type('admin')
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('That username is taken. Please choose another.')
  })

  // [tech-debt] Test breaks backend and bans IP
  it.skip('Create Account - Password - input - cleared - invalid', { tags: '@page-login-107' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Valid Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    // Input Valid Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewValid)
    // Clear Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .clear()
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Sorry.')
  })

  it('Create Account - Password - input - min length - invalid', { tags: '@page-login-108' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Valid Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    // Input invalid Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type('1234567')
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Passwords should be between 8 and 72 characters long. Please choose another.')
  })

  it('Create Account - Password - input - max length - invalid', { tags: '@page-login-109' }, () => {
    /** Given */
    cy.visit('/login')
    /** When */
    // Input Valid Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    // Input invalid Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type('123456790123456791123456792123456793123456794123456795123456796123456797123456798')
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Passwords should be between 8 and 72 characters long. Please choose another.')
  })

  it('Create Account - Password - input - char validation - invalid', { tags: '@page-login-110' }, () => {
    /** Given */
    cy.faker().then((faker) => {
      cy.log(faker.person.fullName());
    });
    cy.visit('/login')
    /** When */
    // Input Valid Username
    cy.get(':nth-child(11) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(userNewValid)
    // Input Invalid Pass
    cy.get(':nth-child(11) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(passNewInvalid)
    cy.get(':nth-child(11) > [type="submit"]').click()
    /** Then */
    cy.get('body').contains('Passwords should be between 8 and 72 characters long. Please choose another.')
  })
})



