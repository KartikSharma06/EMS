import { createSlice } from "@reduxjs/toolkit";
import { GenericPageAsyncReducer } from "../AsyncReducers/asyncreducer.js";
import {
    createGenericGetThunk,
    createGenericPostThunk,
    createGenericPatchThunk,
    createGenericDeleteThunk,
} from "../Thunks/GenericThunk.js";
import {
    HRLeavePageEndPoints,
    HRSalaryPageEndPoints,
    HRAttendancePageEndPoints,
    HRNoticePageEndPoints,
    HRRecruitmentPageEndPoints,
    HRProfilesPageEndPoints,
} from "../apis/APIsEndpoints.js";

const initialState = {
    data: null,
    isLoading: false,
    fetchData: false,
    success: false,
    error: {
        status: false,
        message: null,
        content: null,
    },
};

// Leave
const HRLeaveGet = createGenericGetThunk("HRLeaveGet", HRLeavePageEndPoints);
const HRLeaveUpdate = createGenericPatchThunk("HRLeaveUpdate", HRLeavePageEndPoints);
const HRLeaveDelete = createGenericDeleteThunk("HRLeaveDelete", HRLeavePageEndPoints);
const HRLeaveSlice = createSlice({
    name: "HRLeavePage",
    initialState,
    extraReducers: (builder) => {
        GenericPageAsyncReducer(builder, HRLeaveGet);
        GenericPageAsyncReducer(builder, HRLeaveUpdate);
        GenericPageAsyncReducer(builder, HRLeaveDelete);
    },
});

// Salary
const HRSalaryGet = createGenericGetThunk("HRSalaryGet", HRSalaryPageEndPoints);
const HRSalaryCreate = createGenericPostThunk("HRSalaryCreate", HRSalaryPageEndPoints);
const HRSalaryUpdate = createGenericPatchThunk("HRSalaryUpdate", HRSalaryPageEndPoints);
const HRSalaryDelete = createGenericDeleteThunk("HRSalaryDelete", HRSalaryPageEndPoints);
const HRSalarySlice = createSlice({
    name: "HRSalaryPage",
    initialState,
    extraReducers: (builder) => {
        GenericPageAsyncReducer(builder, HRSalaryGet);
        GenericPageAsyncReducer(builder, HRSalaryCreate);
        GenericPageAsyncReducer(builder, HRSalaryUpdate);
        GenericPageAsyncReducer(builder, HRSalaryDelete);
    },
});

// Attendance
const HRAttendanceGet = createGenericGetThunk("HRAttendanceGet", HRAttendancePageEndPoints);
const HRAttendanceDelete = createGenericDeleteThunk("HRAttendanceDelete", HRAttendancePageEndPoints);
const HRAttendanceSlice = createSlice({
    name: "HRAttendancePage",
    initialState,
    extraReducers: (builder) => {
        GenericPageAsyncReducer(builder, HRAttendanceGet);
        GenericPageAsyncReducer(builder, HRAttendanceDelete);
    },
});

// Notice
const HRNoticeGet = createGenericGetThunk("HRNoticeGet", HRNoticePageEndPoints);
const HRNoticeCreate = createGenericPostThunk("HRNoticeCreate", HRNoticePageEndPoints);
const HRNoticeDelete = createGenericDeleteThunk("HRNoticeDelete", HRNoticePageEndPoints);
const HRNoticeSlice = createSlice({
    name: "HRNoticePage",
    initialState,
    extraReducers: (builder) => {
        GenericPageAsyncReducer(builder, HRNoticeGet);
        GenericPageAsyncReducer(builder, HRNoticeCreate);
        GenericPageAsyncReducer(builder, HRNoticeDelete);
    },
});

// Recruitment
const HRRecruitmentGet = createGenericGetThunk("HRRecruitmentGet", HRRecruitmentPageEndPoints);
const HRRecruitmentCreate = createGenericPostThunk("HRRecruitmentCreate", HRRecruitmentPageEndPoints);
const HRRecruitmentDelete = createGenericDeleteThunk("HRRecruitmentDelete", HRRecruitmentPageEndPoints);
const HRRecruitmentSlice = createSlice({
    name: "HRRecruitmentPage",
    initialState,
    extraReducers: (builder) => {
        GenericPageAsyncReducer(builder, HRRecruitmentGet);
        GenericPageAsyncReducer(builder, HRRecruitmentCreate);
        GenericPageAsyncReducer(builder, HRRecruitmentDelete);
    },
});

// HR Profiles
const HRProfilesGet = createGenericGetThunk("HRProfilesGet", HRProfilesPageEndPoints);
const HRProfilesDelete = createGenericDeleteThunk("HRProfilesDelete", HRProfilesPageEndPoints);
const HRProfilesSlice = createSlice({
    name: "HRProfilesPage",
    initialState,
    extraReducers: (builder) => {
        GenericPageAsyncReducer(builder, HRProfilesGet);
        GenericPageAsyncReducer(builder, HRProfilesDelete);
    },
});

export const HRLeaveThunks = { HRLeaveGet, HRLeaveUpdate, HRLeaveDelete };
export const HRSalaryThunks = { HRSalaryGet, HRSalaryCreate, HRSalaryUpdate, HRSalaryDelete };
export const HRAttendanceThunks = { HRAttendanceGet, HRAttendanceDelete };
export const HRNoticeThunks = { HRNoticeGet, HRNoticeCreate, HRNoticeDelete };
export const HRRecruitmentThunks = { HRRecruitmentGet, HRRecruitmentCreate, HRRecruitmentDelete };
export const HRProfilesThunks = { HRProfilesGet, HRProfilesDelete };

export {
    HRLeaveSlice,
    HRSalarySlice,
    HRAttendanceSlice,
    HRNoticeSlice,
    HRRecruitmentSlice,
    HRProfilesSlice,
};
