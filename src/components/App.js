import React from "react";
import {Helmet} from "react-helmet";
import {Redirect, Switch, Route, useHistory} from "react-router-dom";

import Main from "./Main";
import PopupAddEvent from "./PopupAddEvent";
import PopupEditEvent from "./PopupEditEvent"
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import * as ApiAuth from "../utils/ApiAuth";
import * as API from "../utils/API";
import {directoryHTTP} from "../utils/constants";
import ProtectedRoute from "./ProtectedRoute";
import PopupAddDaysEvent from "./PopupAddDaysEvent";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isAddDaysPopupOpen, setIsAddDaysPopupOpen] = React.useState(false)
  const [isEditSchedulePopupOpen, setIsEditSchedulePopupOpen] = React.useState(false);
  const [userSchedule, setUsersSchedule] = React.useState([]);
  const [city, setCity] = React.useState([])
  const [evtTypes, setEvtTypes] = React.useState([]);
  const [cardScheduleData, setCardScheduleData] = React.useState({});
  const history = useHistory();
  const [addressYndex, setAddressYndex] = React.useState('')

  const loadSuggest = ymaps => {
    const suggestView = new ymaps.SuggestView("suggest");
    suggestView.events.add("select", (e) => {
      console.log(e.get("item").value);
      setAddressYndex(e.get("item").value)
    });
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/disco-events');
    }
  }, [history, loggedIn]);

  // Запрашиваем города
  const cities = () => {

    return API
      .pullCities()
      .then(cities => {
        setCity(cities);
      })
      .catch((err) => {
        console.log('Код ошибки:', err);
        console.log(`Справочник ошибок ${directoryHTTP}`)
      });
  }

  // Запрашиваем типы мероприятий
  const eventsType = () => {
    const xToken = localStorage.getItem('xToken');

    return API
      .pullTypesEvent(xToken)
      .then((evtTypes) => {
        setEvtTypes(evtTypes);
      })
      .catch((err) => {
        console.log('Код ошибки:', err);
        console.log(`Справочник ошибок ${directoryHTTP}`)
      });
  }

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
        tokenCheck();
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
      .then(() => {
        tokenCheck();
        closeAllPopups()
      })
      .catch((err) => {
        console.log('Код ошибки:', err);
        console.log(`Справочник ошибок ${directoryHTTP}`)
      })
  }

  // 4. Закрыть попапы
  const closeAllPopups = () => {
    setIsAddCardPopupOpen(false);
    setIsAddDaysPopupOpen(false)
    setIsEditSchedulePopupOpen(false);
    setCardScheduleData({});
    setCity([]);
  }

  // . Открыть попап добавления расписания дискотеки
  const handleAddCardClick = () => {
    cities();
    eventsType();
    setIsAddCardPopupOpen(true);
  }

  const handleAddDaysCardClick = () => {
    setIsAddDaysPopupOpen(true);
  }

  // . Открыть попап редактирования расписания
  const handleEditScheduleClick = () => {
    cities();
    setIsEditSchedulePopupOpen(true);
  }

  // . Передача данных расписания попупу редактирования
  const handleScheduleCardClick = (dataSchedule) => {
    setCardScheduleData(dataSchedule);
  }

  // Добавить карточку дискотеки
  const handleAddCard = (dataCardDisco) => {
    const xToken = localStorage.getItem('xToken');
    console.log(dataCardDisco, '2');

    ApiAuth.addNewEvent(dataCardDisco, xToken)

      .then((newSchedule) => {
        console.log(newSchedule);
        setUsersSchedule([newSchedule, ...userSchedule]);
        setIsAddCardPopupOpen(false);
      })
      .catch((err) => {
        console.log('Код ошибки:', err);
        console.log(`Справочник ошибок ${directoryHTTP}`)
      });
  }

  // Обновить статут мероприятия
  const handleActiveUpdate = (dataSchedele) => {
    const xToken = localStorage.getItem('xToken');
    // console.log(dataSchedele, xToken, 'данные для экшена')

    ApiAuth.onActive(dataSchedele, xToken)
      .then((newSchedule) => {
        tokenCheck();
      })
      .catch((err) => {
        console.log('Код ошибки:', err);
        console.log(`Справочник ошибок ${directoryHTTP}`)
      });
  }

  const handleScheduleDelete = (dataSchedele) => {
    const xToken = localStorage.getItem('xToken');
    console.log(dataSchedele, xToken, 'данные для экшена')

    API.scheduleDelete(dataSchedele, xToken)
      .then(() => {
        tokenCheck();
      })
      .catch((err) => {
        console.log('Код ошибки:', err);
        console.log(`Справочник ошибок ${directoryHTTP}`)
      });
  }

  //Рендер
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
          addDaysCardPopupClick={handleAddDaysCardClick}
          editSchedulePopupClick={handleEditScheduleClick}
          onEditShedulerCardClick={handleScheduleCardClick}
          onCardActiveClick={handleActiveUpdate}
          onCardDelete={handleScheduleDelete}
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
        addressYndex={addressYndex}
        suggester={loadSuggest}
        formTitle={'Добавить мероприятие'}
        cities={city}
        eventTypes={evtTypes}
        onClose={closeAllPopups}
        isOpen={isAddCardPopupOpen}
        onAddCard={handleAddCard}
      />

      {/*<PopupAddDaysEvent*/}
      {/*  isOpen={isAddDaysPopupOpen}*/}
      {/*  onClose={closeAllPopups}*/}
      {/*  // onAddDays={}*/}
      {/*/>*/}

      <PopupEditEvent
        formTitle={'Редактировать мероприятие'}
        cities={city}
        eventTypes={evtTypes}
        onClose={closeAllPopups}
        schedule={cardScheduleData}
        isOpen={isEditSchedulePopupOpen}
        onUpdateSchedule={handleUpdateSchedule}
      />
      <Helmet>
        <script src="https://api-maps.yandex.ru/2.1/?apikey=42dfc515-9887-4dcc-8ae2-e9da688cf1d2&lang=ru_RU"
                type="text/javascript"/>
      </Helmet>
    </>
  );
}

export default App;
