# Elevator system simulation

## General information

This is a project which simulates behaviour of an elevator system. At the beginning, the user is prompted to enther the desired number of elevators and numbers of floor per elevator. Then the user can interact with said elevators by sending requests to chosen elevators and giving them instructions in the form of (floorFrom, floorTo). The user can also click a button which prompts every elevator to move by one floor (if that elevator needs to move at all).

## Elevator logic

Each elevator (implemented in the Elevator.ts file) holds its own state, which consists of:

-   current floor
-   an array of floors and destinations to reach from each floor
-   current direction

The array of floors is kept in a sorted order, which allows search and insert operations in O(log(n)) time complexity. Searching and inserting are implementations of a classical binary search algorithm.

An elevator moves in a greedy manner - it will keep going in the same direction, until there are no more stops to make in said direction. Then either the direction changes or it waits for more requests.

## ElevatorController logic

I've also implemented an ElevatorController class (implemented in ElevatorController.ts), which is responsible for handling multiple elevators at once. It is also responsible for keeping track of existing requests made to elevators and making sure that, they are unique, for convenience sake. Uniqueness is achieved by keeping existing requests in an array of sets (since JS/TS doesn't deal well with keeping objects in a set I've resorted to using Immutable.js library for it's implementation of sets and maps).

The ElevatorController class allows for the following:

-   making a request to a particular elevator
-   getting an array of current elevator positions
-   getting an array of current requests
-   making each elevator move one floor

## Used technologies

-   React.js - Framework on which the entire application is based
-   Typescript - Allows for static typing
-   React Hook Form - Provides an elegant API for working with forms
-   Immutable.js - Provides a clean, trie-based implementations of maps and sets
-   Sass - CSS extension language
-   Jest - Testing 'pure' typescript code
-   Cypress - End to end testing

## How to run the code

There are several commands availiable:

-   `npm start` - starts the app locally (by default on port 3000)
-   `npm run test` - performs Jest testing (components responsible for the 'buisness' logic)
-   `npm run cypress` - performs cypress e2e testing (without GUI)
-   `npm run cypress-open` - opens the Cypress GUI and preforms tests
