import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = "https://reqres.in/api/users";

export const fetchUser = createAsyncThunk("user/fetchUser", async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
});

export const updateUser = createAsyncThunk("user/updateUser", async (userData) => {
    const response = await fetch(`${API_URL}/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return id;
});


const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.userData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(updateUser.fulfilled, (state, action) => {
                state.userData = action.payload;
            })


            .addCase(deleteUser.fulfilled, (state) => {
                state.userData = null;
            });
    },
});
export const { setUsers } = userSlice.actions;


export default userSlice.reducer;