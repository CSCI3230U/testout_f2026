// AI-assisted - see AI-USAGE.md #2
import { describe, expect, it } from 'vitest';

import { sortRecipes } from './sortRecipes.js';

const recipes = [
    {id: 1, title: "Spaghetti alla Carbonara", cookTime: 25},
    {id: 2, title: "Greek Salad", cookTime: 15},
    {id: 3, title: "Fish Tacos", cookTime: 20}
];

const titlesOf = (list) => list.map((r) => r.title);

describe('sortRecipes', () => {
    it('keeps the original order for "default"', () => {
        expect(titlesOf(sortRecipes(recipes, 'default'))).toEqual([
            "Spaghetti alla Carbonara", "Greek Salad", "Fish Tacos"
        ]);
    });

    it('sorts by cook time low to high', () => {
        expect(sortRecipes(recipes, 'time-asc').map((r) => r.cookTime)).toEqual([15, 20, 25]);
    });

    it('sorts by cook time high to low', () => {
        expect(sortRecipes(recipes, 'time-desc').map((r) => r.cookTime)).toEqual([25, 20, 15]);
    });

    it('sorts by title A-Z', () => {
        expect(titlesOf(sortRecipes(recipes, 'title-asc'))).toEqual([
            "Fish Tacos", "Greek Salad", "Spaghetti alla Carbonara"
        ]);
    });

    it('keeps the original order for an unknown sort option', () => {
        expect(titlesOf(sortRecipes(recipes, 'nonsense'))).toEqual(titlesOf(recipes));
    });

    it('does not mutate the array it is given', () => {
        const original = [...recipes];
        sortRecipes(recipes, 'time-desc');
        expect(recipes).toEqual(original);
    });

    it('handles an empty list', () => {
        expect(sortRecipes([], 'title-asc')).toEqual([]);
    });
});
