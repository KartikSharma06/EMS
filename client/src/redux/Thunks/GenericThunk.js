import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService.js";

export const createGenericGetThunk = (name, EndPoints) => {
    return createAsyncThunk(name, async (data, { rejectWithValue }) => {
        try {
            const { apiroute } = data;
            const routeValue = typeof EndPoints[apiroute] === 'function'
                ? EndPoints[apiroute](data.id)
                : EndPoints[apiroute];
            const response = await apiService.get(routeValue, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });
};

export const createGenericPostThunk = (name, EndPoints) => {
    return createAsyncThunk(name, async (data, { rejectWithValue }) => {
        try {
            const { apiroute, payload } = data;
            const routeValue = typeof EndPoints[apiroute] === 'function'
                ? EndPoints[apiroute](data.id)
                : EndPoints[apiroute];
            const response = await apiService.post(routeValue, payload, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });
};

export const createGenericPatchThunk = (name, EndPoints) => {
    return createAsyncThunk(name, async (data, { rejectWithValue }) => {
        try {
            const { apiroute, payload } = data;
            const routeValue = typeof EndPoints[apiroute] === 'function'
                ? EndPoints[apiroute](data.id)
                : EndPoints[apiroute];
            const response = await apiService.patch(routeValue, payload, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });
};

export const createGenericDeleteThunk = (name, EndPoints) => {
    return createAsyncThunk(name, async (data, { rejectWithValue }) => {
        try {
            const { apiroute, id } = data;
            const routeValue = EndPoints[apiroute](id);
            const response = await apiService.delete(routeValue, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });
};
