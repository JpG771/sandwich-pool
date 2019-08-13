import { Sandwich } from '../models/sandwich';

export const sortSandwichByDate = (): (a: Sandwich, b: Sandwich) => number => {
  return (sandwichA, sandwichB) => {
    const dateA = sandwichA.dateModified ? sandwichA.dateModified : sandwichA.dateCreated;
    const dateB = sandwichB.dateModified ? sandwichB.dateModified : sandwichB.dateCreated;
    return !!dateB ? dateB.localeCompare(dateA) : !!dateA ? -1 : sandwichA.title.localeCompare(sandwichB.title);
  };
};
