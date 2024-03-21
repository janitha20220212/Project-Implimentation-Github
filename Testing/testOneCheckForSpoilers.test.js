// Import Vitest
import { describe, it, expect } from 'vitest';

// Import jsdom to simulate a DOM environment
import { JSDOM } from 'jsdom';

// Import the function to be tested
import { checkForSpoilers } from './testOneCheckForSpoilers.js'; // Replace 'yourFileName.js' with the actual filename containing the function

// Initialize jsdom with a basic HTML document
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = window.document;

describe('checkForSpoilers', () => {
    it('Should apply styling to elements containing Marvel words and spoiler keywords', () => {
        // Create a mock parent element and add it to the DOM
        const parentElement = document.createElement('div');
        document.body.appendChild(parentElement);

        // Add mock elements to the parent element
        parentElement.innerHTML = `
            <shreddit-post>
            <div slot="title">Spider-Man reveals plot twist</div> 
            <div slot="text-body">Captain America appears in Avengers</div>
            </shreddit-post> 
            <post-consume-tracker>
            <div data-testid="post-title-text">Iron Man dies</div>
            <div slot="post-media-container">Fantastic Four ending spoiler</div>
            </post-consume-tracker> 
            <post-consume-tracker>
            <div data-testid="post-title-text">Deadpool cameo leak</div>
            <div data-post-click-location="text-body">No Way Home ending spoiler</div>
            </post-consume-tracker>
            <shreddit-post>
            <div slot="title">Godzilla appears in Marvel</div>
            <div slot="text-body">X-Men reveal plot twist</div>
            </shreddit-post>
        `;

        // Call the function to check for spoilers and apply styling
        const result = checkForSpoilers();

        // Check if styling is applied and function returns 'Successfull'
        const descendants = parentElement.querySelectorAll('[data-testid="post-title-text" ], [slot="title"], [slot="text-body"], [slot="post-media-container"], [data-testid="search_post_thumbnail"]');
        descendants.forEach(descendant => {
            expect(descendant.style.backgroundColor).toBe('grey');
            expect(descendant.style.color).toBe('grey');
            expect(descendant.style.filter).toBe('blur(8px)');
        });
        expect(result).toBe('Successfull');
    });
});




/*// Import Vitest
import { describe, it, expect } from 'vitest';
// Import jsdom to simulate a DOM environment
import { JSDOM } from 'jsdom';

// Import the function to be tested
import { checkForSpoilers } from './testOne.js'; // Replace 'yourFileName.js' with the actual filename containing the function

describe('checkForSpoilers', () => {
    it('Should apply styling to elements containing Marvel words and spoiler keywords', () => {
        // Arrange
        const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        global.document = window.document;

        document.body.innerHTML = `
            <div data-testid="post-title-text">Iron Man dies</div>
            <div slot="title">Spider-Man reveals plot twist</div>
            <div slot="text-body">Captain America appears in Avengers</div>
            <div data-post-click-location="text-body">No Way Home ending spoiler</div>
            <div data-testid="post-title-text">Deadpool cameo leak</div>
            <div slot="title">Godzilla appears in Marvel</div>
            <div slot="text-body">X-Men reveal plot twist</div>
            <div slot="post-media-container">Fantastic Four ending spoiler</div>
            <div data-testid="search_post_thumbnail">This is not a spoiler</div>
            <div>This is just a regular text</div>
        `;

        // Act
        const result = checkForSpoilers();

        // Assert
        expect(result).toBe('Successfull');
    });
});*/