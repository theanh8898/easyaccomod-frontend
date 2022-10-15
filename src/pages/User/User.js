import React from 'react';
import {Link, Route} from 'react-router-dom';
import './User.scss';

import Sidebar from "./__components/Sidebar/Sidebar";
import Profile from "./__components/Profile/Profile";
import Notifications from "./__components/UserNotification/Notifications";
import Favorites from "./__components/Favorites/Favorites";
import CreatePost from "./__components/CreatePost/CreatePost";
import CreateAttributes from "./__components/CreateAttributes/CreateAttributes";
import Accounts from "./__components/Accounts/Accounts";
import UserPosts from "./__components/UserPosts/UserPosts";
import Invoices from "./__components/Invoices/Invoices";

function User() {
  return (
    <div className="user-page page-paper">
      <div className="grid wide">
        <div className="user-page__wrapper">
          <div className="row">
            <div className="col c-12 m-12 l-3">
              <Sidebar/>
            </div>
            <div className="col c-12 m-12 l-9">
              <div className="user-page-main">
                <Route path="/user/profile" component={Profile} exact={true}/>
                <Route path="/user/notifications" component={Notifications} exact={true}/>
                <Route path="/user/favorites" component={Favorites} exact={true}/>
                <Route path="/user/post/create" component={CreatePost} exact={true}/>
                <Route path="/user/post/all" component={UserPosts} exact={true}/>
                <Route path="/admin/post/attributes" component={CreateAttributes} exact={true}/>
                <Route path="/admin/accounts/all" component={Accounts} exact={true}/>
                <Route path="/admin/post/all" component={UserPosts} exact={true}/>
                <Route path="/admin/post/create" component={CreatePost} exact={true}/>
                <Route path="/admin/invoices" component={Invoices} exact={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
