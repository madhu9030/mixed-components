import React, { useState, useEffect, useRef } from "react";
import WeatherEngine from "./weather/weatherEngine.jsx";
import "./App.scss";
import TextField from "./components/textField/textField.js";
import TodoList from "./components/todos/todoList";
import DropDown from "./components/todos/dropDown";
import Loading from "./components/loading/loading";
import NavBar from "./components/navBar/navBar";
import GetRandomUser from "./components/getRamdonUser/getRandomUser";
import Spinner from "./components/spinner/spinner";
import Music from "./components/music/music";
import Login from "./components/login/login";
import Overlay from "./components/overlay/overlay";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/randomSite/main";
import UseDataProvider from "./components/provider";
import SyncScroll from "./components/syncronousScroll/syncScroll";
import ProgressBar from './components/progressBar/progressBar'
import Button from "../src/components/button/button";
//API's
/**
 * Dummy user data: https://reqres.in/api/users?page=2
 */

function App() {
  //Local storage
  let localTodos = [];
  const [sessionActive, setSessionActive] = useState(false)
  const [login, setLogin] = useState(true);
  const [getLongLat, setGetLongLat] = useState();
  useEffect(() => {
    const LocalStorageData = localStorage.getItem("localTodo")
    const sessionId = window.localStorage.getItem('sessionId');
    if(sessionId) {
      setSessionActive(true)
      setLogin(false)
    }
    if (LocalStorageData) {
      localTodos = JSON.parse(LocalStorageData);
      setTodo(localTodos);
    }
  }, []);

  const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const getLongLats = (pos) => {
    const crd = pos.coords;
    setGetLongLat({
      lat: crd.latitude,
      long: crd.longitude,
    });
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(getLongLats, error, options);

  const ref = useRef(null);
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState(localTodos);
  const [select, setSelect] = useState("All");
  const [filterList, setFilterList] = useState([]);
  const [loading, setloading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [geteditId, setgeteditId] = useState(null);
  const [currentStep, setCurrentStep] = useState("shoping");

  useEffect(() => {
    window.localStorage.setItem("localTodo", JSON.stringify(todo));
  }, [todo]);

  const dropDownHandler = () => {
    switch (select) {
      case "Completed":
        setFilterList(todo.filter((data) => data.completed === true));
        break;
      case "Uncompleted":
        setFilterList(todo.filter((data) => data.completed === false));
        break;
      default:
        return setFilterList(todo);
    }
  };

  useEffect(() => {
    dropDownHandler();
  }, [select, todo]);

  const addTodoHandler = () => {
    if (ref.current.value !== "") {
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, 200);

      if (edit && geteditId) {
        setTodo(
          todo.map((data) => {
            if (data.id.toString() === geteditId) {
              return { ...data, text: input };
            }
            return data;
          })
        );
        setEdit(false);
      } else {
        setTodo([
          ...todo,
          {
            text: input,
            id: Math.floor(Math.random() * 1000),
            completed: false,
          },
        ]);
      }
    }
    setInput("");
    ref.current.focus();
  };

  const inputAttrs = {
    onKeyPress: (event) => {
      if (event.charCode === 13) {
        addTodoHandler();
      }
    },
  };

  const data = {
    first: "madhu",
    second: "reddy",
    currentStep,
    setCurrentStep
  };
  // const syncScrol = (scroll) => {
  //   const face1 = document.getElementById("scroll1");
  //   const face2 = document.getElementById("scroll2");
  //   if (scroll == "scroll1") {
  //     face2.scrollTop = face1.scrollTop;
  //   } else {
  //     face1.scrollTop = face2.scrollTop;
  //   }
  // }
  console.log(sessionActive)
  return (
  <UseDataProvider.Provider value={data}>
    <div className="App">
      <Router>
        {!login && <NavBar />}
        {(sessionActive) ? <Switch><Route path="/" render={() => <Redirect to="/home" />} /></Switch> : <Switch><Route path="/" render={() => <Redirect to="/login" />} /></Switch>}
        <Switch>
          <Route path="/home">
            <Main />
          </Route>
          <Route path="/news">
            <div className="flex">News</div>
          </Route>
          <Route path="/spinner" component={Spinner} />
          <Route path="/music" component={Music} />
          <Route path="/overlay" component={Overlay} />
          <Route path="/weather">
            <div className="weather-list">
              {getLongLat && getLongLat.long && <WeatherEngine intialSearch={getLongLat} />}
              <WeatherEngine intialSearch="94086" />
              <WeatherEngine intialSearch="Hyderabad" />
              <WeatherEngine intialSearch="Barrow" />
            </div>
          </Route>
          <Route path="/todoapp">
            <div className="todo-app fade-in">
                <div className="text-field-dropdown">
                  <TextField
                    buttonLabel={!edit ? "Add Todo" : "Update"}
                    input={input}
                    clickHandler={addTodoHandler}
                    setInput={setInput}
                    ref={ref}
                    onBlur={() => null}
                    inputAttrs={inputAttrs}
                    loading={loading}
                  />
                  <DropDown setSelect={setSelect} select={select} />
                </div>
                {!edit ? (
                  <TodoList
                    todo={todo}
                    input={input}
                    setInput={setInput}
                    filterList={filterList}
                    setTodo={setTodo}
                    edit={edit}
                    setEdit={setEdit}
                    inputRef={ref}
                    setgeteditId={setgeteditId}
                    geteditId={geteditId}
                  />
                ) : (
                  <>
                  <Loading text="Editing" /><Button onClick = {()=> setEdit(false)} label= "Cancel" buttonLink={true} className="cancel-edit"/>
                  </>
                )}
              </div>

          </Route>
          <Route path="/randomuser" component={GetRandomUser} />
          <Route path="/syncscroll" component={SyncScroll} />
          <Route path="/progressbar" component={ProgressBar} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
      {/* <Addition /> */}
      
    </div>
  </UseDataProvider.Provider>

  );
}

export default App;
