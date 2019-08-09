import * as types from "./actions";
import { ActionType, createReducer } from "typesafe-actions";
import produce from "immer";

export type Increment = ReturnType<typeof types.increment>;
export type Decrement = ReturnType<typeof types.decrement>;
export type SetCounter = ReturnType<typeof types.setCounter>;

export type RootAction = ActionType<typeof types>;

export type GlobalState = {
  count: number;
};

export const initialState: GlobalState = {
  count: 0
};

export default createReducer<GlobalState, RootAction>(initialState, {
  [types.INCREMENT]: (state, action: Increment) =>
    produce(state, draft => {
      draft.count++;
    }),
  [types.DECREMENT]: (state, action: Decrement) =>
    produce(state, draft => {
      draft.count--;
    }),
  [types.SET_COUNTER]: (state, action: SetCounter) =>
    produce(state, draft => {
      draft.count = action.payload;
    })
});
