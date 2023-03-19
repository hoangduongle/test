import { call, put, takeLatest } from "redux-saga/effects";
import {
  getNotificationFailure,
  getNotificationRequest,
  getNotificationSuccess,
} from "../../components/AdminPage/NotificationSlice";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import { notificationService } from "../../services/notificationService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getNotification(action) {
  try {
    let notification = yield call(() => {
      return notificationService.getNotification(action.payload);
    });
    if (notification.status === STATUS_CODE.SUCCESS) {
      yield put(getNotificationSuccess(notification.data));
    }
  } catch (error) {
    yield put(getNotificationFailure(error));
  }
}
export function* followActionGetNotification() {
  yield takeLatest(getNotificationRequest, getNotification);
}
