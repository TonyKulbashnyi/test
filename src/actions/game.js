export const init = () => ({
  type: "INIT"
});

export const start = (displayName) => ({
  type: "START",
  name: displayName
});

export const startGame = () => ({
  type: "START_GAME"
});

export const newGame = () => ({
  type: "NEW_GAME"
});

export const getQuestion = () => ({
  type: "GET_QUESTION"
});

export const setVote = (affect, value) => ({
  type: "SET_VOTE",
  affect,
  value
});