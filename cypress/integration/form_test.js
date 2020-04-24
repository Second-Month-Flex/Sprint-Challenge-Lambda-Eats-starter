describe("Testing our volunteer form", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/pizza");
  });

  it("Can submit form accuractly", function () {
    cy.get('input[name="name"]').type("Adonis").should("have.value", "Adonis");
    cy.get('input[name="instructions"]')
      .type("I dont want pepporoni")
      .should("have.value", "I dont want pepporoni");
    cy.get("[type=checkbox]").check().should("be.checked");
    // cy.get("garlic").check().should("be.checked");
    cy.get("button[name='submit']").click();
  });
});
