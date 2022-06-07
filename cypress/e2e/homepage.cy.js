const elevatorPadding = 0.2;
const calculateBottom = (floor, maxFloor) => {
    const floorHeight = (30 + 2 * elevatorPadding) / (maxFloor + 1);
    const res = (floor * floorHeight - elevatorPadding) * 16;
    return parseInt(res);
};

describe("Check if the page renders correctly", () => {
    beforeEach(() => cy.visit("/"));

    it("Renders all components", () => {
        cy.get(".app").should("exist");
        cy.get(".elevatorsContainer").should("exist");
        cy.get(".setupDialog").should("exist");
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

describe("Checks if requests appear correctly", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("#elevatorsNoInput").type("5");
        cy.get("#floorNoInput").type("6");
        cy.get(".setupDialog > form").submit();
        cy.get(".elevatorContainer").should("have.length", 5);
    });

    it("Creates one request", () => {
        cy.get("#elevatorNo").type("1");
        cy.get("#floorFrom").type("5");
        cy.get("#floorTo").type("3");
        cy.get(".elevatorControls > form").submit();

        cy.get(".requestBox > p").eq(0).should("have.text", "0");
        cy.get(".requestBox > p").eq(1).should("have.text", "From: 5");
        cy.get(".requestBox > p").eq(2).should("have.text", "To: 3");
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

    it("Moves one elevator correctly", () => {
        cy.get("#elevatorNo").type("0");
        cy.get("#floorFrom").type("2");
        cy.get("#floorTo").type("1");
        cy.get(".elevatorControls > form").submit();

        cy.get(".submitButton").click();
        cy.get(".submitButton").click();
        cy.get(".shaft")
            .eq(0)
            .should(($div) => {
                expect($div).to.have.text("1");
                const bottom = parseInt($div.css("bottom"));
                expect(bottom).to.equal(calculateBottom(1, 5));
            });
    });

    it("Moves multiple elevators correctly", () => {
        cy.get("#elevatorNo").type("3");
        cy.get("#floorFrom").type("4");
        cy.get("#floorTo").type("2");
        cy.get(".elevatorControls > form").submit();

        cy.get("#elevatorNo").clear().type("2");
        cy.get("#floorFrom").clear().type("1");
        cy.get("#floorTo").clear().type("4");
        cy.get(".elevatorControls > form").submit();

        cy.get(".submitButton").click();
        cy.get(".shaft").eq(3).should("have.text", "4");

        cy.get(".shaft")
            .eq(3)
            .should(($div) => {
                expect($div).to.have.text("4");
                const bottom = parseInt($div.css("bottom"));
                expect(bottom).to.equal(calculateBottom(4, 5));
            });

        cy.get(".shaft").eq(2).should("have.text", "1");

        cy.get(".shaft")
            .eq(2)
            .should(($div) => {
                expect($div).to.have.text("1");
                const bottom = parseInt($div.css("bottom"));
                expect(bottom).to.equal(calculateBottom(1, 5));
            });
    });
});

describe("Check if wrong inputs behave correctly", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Tries to input negative number of elevaors", () => {
        cy.get("#elevatorsNoInput").type("-3");
        cy.get(".setupDialog form").submit();

        cy.get("#elevatorsNoInput")
            .should("have.class", "wrongInput")
            .should("have.css", "border", "3px solid rgb(255, 0, 0)");
    });

    it("Tries to input negative number of floors", () => {
        cy.get("#floorNoInput").type("-3");
        cy.get(".setupDialog form").submit();

        cy.get("#floorNoInput")
            .should("have.class", "wrongInput")
            .should("have.css", "border", "3px solid rgb(255, 0, 0)");
        cy.get(".requestBox").should("not.exist");
    });
});
