import { useFormik } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateServiceRequest } from "../../pages/ServiceManage/ServiceManageSlice";
import UploadImage from "../../ultil/UploadImage";
import "../Food/food.style.scss";

function ServiceEdit({ closeModel, data }) {
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const handleUpdateService = useCallback(
    (values) => {
      let service = {
        id: values.id,
        serviceName: values.serviceName,
        serviceImage: imageUrl === "" ? values.serviceImage : imageUrl,
        serviceDescription: values.serviceDescription,
        servicePrice: values.servicePrice,
        status: true,
      };
      console.log("SERVICE", service);
      closeModel(false);
      dispatch(updateServiceRequest(service));
    },
    [dispatch, closeModel, imageUrl]
  );
  const formik = useFormik({
    initialValues: {
      id: data.id,
      serviceName: data.serviceName,
      servicePrice: data.servicePrice,
      serviceDescription: data.serviceDescription,
      serviceImage: data.serviceImage,
      status: data.status,
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handleUpdateService(values);
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
        style={{ height: "400px" }}
      >
        <div className="food__title unselectable">Thông tin dịch vụ</div>
        <div className="left">
          <div className="img__item">
            <img
              className="image"
              src={
                imageUrl
                  ? imageUrl
                  : data.serviceImage
                  ? data.serviceImage
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="listitem">
            <label className="label__title">
              Mã dịch vụ: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
            <label className="label__title">Tên dịch vụ:</label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              value={formik.values.serviceName}
              onChange={formik.handleChange}
            />
            <label className="label__title">Giá (VND):</label>
            <input
              type="text"
              id="servicePrice"
              name="servicePrice"
              value={formik.values.servicePrice}
              onChange={formik.handleChange}
            />
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
              Mô tả: <span className="proirity">*</span>
            </label>
            <textarea
              type="text"
              id="serviceDescription"
              name="serviceDescription"
              value={formik.values.serviceDescription}
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

export default ServiceEdit;
