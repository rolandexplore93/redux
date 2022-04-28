const redux  = require('redux');
const createStore = redux.createStore
const combineReducers = redux.combineReducers

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM'

//  Action creators for the action
function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream(){
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
}

// List of Property (i.e products) to manage
// const initialState = {
//     numOfCake : 20,
//     noOfIceCream: 62
// }

const initialCakeState = {
    numOfCake : 20,
}

const initialIceCreamState = {
    noOfIceCream: 62
}

// Multilpe useReducer scenario
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "BUY_CAKE": {
//             return {
//                 ...state,
//                 numOfCake: state.numOfCake - 1
//             }
//         }
//         // Add another switch case for buy_icecream
//         case "BUY_ICECREAM": {
//             return {
//                 ...state,
//                 noOfIceCream: state.noOfIceCream - 1
//             }
//         }
//         default:
//             return state
//     }
// }

// useReducer for cake
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case "BUY_CAKE": {
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            }
        }
        default:
            return state
    }
}

// useReducer for icecream
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case "BUY_ICECREAM": {
            return {
                ...state,
                noOfIceCream: state.noOfIceCream - 1
            }
        }
        default:
            return state
    }
}

// Creation of redux door
// // THIS IS FOR SINGLE USEREDUCER
// const store = createStore(reducer)
// console.log("Initial State", store.getState())
// const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()))
// store.dispatch(buyCake())
// store.dispatch(buyCake())
// store.dispatch(buyCake())
// store.dispatch(buyIceCream())
// store.dispatch(buyIceCream())
// // We have 3 dispatches to buyCake and 2 dispatches to buy iceCream
// unsubscribe()


// THIS IS FOR MULTIPLE USEREDUCER
//  First, combine the reducers before creating the stro
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer)
console.log("Initial State", store.getState())
const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
// We have 3 dispatches to buyCake and 2 dispatches to buy iceCream
unsubscribe()
