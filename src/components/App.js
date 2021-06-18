import React from "react";
import { Redirect, Switch, Route, useHistory } from "react-router-dom";


import Main from "./Main";
import PopupAddEvent from "./PopupAddEvent";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import * as ApiAuth from "../utils/ApiAuth";
import { directoryHTTP } from "../utils/constants";

function App() {

    // 1. Регистрация пользовотеля
    const onRegister = (registerData) => {
        console.log(`Попытка регистрации, log: ${registerData}`)

        return ApiAuth
            .register(registerData)
            .then((res) => {
                console.log(`Регистрация пройдена, log: ${res}`);
            })
            .catch((err) => {
                console.log('Код ошибки:', err);
                console.log(`Справочник ошибок ${directoryHTTP}`)
            });
    }

    // 2. Авторидзация пользовотеля
    const onLogin = (loginData) => {
        console.log(`Попытка попытка, log: ${loginData}`)

        return ApiAuth
            .login(loginData)
            .then((token) => {
                console.log(`Авторизация пройдена, log: ${token}`);
                localStorage.setItem('jwt', token); //временно
            })
            .catch((err) => {
                console.log('Код ошибки:', err);
                console.log(`Справочник ошибок ${directoryHTTP}`)
            });
    }

  return (
      <div className="page">
          <Switch>
              <Route path={"/sign-in"}>
                  <Register onRegister={onRegister}/>
              </Route>
              <Route path={"/sign-up"}>
                  <Login onLogin={onLogin}/>
              </Route>
              <Route path={"/disco-events"}>
                  <Header />
                  <Main />
              </Route>

            <PopupAddEvent />
          </Switch>
      </div>
  );
}


export default App;
