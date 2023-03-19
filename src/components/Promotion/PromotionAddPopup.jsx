import { useFormik } from "formik";
import { useCallback, useState } from "react";
import "../Food/food.style.scss";
import { useDispatch } from "react-redux";
import { insertPromotionRequest } from "../../pages/PromotionManage/PromotionManageSlice";

function PromotionAdd({ closeModel, listPromo, listEvent }) {
  const dispatch = useDispatch();
  const [event, setEvent] = useState();

  // listEvent.map((event)=>{
  //   console.log(event);
  // });
  console.log(listPromo.find((item) => item.eventId === 4) === undefined);
  // listPromo.map((promo) => {
  //   console.log(promo);
  // });

  const handleInsertPromotion = useCallback(
    (values) => {
      let promo = {
        id: values.id,
        promotionCode: values.promotionCode,
        eventId: +values.eventId,
        discountPercent: values.discountPercent,
        status: values.status,
      };
      console.log("Promotion Insert: ", promo);
      dispatch(insertPromotionRequest(promo));
      closeModel(false);
    },
    [closeModel, dispatch]
  );

  const formik = useFormik({
    initialValues: {
      id: 0,
      promotionCode: "",
      eventId: 1,
      discountPercent: "",
      status: true,
    },
    onSubmit: (values, { resetForm }) => {
      handleInsertPromotion(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="popup">
      <form
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="form-up"
        style={{ width: "450px", height: "550px" }}
      >
        <div className="food__title unselectable">Thông tin voucher</div>
        <div className="center">
          <div className="listitem">
            <label className="label__title">
              Mã khuyến mãi:<span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
            <label className="label__title">
              Phần trăm khuyến mãi (%):<span className="proirity">*</span>
            </label>
            <input
              type="number"
              min={0}
              max={100}
              id="discountPercent"
              value={formik.values.discountPercent}
              onChange={formik.handleChange}
            />
            <label className="label__title">
              Code khuyến mãi:<span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="promotionCode"
              value={formik.values.promotionCode}
              onChange={formik.handleChange}
            />
            <label className="label__title">
              Sự kiện đi kèm:<span className="proirity">*</span>
            </label>
            <select
              id="eventId"
              name="eventId"
              value={formik.values.eventId}
              onChange={formik.handleChange}
            >
              {listEvent.map((item) => {
                if (listPromo.find((promo) => promo.eventId === item.eventId)) {
                  return null;
                } else {
                  return (
                    <option key={item.eventId} value={item.eventId}>
                      {item.eventName}
                    </option>
                  );
                }
              })}
            </select>
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              checked={formik.values.status}
              onChange={formik.handleChange}
            />
          </div>
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
      </form>
    </div>
  );
}

export default PromotionAdd;
