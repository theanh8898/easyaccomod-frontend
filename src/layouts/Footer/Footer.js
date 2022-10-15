import React from 'react';
import './Footer.scss'
import {Link} from "react-router-dom";
import fbIcon from "../../assets/images/icons/facebook-square-brands.svg";
import twitterIcon from "../../assets/images/icons/twitter-square-brands.svg";
import insIcon from "../../assets/images/icons/instagram-square-brands.svg";
import './Footer.scss'


function Footer(props) {
  return (
    <footer className="footer">
      <div className="grid wide">
        <div className="footer__wrap">
          <div className="row">
            <div className="col c-12 m-6 l-3">
              <div className="footer-col">
                <h3 className="footer-col__title">Chăm sóc khách hàng</h3>
                <ul className="footer-col__links">
                  <li className="footer-col-link-item">
                    <Link to={``}>Trung tâm trợ giúp</Link>
                  </li>
                  <li className="footer-col-link-item">
                    <Link to={``}>F<small>&</small>Q</Link>
                  </li>
                  <li className="footer-col-link-item">
                    <Link to={``}>Hướng dẫn mua hàng</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col c-12 m-6 l-3">
              <div className="footer-col">
                <h3 className="footer-col__title">Giới thiệu</h3>
                <ul className="footer-col__links">
                  <li className="footer-col-link-item">
                    <Link to={``}>Giới thiệu</Link>
                  </li>
                  <li className="footer-col-link-item">
                    <Link to={``}>Tuyển dụng</Link>
                  </li>
                  <li className="footer-col-link-item">
                    <Link to={``}>Liên hệ</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col c-12 m-6 l-3">
              <div className="footer-col">
                <h3 className="footer-col__title">Chính sách</h3>
                <ul className="footer-col__links">
                  <li className="footer-col-link-item">
                    <Link to={``}>Chính sách bảo mật</Link>
                  </li>
                  <li className="footer-col-link-item">
                    <Link to={``}>Nội quy</Link>
                  </li>
                  <li className="footer-col-link-item">
                    <Link to={``}>Quyền lợi khách hàng</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col c-12 m-6 l-3">
              <div className="footer-col">
                <h3 className="footer-col__title">Theo dõi</h3>
                <ul className="footer-col__links social-list">
                  <li className="footer-col-link-item">
                    <Link to={``}>
                      <img src={fbIcon} alt="fb-icon"/>
                      <span>Facebook</span>
                    </Link>
                  </li>
                  <li className="footer-col-link-item">
                    <Link to={``}>
                      <img src={insIcon} alt="instagram-icon"/>
                      <span>Instagram</span>
                    </Link>
                  </li>
                  <li className="footer-col-link-item">
                    <Link to={``}>
                      <img src={twitterIcon} alt="twitter-icon"/>
                      <span>Twitter</span>
                    </Link>
                  </li>

                </ul>
              </div>
            </div>



          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="grid wide">
          <p className="footer__text">Copyright© 2020 - Bản quyền thuộc về Easy Accomod.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;