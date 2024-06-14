describe('Movies Saga', () => {
  beforeEach(async () => {
    // Silence console.log statements for cleaner test output:
    console.log = () => { }

    // We need Cypress to finish loading locahost:${PORT}/ before
    // we execute each test:
    await cy.visit('/')
  })

  //Test to check that app loads correctly
  // Should pass/be a smoke test if things are wrong...
  it('E2E: Loads Movies Correctly', () => {
    cy.get(`[data-testid='movieItem']`).should('have.length', 2)
    //Making sure not hardcoded and getting data from DB...
    cy.contains(/water/i).should('exist');
  })

  //Test to check that we can go to the details page for a movie
  it('UI: Can visit Details Page and Return to Home', () => {
    cy.contains(`[data-testid='movieItem']`, 'Avatar').find('[data-testid="toDetails"]').click();

    cy.get(`[data-testid="movieDetails"]`).should('have.length', 1)
    cy.get(`[data-testid="toList"]`).should('exist');

    cy.get(`[data-testid="toList"]`).click();
    cy.get(`[data-testid="toList"]`).should('not.exist');

    cy.get(`[data-testid='movieItem']`).should('have.length', 2)

  })

  //Test to make sure details page has correct information
  it('E2E: Details Page displays Correct Movie Info', () => {
    cy.contains(`[data-testid='movieItem']`, 'Avatar').find('[data-testid="toDetails"]').click();
    cy.get(`[data-testid="movieDetails"]`).should('have.length', 1)
    //check Avatar Stuff
    cy.contains(/Pandora/i)
    cy.contains(/Avatar/i)
    cy.get("[data-testid='movieDetails']").find('img').should('have.attr', 'src', 'images/avatar.jpeg')

    //Check Beauty and the Beast
    cy.get(`[data-testid="toList"]`).click();
    cy.contains(`[data-testid='movieItem']`, 'Beauty').find('[data-testid="toDetails"]').click();

    cy.contains(/Beast/i)
    cy.contains(/Condon/i)
    cy.get("[data-testid='movieDetails']").find('img').should('have.attr', 'src', 'images/beauty-and-the-beast.jpg')


  })
  //Test to make sure movie has correct genre(s) on the page
  it('E2E: Details Page displays Correct Movie Genre(s)', () => {
    cy.contains(`[data-testid='movieItem']`, 'Avatar').find('[data-testid="toDetails"]').click();
    cy.get(`[data-testid="movieDetails"]`).should('have.length', 1)

    cy.contains(/Avatar/i)
    cy.contains(/Adventure/i);
    cy.contains(/Epic/i);
    cy.contains(/Drama/i);

    cy.get(`[data-testid="toList"]`).click();
    cy.contains(`[data-testid='movieItem']`, 'Beauty').find('[data-testid="toDetails"]').click();

    cy.contains(/Musical/i)

  })
})
