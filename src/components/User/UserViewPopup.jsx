import "./useredit.style.scss";
function UserView({ data, closeModel }) {
  console.log(data);
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <div className="form-container">
          <div className="left">
            <img
              className="avatar"
              src={
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="right">
            <label>
              Mã nhân viên: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              disabled
              id="staffId"
              name="staffId"
              value={data.staffId}
            />
            <label>
              Tên đăng nhập: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              disabled
              id="accountId"
              name="accountId"
              value={data.theAccountForStaff.accountId}
            />
            <label>
              Mật khẩu: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="password"
              id="password"
              name="password"
              value={"an mat khau rui hehe"}
            />
            <label>
              Họ và tên: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="staffFullName"
              name="staffFullName"
              value={data.staffFullName}
            />

            <label>
              Chức danh: <span className="proirity">*</span>
            </label>
            <select id="roleId" name="roleId" value={data.roleId}>
              <option value={3}>MANAGER</option>
              <option value={4}>STAFF</option>
            </select>

            <label>
              Email: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="staffEmail"
              name="staffEmail"
              value={data.staffEmail}
            />

            <label>
              Số điện thoại: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={data.theAccountForStaff.phoneNumber}
            />

            <label>Trạng thái: </label>
            <br></br>
            <input
              disabled
              className="checkBoxStatus type"
              type="checkbox"
              id="staffStatus"
              name="staffStatus"
              checked={data.staffStatus}
            />
            <button
              type="button"
              className="btn cancel"
              onClick={() => closeModel(false)}
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
