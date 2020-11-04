import { combineReducers } from "redux";
import {reducer as FormReducer} from 'redux-form';
import modalReducer from "../modals/modalReducer";
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
const rootReducer =  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: FormReducer,
    modals: modalReducer,
})

export default rootReducer;