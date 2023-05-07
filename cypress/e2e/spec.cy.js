describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    cy.xpath('//*[@id="root"]/section/div[2]/div/div[2]/button[2]').click({
      force: true,
    });
  });
});
