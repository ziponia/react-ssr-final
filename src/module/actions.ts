import { createStandardAction } from "typesafe-actions";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COUNTER = "SET_COUNTER";

export const increment = createStandardAction(INCREMENT)<void>();
export const decrement = createStandardAction(DECREMENT)<void>();
export const setCounter = createStandardAction(SET_COUNTER)<number>();
