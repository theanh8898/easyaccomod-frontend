import React from 'react';
import BreadcrumbItem from "./BreadcrumbItem";
import './Breadcrumb.scss';

export const Breadcrumb = ({children}) => (
  <section className="breadcrumb-section">
    <div className="grid wide">
      <nav className="breadcrumb-nav">
        <ul className="breadcrumb">
          <BreadcrumbItem path="/" text={<><i className="fas fa-home"/> <span className="hide-mobile">Trang chủ</span></>}/>
          {children}
        </ul>
      </nav>
    </div>
  </section>
);