import { createElement } from 'lwc';
import Counter from 'c/counter';

describe('c-counter', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('testing jest for redux', () => {
        // Arrange
        const element = createElement('c-counter', {
            is: Counter
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});