const redux  = require('redux');
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM'

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

const initialState = {
    numOfCake : 20,
    noOfIceCream: 62
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "BUY_CAKE": {
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            }
        }
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
const store = createStore(reducer)
console.log("Initial State", store.getState())
const unsubscribe = store.subscribe(() => console.log("Initial State", store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()
