const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

// Set up action creator
// declare the const for the action type
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUserDataRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserDataSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUserDataFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_USERS_REQUEST:
        return {
            // Make a copy of the state and set the loading to true
            ...state,
            loading: true
        }

        case FETCH_USERS_SUCCESS:
        return {
            loading: false,
            users: action.payload,
            error: ''
        }

        case FETCH_USERS_FAILURE:
        return {
            loading: false,
            users: [],
            error: action.payload
        }
    }
}



// Define the async action creator 
const fetchUsers = () => {

   return function(dispatch){
        // Before firing the api request, dispatch the fetchUsersRequest
        dispatch(fetchUserDataRequest());

        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            // response.data is an array of the data from the api
            const users = response.data.map(user => user.id)
            dispatch(fetchUserDataSuccess(users))
        })
        .catch(err => {
            // error.message is the error description
            dispatch(fetchUserDataFailure(err))
        })
   }
}

// Create the redux store
const store = createStore(reducer, applyMiddleware(thunkMiddleWare))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())