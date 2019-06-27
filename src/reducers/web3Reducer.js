import {
  GET_WEB3,
  GET_RANKING,
  SET_TRX,
  SET_SUBMITTING,
  TOGGLE_LIST
} from "../actions/web3Actions";

const initialState = {
  submitting: false,
  bcTrx: null,
  top10List: [],
  fullList: true,
  web3Provider: null,
  contractInstance: null,
  account: null
};

export const web3Reducer = (state = initialState, action) => {
  // Evaluar la acción despachada
  switch (action.type) {
    case GET_WEB3:
      return {
        ...state,
        web3Provider: action.payload.web3Provider,
        contractInstance: action.payload.contractInstance,
        account: action.payload.account
      };

    case TOGGLE_LIST:
      return {
        ...state,
        fullList: !state.fullList
      };

    case GET_RANKING:
      return {
        ...state,
        top10List: action.payload
      };

    case SET_TRX:
      return {
        ...state,
        bcTrx: action.payload
      };

    case SET_SUBMITTING:
      return {
        ...state,
        submitting: action.payload
      };
    // Si no es ninguna de las acciones anteriores
    default:
      return state;
  }
};
