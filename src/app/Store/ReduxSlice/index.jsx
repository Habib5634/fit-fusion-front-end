import { combineReducers } from "redux";
import scrollReducer from './scrollSlice'
import modalReducer from './modalSlice'
import dropdownReducer from './dropdownSlice'
import userDataReducer from './userSlice'
import nutritionistsReducer from './nutritionistSlice'
import bookingReducer from './bookingSlice'
import bookingsReducer from './bookingsSlice'
import plansReducer from './plansSlice'

export default combineReducers({
    userData:userDataReducer,
    scroll:scrollReducer,
    modal: modalReducer,
    dropdown: dropdownReducer,
    nutritionists: nutritionistsReducer,
    booking:bookingReducer,
    plans:plansReducer,
    bookings:bookingsReducer


})