const defaultState = {
    cash: 1234
  }
  
 export default function (state = defaultState, action) {
    switch (action.type) {
      case "ADD_CASH":
        return { ...state, cash: state.cash + action.payload }
      case "GET_CASH":
        return { ...state, cash: state.cash - action.payload }
      default: return state;
    }
  }