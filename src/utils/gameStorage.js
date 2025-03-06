// Game storage utility functions
const STORAGE_KEY = 'ludoGameState';

// Initialize default state
const defaultState = {
  joinedPlayers: {
    red: false,
    yellow: false,
    blue: false,
    green: false
  },
  lastDiceValue: 0,
  currentToken: null,
  lastPlayerTurn: 'red',
  currentPlayerTurn: 'red',
  tokenPositions: {}
};

// Save game state to localStorage
export const saveGameState = (state) => {
  try {
    const currentState = getGameState();
    const newState = {
      ...currentState,
      ...state
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

// Get game state from localStorage
export const getGameState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : defaultState;
  } catch (error) {
    console.error('Error loading game state:', error);
    return defaultState;
  }
};

// Clear game state from localStorage
export const clearGameState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing game state:', error);
  }
};

// Update specific parts of the game state
export const updateGameState = {
  // Update joined players
  joinedPlayers: (players) => {
    saveGameState({ joinedPlayers: players });
  },
  
  // Update last dice value
  diceValue: (value) => {
    saveGameState({ lastDiceValue: value });
  },
  
  // Update current token
  currentToken: (token) => {
    saveGameState({ currentToken: token });
  },
  
  // Update player turns
  playerTurns: (current, last) => {
    saveGameState({
      currentPlayerTurn: current,
      lastPlayerTurn: last
    });
  },
  
  // Update token position
  tokenPosition: (tokenId, position) => {
    const currentState = getGameState();
    const newPositions = {
      ...currentState.tokenPositions,
      [tokenId]: position
    };
    saveGameState({ tokenPositions: newPositions });
  }
};