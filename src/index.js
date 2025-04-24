const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

import { createLogger } from "redux-logger";
import { applyMiddleware } from "redux";

const logger = createLogger({
  //options
});

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//action creator is function that return an object
function orderCake() {
  //action is an object with type property
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCream: 20,
// };

//state
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCream: 20,
};

//reducer
const cakeReducers = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducers = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };

    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

//combineReducer
const rootReducer = combineReducers({
  cake: cakeReducers,
  iceCream: iceCreamReducers,
});

//store
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {});

//dispatch
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(5));

//bindActionCreators
const actions = bindActionCreators(
  {
    orderCake,
    restockCake,
    orderIceCream,
    restockIceCream,
  },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.restockIceCream(5);

unsubscribe();
