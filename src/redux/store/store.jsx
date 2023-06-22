import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slices/authSlice"; 
import requestReducer from "../slices/RequestsSlice"; 
import proposalReducer from "../slices/ProposalSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    request: requestReducer,
    proposal: proposalReducer
  }
  
});

export default store;
