import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import "../Food/food.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRequest } from "../../pages/CategoryManager/CategoryManageSlice";
import { insertEventRequest } from "../../pages/EventManager/eventManagerSlice";
import UploadImage from "../../ultil/UploadImage";

function EventAdd({ closeModel }) {
  const dispatch = useDispatch();
  const listCate = useSelector((state) => state.categoryManage.listCategory);
  const [imageUrl, setImageUrl] = useState("");
  const [listFood, setListFood] = useState([]);
  const [selected, setSelected] = useState([]);
  const dataSelected = [];

  useEffect(() => {
    dispatch(getCategoryRequest());
  }, [dispatch]);
  
  useEffect(() => {
    if (listFood.length === 0) {
      handleChangeCate(1);
    }
  }, []);

  const handleChangeCate = (e) => {
    let eId = e !== 1 ? +e.target.value : 1;
    setListFood([]);
    listCate.forEach((item) => {
      if (item.id === eId) {
        item.foodList.forEach((food) => {
          let data = selected.find((item) => item.id === food.id);
          let checked = false;
          if (data !== undefined) {
            checked = data["isChecked"];
          }
          setListFood((prev) => [
            ...prev,
            {
              id: food.id,
              label: food.foodName,
              isChecked: checked,
            },
          ]);
        });
      }
    });
  };

  const handleRemoveSelected = (itemId) => {
    let selectedCopy = [...selected];
    let index = selectedCopy.findIndex((obj) => obj.id === itemId);
    if (index > -1) {
      selectedCopy.splice(index, 1);
      setSelected(selectedCopy);
      let newIndex = listFood.findIndex((item) => item.id === itemId);
      if (newIndex > -1) {
        listFood[newIndex]["isChecked"] = false;
      }
      setListFood(listFood);
    }
  };

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    let foodId = +e.target.id;
    if (selected.length === 0) {
      if (isChecked) {
        let newData = listFood.find((item) => item.id === foodId);
        newData["isChecked"] = true;
        setSelected((prev) => [...prev, newData]);
      }
    } else if (selected.length !== 0) {
      let existingFood = selected.find((item) => item.id === foodId);
      if (isChecked) {
        if (!existingFood) {
          let newData = listFood.find((item) => item.id === foodId);
          newData["isChecked"] = true;
          setSelected((prev) => [...prev, newData]);
        }
      } else {
        //check = false, id exit
        if (existingFood) {
          let index = selected.findIndex((obj) => obj === existingFood);
          if (index > -1) {
            selected.splice(index, 1);
            setSelected((prev) => [...prev]);
            let newIndex = listFood.findIndex((item) => item.id === foodId);
            if (newIndex > -1) {
              listFood[newIndex]["isChecked"] = false;
            }
            setListFood(listFood);
          }
        }
      }
    }
  };

  const handleUpdateEvent = useCallback(
    (values) => {
      let event = {
        eventId: values.eventId,
        eventName: values.eventName,
        description: values.description,
        image_url: imageUrl,
        fromDate: values.fromDate,
        toDate: values.toDate,
        status: values.status,
        foodList: dataSelected,
      };
      console.log("Event Insert: ", event);
      dispatch(insertEventRequest(event));
      closeModel(false);
    },
    [closeModel, dataSelected, dispatch, imageUrl]
  );

  const getFooddetail = (id) => {
    let result = [];
    listCate.forEach((item) => {
      result.push(item.foodList.find((food) => food.id === id));
    });
    return result;
  };

  const formik = useFormik({
    initialValues: {
      eventId: 0,
      eventName: "",
      description: "",
      image_url: "",
      fromDate: "",
      toDate: "",
      status: "",
      foodList: [],
    },
    onSubmit: (values, { resetForm }) => {
      selected.forEach((item, index) => {
        dataSelected.push({
          id: selected[index].id,
          foodName: selected[index].label,
          description:
            getFooddetail(selected[index].id)[1]["description"] ?? "",
          price: +getFooddetail(selected[index].id)[1]["price"],
          imgUrl: getFooddetail(selected[index].id)[1]["imgUrl"],
          listComment: getFooddetail(selected[index].id)[1]["listComment"],
        });
      });
      handleUpdateEvent(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="popup">
      <form
        className="form-up"
        style={{ width: "1000px" }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="food__title unselectable">Thông tin sự kiện</div>
        <div className="left" style={{ width: "50%" }}>
          <div className="img__item">
            <img
              className="image"
              src={
                imageUrl
                  ? imageUrl
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="listitem">
            <label className="label__title">Mã sự kiện:</label>
            <input
              disabled
              type="text"
              id="eventId"
              value={formik.values.eventId}
              onChange={formik.handleChange}
            />
            <label className="label__title">
              Tên sự kiện: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="eventName"
              value={formik.values.eventName}
              onChange={formik.handleChange}
            />
            <label className="label__title">
              Thời gian:<span className="proirity">*</span>
            </label>
            <input
              type="date"
              id="fromDate"
              value={formik.values.fromDate}
              onChange={formik.handleChange}
            />
            <label className="label__title smallText"> Đến ngày:</label>
            <input
              type="date"
              id="toDate"
              value={formik.values.toDate}
              onChange={formik.handleChange}
            />
            <label className="label__title">Hình ảnh</label>
            <UploadImage getImageURL={setImageUrl} />
            <label className="label__title">Mô tả:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
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
        </div>
        <div className="right" style={{ width: "50%" }}>
          <div className="listitem" style={{ width: "450px" }}>
            <label className="label__title">Loại:</label>
            <select id="cateId" name="cateId" onChange={handleChangeCate}>
              {listCate.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
            <label className="label__title">Danh sách món ăn:</label>
            <div className="list__food">
              <ul>
                {listFood.map((item) => {
                  return (
                    <li key={item.id}>
                      <span className="title unselectable">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        onClick={() =>
                          (document.getElementById(item.id).checked =
                            !item.isChecked)
                        }
                        onChange={handleChange}
                        id={item.id}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <label className="label__title">Các món đã chọn:</label>
            <div className="list__food1">
              <ul>
                {selected.map((item) => {
                  return (
                    <li key={item.id}>
                      <span className="title unselectable">{item.label}</span>

                      <i
                        className="fa-solid fa-trash btn__remove unselectable"
                        onClick={() => handleRemoveSelected(item.id)}
                      />
                    </li>
                  );
                })}
              </ul>
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
        </div>
      </form>
    </div>
  );
}

export default EventAdd;
