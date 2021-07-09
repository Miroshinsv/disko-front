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
    const [cardScheduleData, setCardScheduleData] = React.useState({});
    const history =  useHistory();

    React.useEffect(() => {
        tokenCheck();
    }, []);

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/disco-events');
        }
    }, [history, loggedIn]);

    // 1. Регистрация пользователя
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

    // 2. Авторидзация пользователя
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
              setUsersSchedule(schedule)
              setLoggedIn(true);
            })
            .catch((err) => {
                console.log('Код ошибки:', err);
                console.log(`Справочник ошибок ${directoryHTTP}`)
            });
    }

    // . Разлогинить пользователя
    const onLogout = () => {
      setLoggedIn(false);
      localStorage.clear();
      console.log('Пользователь разлогирован');
    }

    // . Обновить расписание
    const handleUpdateSchedule = (updateData, id) => {
      const xToken = localStorage.getItem('xToken');
      console.log(id, 'получить')

      if (!xToken) {
        return;
      }
      ApiAuth.updateEvent(updateData, id, xToken)
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log('Код ошибки:', err);
          console.log(`Справочник ошибок ${directoryHTTP}`)
        })
    }

    // 4. Закрыть попапы
    const closeAllPopups = () => {
      setIsAddCardPopupOpen(false);
      setIsEditSchedulePopupOpen(false);
      setCardScheduleData({});
    }

    // 5. Открыть попап добавления расписания дискотеки
    const handleAddCardClick = () => {
        setIsAddCardPopupOpen(true);
    }

  // . Открыть попап редактирования расписания
    const handleEditScheduleClick = () => {
      setIsEditSchedulePopupOpen(true);
    }

    // . Передача данных расписания попупу редактирования
    const handleScheduleCardClick = (dataSchedule) => {
      setCardScheduleData(dataSchedule);
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
    <>
          <Switch>
              <ProtectedRoute
                  exact
                  isLoggedIn={loggedIn}
                  onLogout={onLogout}
                  component={Main}
                  path={"/disco-events"}
                  addCardPopupClik={handleAddCardClick}
                  editSchedulePopupClick={handleEditScheduleClick}
                  onEditShedulerCardClick={handleScheduleCardClick}
                  schedule={userSchedule}
              />
              <Route path={"/sign-in"}>
                  <Login onLogin={onLogin}/>
              </Route>
              <Route path={"/sign-up"}>
                  <Register onRegister={onRegister}/>
              </Route>
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
          schedule={cardScheduleData}
          isOpen={isEditSchedulePopupOpen}
          onUpdateSchedule={handleUpdateSchedule}
        />
    </>
  );
}


export default App;
