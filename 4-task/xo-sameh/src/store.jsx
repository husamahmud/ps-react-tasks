/* eslint-disable no-unused-vars */
import { configureStore, createSlice } from '@reduxjs/toolkit';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const initState = {
  values: numbers,
  newGame: false,
  player: 'X',
  winner: null,
  raw: 0,
};

const xoReducer = createSlice({
  name: 'xo',
  initialState: initState,
  reducers: {
    startNewGame(state, action) {
      state.newGame = true;
      state.player = 'X';
      state.winner = null;
      state.values = numbers;
    },
    handleRound(state, action) {
      let index = action.payload;
      if (state.newGame == true && !isNaN(Number(index))) {
        const newValues = [...state.values];
        newValues[Number(index) - 1] = state.player;
        state.values = newValues;
        state.player = state.player == 'X' ? 'O' : 'X';
      } else {
        alert('Choose valid box');
      }
    },
    handleWinner(state, action) {
      state.winner = action.payload;
      state.newGame = false;
      state.raw = 0;
    },
    handleRaw(state, action) {
      if (state.raw == 9) {
        state.newGame = false;
      }
      state.raw = state.raw + 1;
    },
  },
});

const store = configureStore({
  reducer: {
    xo: xoReducer.reducer,
  },
});

export const { startNewGame, handleRound, handleWinner, handleRaw } =
  xoReducer.actions;
export default store;
