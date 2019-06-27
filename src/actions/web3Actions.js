import Web3 from "web3";
import abiArray from "../utils/contract";
import { buildRanking } from "../utils/ContractUtils";
export const INIT_WEB3 = "INIT_WEB3";
export const GET_WEB3 = "GET_WEB3";
export const SEND_TRX = "SEND_TRX";
export const SET_TRX = "SET_TRX";
export const SET_SUBMITTING = "SET_SUBMITTING";
export const GET_RANKING = "GET_RANKING";
export const TOGGLE_LIST = "TOGGLE_LIST";

export const toggleList = () => async dispatch => {
  await dispatch(setToggleList());

  dispatch(getRanking());
};

export const setToggleList = () => {
  return {
    type: TOGGLE_LIST
  };
};

export const getRanking = () => async (dispatch, getState) => {
  // Obtener Web3 disponible en el cliente
  const web3Provider = getState().web3Reducer.web3Provider;

  if (web3Provider) {
    // Obtener instancia del contrato
    const contractInstance = getState().web3Reducer.contractInstance;

    const fullList = getState().web3Reducer.fullList;

    // Obtener la lista de jugadas
    const res = await contractInstance.methods.fetchJugadas().call();

    // Ranking
    const top10List = buildRanking(web3Provider, fullList, res);

    // Setear el ranking
    dispatch(setRankingtop10List(top10List));
  } else {
    console.log("Error obteniendo jugadas: ", err);
  }
};

export function setRankingtop10List(top10List) {
  return {
    type: GET_RANKING,
    payload: top10List
  };
}

export const initWeb3 = () => async dispatch => {

  try {

    // Obtener Web3 disponible en el cliente
    const web3Provider = new Web3(web3.currentProvider);

    // Obtener Instancia del contrato
    const contractInstance = new web3Provider.eth.Contract(
      abiArray.abiArray,
      ENVAR_CONTRACT_ADDRESS
    );

    const accounts = await web3Provider.eth.getAccounts();

    dispatch(getWeb3(web3Provider, contractInstance, accounts[0]));
  } catch (err) {
    console.log("Error al determinar nodo: ", err);
  }
};

export function getWeb3(web3Provider, contractInstance, account) {
  return {
    type: GET_WEB3,
    payload: {
      web3Provider,
      contractInstance,
      account
    }
  };
}

export function setTrx(trx) {
  return {
    type: SET_TRX,
    payload: trx
  };
}

export function setSubmitting(val) {
  return {
    type: SET_SUBMITTING,
    payload: val
  };
}

export const sendTrx = (name, email, time, attemps) => async (dispatch, getState) => {

  // Obtener instancia del contrato
  const contractInstance = getState().web3Reducer.contractInstance;

  // Obtener la cuenta logueada
  const account = getState().web3Reducer.account;

  try {
    dispatch(setSubmitting(true));

    // Guardar jugada en blockchain y recuperar el Hash de la tx
    const res = await contractInstance.methods
      .addJugada(Date.now(), name, email, attemps, parseInt(time / 1000))
      .send({ from: account })
      .on("transactionHash", function(txHash) {
        dispatch(setTrx(txHash));
      });
  } catch (err) {
    console.log("Error guardando la jugada: ", err);
  }
};
