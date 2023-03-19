import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../NotificationConfirm/NotificationConfirm";
import "./adminpage.style.scss";
import ProfileViewPopup from "./ViewProfilePopup";
import { USER_LOGIN } from "../../ultil/settingSystem";
import SettingViewPopup from "./ViewSettingPopup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoleRequest } from "../../pages/AccountManager/AccountManageSlice";
import { getNotificationRequest } from "./NotificationSlice";
import NotificationSound from "../../assets/notification2.mp3";
import ReactHowler from "react-howler";
function AdminPage({ children }) {
  const navigate = useNavigate();
  const [popupProfile, setPopupProfile] = useState(false);
  const [popupSetting, setPopupSetting] = useState(false);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    openNotification("success", "Thành Công", "Bạn đã thao tác thành công");
  };
  let staff = JSON.parse(localStorage.getItem(USER_LOGIN));
  let subMenuNotifi = document.getElementById("subMenuNotifi");
  const dispatch = useDispatch();
  const listRole = useSelector((state) => state.accountManage.listRole);
  const listNotification = useSelector(
    (state) => state.notificationManage.notificationList
  );
  if (staff.theAccountForStaff.roleId === 3) {
    // setInterval(
    //   () =>
    //     dispatch(getNotificationRequest(staff.theAccountForStaff.accountId)),
    //   60000
    // );
  }
  useEffect(() => {
    dispatch(getRoleRequest());
    if (staff.theAccountForStaff.roleId === 3) {
      // dispatch(getNotificationRequest(staff.theAccountForStaff.accountId));
    }
  }, []);
  const showProfile = () => {
    setPopupProfile(!popupProfile);
  };
  const showSetting = () => {
    setPopupSetting(!popupSetting);
  };
  const toggleMenuNotifi = () => {
    subMenuNotifi.classList.toggle("open-menu-notifi");
  };
  return (
    <div className="admin-page">
      {popupProfile ? (
        <ProfileViewPopup
          closeModel={setPopupProfile}
          data={staff}
          listRole={listRole}
        />
      ) : (
        <></>
      )}
      {popupSetting ? (
        <SettingViewPopup closeModel={setPopupSetting} data={staff} />
      ) : (
        <></>
      )}
      <div className="admin-page__header">
        <div className="admin-page__header-left">
          <h4>Hello, {staff.staffFullName}</h4>
        </div>
        <div className="admin-page__header-right">
          <div
            className="notification"
            onClick={() => {
              toggleMenuNotifi();
            }}
          >
            <i className="fa-solid fa-bell icon"></i>
            {staff.theAccountForStaff.roleId === 3 ? (
              <div className="counter animate__animated animate__heartBeat animate__infinite">
                {
                  listNotification.filter((item) => item.checked === false)
                    ?.length
                }
              </div>
            ) : (
              <div className="counter">0</div>
            )}

            <div className="sub-menu-notifi" id="subMenuNotifi">
              <div className="sub-menu">
                <div className="sub-menu-top">
                  <div>
                    <span>Thông báo mới nhận</span>
                  </div>
                  {listNotification.length > 0 && (
                    <ReactHowler src={NotificationSound} playing={true} />
                  )}
                  {listNotification.length > 0 &&
                    openNotification(
                      "warning",
                      "Thông Báo",
                      "Bạn có thông báo mới"
                    )}
                </div>
                {staff.theAccountForStaff.roleId === 3 &&
                listNotification.length !== 0 ? (
                  <div className="sub-menu-center">
                    {listNotification.map((item, index) => (
                      <div className="sub-menu-item">
                        <p style={{ fontSize: "15px" }}>
                          {item.checked ? (
                            <i className="fa-solid fa-bell-slash icon"></i>
                          ) : (
                            <i className="fa-regular fa-bell icon animate__animated animate__heartBeat animate__infinite"></i>
                          )}
                          {item.message}
                        </p>
                      </div>
                    ))}
                    <div className="sub-menu-footer">
                      {staff.theAccountForStaff.roleId === 3 &&
                      listNotification.length !== 0 ? (
                        <div
                          className="buttonViewAll"
                          // onClick={() => {
                          //   handleViewAllNotifi();
                          // }}
                        >
                          <p>Xem tất cả</p>
                        </div>
                      ) : (
                        <div className="buttonViewAll">
                          <span>Xem tất cả</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="sub-menu-center">
                    <div className="sub-menu-item notifi">
                      <i className="fa-solid fa-bell-slash icon"></i>
                      <p>Bạn chưa có thông báo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropdown__select">
              <img
                style={{ marginLeft: "30px" }}
                src={
                  staff.staffAvatarUrl
                    ? staff.staffAvatarUrl
                    : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                }
                alt=""
              />
              <span className="dropdown__text unselectable">
                {staff.staffFullName.split(" ")[
                  staff.staffFullName.split(" ").length - 1
                ] +
                  " " +
                  staff.staffFullName.split(" ")[0]}
              </span>
              <i
                className="fa-sharp fa-solid fa-caret-down dropdown__caret"
                style={{ color: "black" }}
              ></i>
            </div>
            <ul className="dropdown__list">
              <li
                className="dropdown__item"
                onClick={() => {
                  showProfile();
                }}
              >
                <i className="fa-solid fa-user"></i>
                <span className="dropdown__text unselectable">
                  Thông tin cá nhân
                </span>
              </li>
              <li
                className="dropdown__item"
                onClick={() => {
                  showSetting();
                }}
              >
                <i className="fa-solid fa-gear"></i>
                <span className="dropdown__text unselectable">Cài đặt</span>
              </li>
              <li className="dropdown__item">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="dropdown__text unselectable" onClick={logout}>
                  Đăng xuất
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="admin-page__body">{children}</div>
    </div>
  );
}

export default AdminPage;
