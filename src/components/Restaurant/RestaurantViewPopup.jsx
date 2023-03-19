import "../User/useredit.style.scss";
function RestaurantView({ data, closeModel }) {
  console.log(data);
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <form action="" className="form-container">
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
            <label>Mã nhà hàng:</label>
            <input type="text" defaultValue={data.restaurantId} readOnly />
            <label>Tên nhà hàng:</label>
            <input type="text" defaultValue={data.restaurantName} disabled />

            <label>Số điện thoại:</label>
            <input type="text" defaultValue={data.restaurantNumber} disabled />

            <label>Người quản lý:</label>
            <input type="text" defaultValue={data.restaurantName} disabled />

            <label>Địa chỉ:</label>
            <input
              type="text"
              defaultValue={data.restaurantLocation}
              disabled
            />
            <label>Trạng thái: </label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              disabled
              checked={data.status}
            />
            <button
              type="button"
              className="btn cancel"
              onClick={() => closeModel(false)}
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestaurantView;
