import React from "react";
import { Redirect, Switch, Route, useHistory } from "react-router-dom";


import Main from "./Main";
import PopupAddEvent from "./PopupAddEvent";
import PopupEditEvent from "./PopupEditEvent"
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import * as ApiAuth from "../utils/ApiAuth";
import { directoryHTTP } from "../utils/constants";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
    const [isEditSchedulePopupOpen, setIsEditSchedulePopupOpen] = React.useState(false);
    const [userSchedule , setUsersSchedule] = React.useState([]);
    const history =  useHistory();

    React.useEffect(() => {
        tokenCheck();
    }, []);

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/disco-events');
        }
    }, [history, loggedIn]);

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
                localStorage.setItem('xToken', token.auth); //временно надо http Only
                localStorage.setItem('refresh', token.refresh); //временно надо http Only
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log('Код ошибки:', err);
                console.log(`Справочник ошибок ${directoryHTTP}`)
            });
    }

    // 3. Проверка токена
    const tokenCheck = () => {
        const xToken = localStorage.getItem('xToken');
        console.log(xToken)

        if (!xToken) {
            return;
        }
        ApiAuth.getContent(xToken)
            .then((schedule) => {
                setLoggedIn(true);
                setUsersSchedule(schedule)
            })
            .catch((err) => {
                console.log('Код ошибки:', err);
                console.log(`Справочник ошибок ${directoryHTTP}`)
            });
    }

    // 4. Закрыть попапы
    const closeAllPopups = () => {
        setIsAddCardPopupOpen(false);
        setIsEditSchedulePopupOpen(false)
    }

    // 5. Открыть попап добавления расписания дискотеки
    const handleAddCardClick = () => {
        setIsAddCardPopupOpen(true);
    }

  // . Открыть попап редактирования расписания
    const handleEditScheduleClick = () => {
      setIsEditSchedulePopupOpen(true);
    }

    // Добавить карточку дискотеки
    const handleAddCard = (dataCardDisco) => {
        const xToken = localStorage.getItem('xToken');

        ApiAuth.addNewEvent(dataCardDisco, xToken)
            .then((newCard) => {
                console.log(newCard);
                setIsAddCardPopupOpen(false);
            })
            .catch((err) => {
                console.log('Код ошибки:', err);
                console.log(`Справочник ошибок ${directoryHTTP}`)
            });
    }

  return (
      <div className="page">
          <Switch>
              <ProtectedRoute
                  exact
                  isLoggedIn={loggedIn}
                  component={Main}
                  path={"/disco-events"}
                  addCardPopupClik={handleAddCardClick}
                  editSchedulePopupClick={handleEditScheduleClick}
                  schedule={userSchedule}
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
          formTitle={'Добавить мероприятие'}
          onClose={closeAllPopups}
          isOpen={isAddCardPopupOpen}
          onAddCard={handleAddCard}
        />
        <PopupEditEvent
          formTitle={'Редактировать мероприятие'}
          onClose={closeAllPopups}
          isOpen={isEditSchedulePopupOpen}
        />
      </div>
  );
}


export default App;
