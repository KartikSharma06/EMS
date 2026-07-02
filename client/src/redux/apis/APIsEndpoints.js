export const APIsEndPoints = {
    LOGIN: "/api/auth/employee/login",
    CHECKELOGIN: "/api/auth/employee/check-login",
    FORGOT_PASSWORD: "/api/auth/employee/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/employee/reset-password/${token}`
}

export const HREndPoints = {
    SIGNUP: "/api/auth/HR/signup",
    CHECKLOGIN: "/api/auth/HR/check-login",
    LOGIN: "/api/auth/HR/login",
    LOGOUT: "/api/auth/HR/logout",
    VERIFY_EMAIL: "/api/auth/HR/verify-email",
    CHECK_VERIFY_EMAIL: "/api/auth/HR/check-verify-email",
    RESEND_VERIFY_EMAIL: "/api/auth/HR/resend-verify-email",
    FORGOT_PASSWORD: "/api/auth/HR/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/HR/reset-password/${token}` 
}

export const DashboardEndPoints = {
    GETDATA: "/api/v1/dashboard/HR-dashboard"
}

export const HREmployeesPageEndPoints = {
    GETALL: "/api/v1/employee/all",
    ADDEMPLOYEE: "/api/auth/employee/signup",
    GETONE: (EMID) => `/api/v1/employee/by-HR/${EMID}`,
    DELETE: (EMID) => `/api/v1/employee/delete-employee/${EMID}`
}

export const HRDepartmentPageEndPoints = {
    GETALL: "/api/v1/department/all",
    CREATE: "/api/v1/department/create-department",
    UPDATE: "/api/v1/department/update-department",
    DELETE: "/api/v1/department/delete-department"
}

export const EmployeesIDsEndPoints = {
    GETALL: "/api/v1/employee/all-employees-ids",
}

export const HRLeavePageEndPoints = {
    GETALL: "/api/v1/leave/all",
    UPDATE: "/api/v1/leave/HR-update-leave",
    DELETE: (leaveID) => `/api/v1/leave/delete-leave/${leaveID}`
}

export const HRSalaryPageEndPoints = {
    GETALL: "/api/v1/salary/all",
    CREATE: "/api/v1/salary/create-salary",
    UPDATE: "/api/v1/salary/update-salary",
    DELETE: (salaryID) => `/api/v1/salary/delete-salary/${salaryID}`
}

export const HRAttendancePageEndPoints = {
    GETALL: "/api/v1/attendance/all",
    DELETE: (attendanceID) => `/api/v1/attendance/delete-attendance/${attendanceID}`
}

export const HRNoticePageEndPoints = {
    GETALL: "/api/v1/notice/all/",
    CREATE: "/api/v1/notice/create-notice",
    DELETE: (noticeID) => `/api/v1/notice/delete-notice/${noticeID}`
}

export const HRRecruitmentPageEndPoints = {
    GETALL: "/api/v1/recruitment/all",
    CREATE: "/api/v1/recruitment/create-recruitment",
    DELETE: (recruitmentID) => `/api/v1/recruitment/delete-recruitment/${recruitmentID}`
}

export const HRProfilesPageEndPoints = {
    GETALL: "/api/v1/HR/all",
    DELETE: (HRID) => `/api/v1/HR/delete-HR/${HRID}`
}