import { createStore,applyMiddleware } from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "../reducer/rootReducer";
import thunk from "redux-thunk";
import {reactReduxFirebase,getFirebase} from 'react-redux-firebase'
import {reduxFirestore,getFirestore} from 'redux-firestore'
import firebase from '../config/firebase'

const rrfConfig={
    userProfile:'users',
    attachAuthIsReady: true,
    useFirestoreForProfile:true,
    updateProfileOnLogin: false
}

export const configureStore = ()=>{
      const middlewares = [thunk.withExtraArgument({getFirebase,getFirestore})];
  
      const middlewareEnhancer = applyMiddleware(...middlewares);
      const storeEnhancers = [middlewareEnhancer];

      const composedEnhancer = composeWithDevTools(
          ...storeEnhancers,
          reactReduxFirebase(firebase, rrfConfig),
          reduxFirestore(firebase))
      const store = createStore(rootReducer,composedEnhancer)
  
      return store;
  }