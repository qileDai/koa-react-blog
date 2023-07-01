import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.less';
import './assets/root.css';
import App from './App';
import { get, post, del, patch } from "./api/request";
import { apiUrl } from "./api/apiUrl";
import * as serviceWorker from './serviceWorker';
// import Router from './Router/router'
Component.prototype.get = get;
Component.prototype.post = post;
Component.prototype.del = del;
Component.prototype.patch = patch;
Component.prototype.api = apiUrl;
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
