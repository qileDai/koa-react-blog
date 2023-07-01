// import api from './api'
import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom'
import { Provider } from "react-redux";

//引入PersistGate标签，和persistor
import { PersistGate } from "redux-persist/lib/integration/react";
import store from "./store/index";
import { persistor } from "./store";
import routes from './Router'
import requireLogin from './requireLogin'
import Login from './pages/admin/login'

class App extends Component {
  render() {
    return (
       <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <div>
            <Route exact path="/" render={() => <Redirect to="/web/index" push />} />
            <Route path='/login' component={Login} />
            {routes.map((route, i) => (
              <Route
              key={i}
              path={route.path}
              component={
                route.path.includes('/admin')
                ? requireLogin(route.component)
                : route.component
              }
            />
            ))}
            </div>
          </PersistGate>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
