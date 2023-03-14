import { configureStore } from "@reduxjs/toolkit";
import { setUser } from "./redux/user/userSlice";


const store = configureStore({
    reducer: {
        user: setUser
    }
})

export default store