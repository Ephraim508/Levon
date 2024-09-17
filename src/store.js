import { createStore } from 'redux';

// Initial state with light durations and flags
const initialState = {
    Green: 10, //Greed Light
    Yellow: 3,  //Yellow light
    Red: 7,  //Red Light
    emergency: false,            // Emergency vehicle request state
    pedestrianRequest: false,     // Pedestrian crossing request state
};



// Reducer to manage light durations and request states
const lightReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_EMERGENCY:
            return {
                ...state,
                emergency: action.payload, // Update emergency flag
            };
        case TOGGLE_PEDESTRIAN:
            return {
                ...state,
                pedestrianRequest: action.payload, // Update pedestrian request flag
            };
        default:
            return state;
    }
};
// Actions to update emergency and pedestrian crossing states
const TOGGLE_EMERGENCY = 'TOGGLE_EMERGENCY';
const TOGGLE_PEDESTRIAN = 'TOGGLE_PEDESTRIAN';

// Action creators to toggle emergency and pedestrian states
export const toggleEmergency = (isEmergency) => ({
    type: TOGGLE_EMERGENCY,
    payload: isEmergency,
});

export const togglePedestrian = (isPedestrian) => ({
    type: TOGGLE_PEDESTRIAN,
    payload: isPedestrian,
});

// Create Redux store
const store = createStore(lightReducer);

export default store;
