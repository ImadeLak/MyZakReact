import {combineReducers,} from 'redux';

export const dvas0004 = (state = {}, action) => {
 switch (action.type) {

     case 'TEST_ACTION':
         return {
         content: "Hi From TEST"
         };

     default:
        return state;
 }
};

export const reducers = combineReducers({
 dvas0004,
});
