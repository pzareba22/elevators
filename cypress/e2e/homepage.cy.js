describe("Check if the page renders correctly", () => {
    beforeEach(() => cy.visit("/"));

    it("Renders all components", () => {
        cy.get(".app").should("exist");
        cy.get(".elevatorsContainer").should("exist");
        cy.get(".elevatorControls").should("exist");
        cy.get(".submitButton").should("exist");
        cy.get(".requestsContainer").should("exist");
    });

    it("Renders the correct number of elevators", () => {
        cy.get("#elevatorsNoInput").should("exist").type("5");
        cy.get("#floorNoInput").should("exist").type("6");
        cy.get(".setupDialog > form").submit();
        cy.get(".elevatorContainer").should("have.length", 5);
    });
});

describe("Check if the elevators move correctly", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("#elevatorsNoInput").type("5");
        cy.get("#floorNoInput").type("6");
        cy.get(".setupDialog > form").submit();
        cy.get(".elevatorContainer").should("have.length", 5);
    });

    it("Checks if requests appear correctly", () => {
        cy.get("#elevatorNo").type("1");
        cy.get("#floorFrom").type("5");
        cy.get("#floorTo").type("3");
        cy.get(".elevatorControls > form").submit();

        cy.get(".requestBox > p").eq(0).should("have.text", "0");
        cy.get(".requestBox > p").eq(1).should("have.text", "From: 5");
        cy.get(".requestBox > p").eq(2).should("have.text", "To: 3");
    });

    it("Moves one elevator correctly", () => {
        cy.get("#elevatorNo").type("0");
        cy.get("#floorFrom").type("2");
        cy.get("#floorTo").type("1");
        cy.get(".elevatorControls > form").submit();
        cy.get(".submitButton").click();
        cy.get(".shaft").eq(0).should("have.text", "2");
        // Check if padding is right
        cy.get(".submitButton").click();
        cy.get(".shaft").eq(0).should("have.text", "1");
        // Check if padding is right
    });
});
