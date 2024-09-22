// Action Types
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';

// Initial State
const initialState = { count: 0 };

// Create Store
function createStore(reducer) {
    let state = initialState;
    const listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    };

    return { getState, dispatch, subscribe };
}

// Reducer Function
function reducer(state, action) {
    switch (action.type) {
        case ADD:
            return {state, count: state.count + 1 };
        case SUBTRACT:
            return {state, count: state.count - 1 };
        case RESET:
            return initialState;
        default:
            return state;
    }
}

// Create the store
const store = createStore(reducer);

// Subscribe to state changes
store.subscribe(() => {
    const currentState = store.getState();
    document.getElementById('count').textContent = currentState.count;
});

// Dispatch actions on button clicks
document.getElementById('add').addEventListener('click', () => {
    store.dispatch({ type: ADD });
});

document.getElementById('subtract').addEventListener('click', () => {
    store.dispatch({ type: SUBTRACT });
});

document.getElementById('reset').addEventListener('click', () => {
    store.dispatch({ type: RESET });
});

// Dispatch initial actions (optional)
store.dispatch({ type: ADD });      // State changed: { count: 1 }
store.dispatch({ type: ADD });      // State changed: { count: 2 }
store.dispatch({ type: SUBTRACT }); // State changed: { count: 1 }
store.dispatch({ type: RESET });    // State changed: { count: 0 }