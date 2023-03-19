import { useFormik } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateFoodRequest } from "../../pages/FoodManager/foodManageSlice";
import UploadImage from "../../ultil/UploadImage";
function FoodEdit({
  data,
  closeModel,
  listCate,
  cateId,
  listRegion,
  regionId,
}) {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const handleUpdateFood = useCallback(
    (values) => {
      let food = {
        id: values.id,
        foodName: values.foodName,
        description: values.description,
        price: values.price,
        imgUrl: values.imageUrl,
        status: values.status,
        cateId: values.cateId,
        purchaseNum: 0,
        regionId: values.regionId,
      };
      closeModel(false);
      console.log("FOOD EDIT", values);
      dispatch(updateFoodRequest(food));
    },
    [dispatch, closeModel]
  );
  const formik = useFormik({
    initialValues: {
      id: data.id,
      foodName: data.foodName,
      description: data.description,
      price: data.price,
      imgUrl: data.imgUrl,
      status: data.status,
      purchaseNum: data.purchaseNum,
      cateId: cateId,
      regionId: regionId,
    },
    onSubmit: (values, { resetForm }) => {
      handleUpdateFood(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="popup">
      <form
        className="form-up"
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="food__title unselectable">Thông tin món ăn</div>
        <div className="left">
          <div className="img__item">
            <img
              className="image"
              src={
                data.imgUrl
                  ? data.imgUrl
                  : imageUrl
                  ? imageUrl
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="listitem">
            <label className="label__title">
              Mã món ăn: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
            <label className="label__title">Tên món ăn:</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={formik.values.foodName}
              onChange={formik.handleChange}
            />
            <label className="label__title">Giá (VND):</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <label className="label__title">Loại:</label>
            <select
              id="cateId"
              name="cateId"
              value={formik.values.cateId}
              onChange={formik.handleChange}
            >
              {listCate.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
            <label className="label__title">
              Vùng/Miền: <span className="proirity">*</span>
            </label>
            <select
              id="regionId"
              name="regionId"
              value={formik.values.regionId}
              onChange={formik.handleChange}
            >
              {listRegion.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.region_name}
                  </option>
                );
              })}
            </select>
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              checked={formik.values.status}
            />
          </div>
        </div>
        <div className="right">
          <div className="listitem">
            <label className="label__title">Hình ảnh</label>
            <UploadImage getImageURL={setImageUrl} />
            <label className="label__title">
              {" "}
              Mô tả: <span className="proirity">*</span>
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <div className="food__button">
              <button type="submit" className="btn">
                Lưu
              </button>
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
      </form>
    </div>
  );
}

export default FoodEdit;
