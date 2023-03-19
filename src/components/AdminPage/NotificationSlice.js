import { createSlice } from "@reduxjs/toolkit";

export const NotificationSlice = createSlice({
  name: "notificationManage",
  initialState: {
    notificationList: [],
  },
  reducers: {
    //Get Notification
    getNotificationRequest: (state, action) => {},
    getNotificationSuccess: (state, action) => {
      state.notificationList = action.payload;
    },
    getNotificationFailure: (state) => {
      return state;
    },
  },
});

export const {
  getNotificationRequest,
  getNotificationSuccess,
  getNotificationFailure,
} = NotificationSlice.actions;
export default NotificationSlice.reducer;
