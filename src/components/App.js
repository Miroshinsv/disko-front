import React from "react";
import { Redirect, Switch, Route, useHistory } from "react-router-dom";


import Main from "./Main";
import PopupAddEvent from "./PopupAddEvent";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import * as ApiAuth from "../utils/ApiAuth";
import { directoryHTTP } from "../utils/constants";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
    const history =  useHistory();

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

        return ApiAuth
            .login(loginData)
            .then((token) => {
                localStorage.setItem('jwt', token); //временно надо http Only
                setLoggedIn(true)
                console.log(loggedIn);
            })
            .catch((err) => {
                console.log('Код ошибки:', err);
                console.log(`Справочник ошибок ${directoryHTTP}`)
            });
    }

    // 3. Проверка токена
    const tokenCheck = () => {
        // if (!jwt) {
        //     return;
        // }
        // return;
    }

    // 4. Закрыть попапы 
    const closeAllPopups = () => {
        setIsAddCardPopupOpen(false);
    }

    // 5. Открыть попап добавления карточки дискотеки
    const handleAddCardClick = () => {
        setIsAddCardPopupOpen(true);
    }

    // Добавить карточку дискотеки
    const handleAddCard = (dataCardDisco) => {
        console.log('Данные дискотеки', dataCardDisco);
        //Позже добавить метод отправки данных на сервер
        setIsAddCardPopupOpen(false); //! Перенести в промис then
    }

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/disco-events');
        }
    }, [history, loggedIn]);

  return (
      <div className="page">
          <Switch>
              <ProtectedRoute
                  exact
                  isLoggedIn={loggedIn}
                  component={Main}
                  path={"/disco-events"}
                  addCardPopupClik={handleAddCardClick}
              />
              <Route path={"/sign-in"}>
                  <Login onLogin={onLogin}/>
              </Route>
              <Route path={"/sign-up"}>
                  <Register onRegister={onRegister}/>
              </Route>
              {/*<Route path={"/disco-events"}>*/}
              {/*    <Header />*/}
              {/*    <Main />*/}
              {/*</Route>*/}
              <Route path="/">
                  {loggedIn ? <Redirect to="/disco-events"/> : <Redirect to="/sign-in"/>}
              </Route>
          </Switch>
          <PopupAddEvent 
                onClose={closeAllPopups}
                isOpen={isAddCardPopupOpen} 
                onAddCard={handleAddCard}
            />
      </div>
  );
}


export default App;
