import React from 'react';
import './UserRating.scss'
import NewStarRating from "../RattingStarts/NewStarRatting";
import {Formik} from "formik";
import {createRatingAPI} from "../../api";
import {toast} from "react-toastify";

function UserRating({roomId, onSuccess}) {
  const handleSubmitForm = (values, {resetForm}) => {
    if (!values.rate) {
      toast.warning("Bạn phải đánh giá trước khi gửi bình luận", {autoClose: 2000});
      return false;
    } else {
      createRatingAPI({...values, room_id: roomId}).then(res => {
        toast.success("Đánh giá phòng thành công", {autoClose: 2000});
        resetForm({});
        onSuccess(res.data.data.id);
      }).catch(error => {
        console.log(error);
      });
    }
  };

  return (
    <div className="user-rating">
      <h3 className="user-rating__title">
        Đánh giá của bạn
      </h3>
      <Formik
        initialValues={{
          comment: '',
        }}
        onSubmit={handleSubmitForm}
      >
        {({
            values,
            handleChange,
            handleSubmit,
          }) => (
          <div className="user-rating__wrapper">
            <div className="user-rating-star">
              <NewStarRating name="rate"/>
            </div>
            <form className="user-rating-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <textarea
                  rows="5"
                  value={values.comment}
                  onChange={handleChange}
                  name="comment"
                  placeholder="Nhập bình luận của bạn..."
                />
                <button type="submit">Bình luận</button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default UserRating;