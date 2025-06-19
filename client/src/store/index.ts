import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./user/userReducer";
import { DevicesSlice } from "./devices/deviceReducer";
import { typesSlice } from "./types/typesReducer";
import { brandsSlice } from "./brands/brandsReducer";
import { cartSlice } from "./cart/cartReducer";

export const store = configureStore({
    reducer: {
        [UserSlice.name]: UserSlice.reducer,
        [DevicesSlice.name]: DevicesSlice.reducer,
        [typesSlice.name]: typesSlice.reducer,
        [brandsSlice.name]: brandsSlice.reducer,
        [cartSlice.name]: cartSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<AppState>();