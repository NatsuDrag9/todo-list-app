import {render, screen} from "@testing-library/react"
import App from '../App.tsx';
import {beforeEach, describe, expect, test} from "vitest";

describe('Initial render', () => {
    beforeEach(() => {
        render(<App />);
    })

    test('Header must exist', () => {
        const hElement = screen.getByRole('heading', {name: /To Do List/, level: 3});
        expect(hElement).toBeDefined();
    })

    test('div with role="filter" must exist and only first <p> element must be displayed', () => {
        const fElement = screen.getByRole('filter');
        expect(fElement).toBeDefined();

        const pElement = screen.getByText('Filter');
        expect(pElement).toBeDefined();

        const filterElements = screen.getByTestId('filter-elements');
        expect(filterElements.style.display).toBe('none');
    })

    test('Task wrapper and each task must exist', () => {
        const taskWrapperElement = screen.getByRole('display-tasks');
        expect(taskWrapperElement).toBeDefined();

        const taskElement = screen.getByTestId('task');
        expect(taskElement).toBeDefined();
    })

    test('Arrow wrapper and arrows must exist', () => {
        const arrowWrapperElement = screen.getByRole('navigation');
        expect(arrowWrapperElement).toBeDefined();

        const leftArrowElement = screen.getByRole('left');
        expect(leftArrowElement).toBeDefined();

        const rightArrowElement = screen.getByRole('right');
        expect(rightArrowElement).toBeDefined();
    })
})

