import { combineReducers } from "redux";
import userReducer from "./user";
import cartReducer from "./cartReducers";

export default combineReducers({ user: userReducer, cart: cartReducer });
