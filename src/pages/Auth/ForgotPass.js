import React from 'react';
import {Link} from "react-router-dom";
import './Auth.scss';

function ForgotPass(props) {
  return (
    <div className="auth-page forgot-page page-paper">
      <div className="grid wide">
        <div className="auth-page__wrapper">
          <h2 className="auth-page__heading">Quên mật khẩu ?</h2>
          <div className="auth-page__body">
            <form className="auth-form">

              <div className="input-group">
                <label className="input__label">Email đăng ký:</label>
                <input className="input__text" type="email" placeholder="Email của bạn" required={true}/>
              </div>


              <button className="auth-form-btn">Xác nhận</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ForgotPass;