export default function charReducer (state = [], action) {
    switch (action.type) {
        case 'SET_CHAR':
            return action.payload;
        case 'UNSET_CHAR':
            return [];
        default:
            return state;
    }
};