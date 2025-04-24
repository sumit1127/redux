//state -> action -> reducer

const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware
import axios from 'axios';

//state
const initialState = {
  loading: false,
  users: [],
  error: "",
};


const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";



//define the action creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSuccess = (user) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: user,
  };
};

const fetchUsersFail = (err) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: err,
  };
};




//define reducer
const reducer = ((state = initialState), action) =>{
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return{
                ...state,
                loading : true,
            }
        case FETCH_USERS_SUCCEEDED:
            return{
                loading : false,
                user: action.payload,
                error: ""
            }
        case FETCH_USERS_FAILED:
            return{
                loading : false,
                user: [],
                error: action.payload
            }
    }
}

//define async action creator
const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) =>{
            //res.data is the users
            const users = res.data.map((x) => x.id)
            dispatch(fetchUsersSuccess(users))
        }).catch((err) => {
            //err.msg is error message
            console.log("error occured", err)
            dispatch(fetchUsersFail(err.message))
        })
    }
}

//store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

//finally at the bottom subscribe to the store and dispatch to the async action creators
store.subscribe(()=> console.log(store.getStore()))
store.dispatch(fetchUsers())