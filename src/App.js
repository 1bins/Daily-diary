import React, { useState, useReducer, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import './normalize.css'

import Home from './pages/Home';
import Write from './pages/Write';
import Edit from './pages/Edit';
import View from './pages/View';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter(elem => elem.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map(elem => elem.id === action.data.id ? {...elem, ...action.data} : elem);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
export const DiaryDateContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const curDate = new Date();
  const [calDate, setCalDate] = useState(curDate);

  // INIT
  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if(localData){
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));

      if(diaryList.length >= 1){
        dataId.current = parseInt(diaryList[0].id + 1);
        dispatch({type: "INIT", data: diaryList});
      }
    }

  }, []);

  // onCreate
  const onCreate = (date, content, emotion) => {
    dispatch({type: "CREATE", data: {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion
    }})
    dataId.current += 1;
  }

  // onRemove
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }

  // onEdit
  const onEdit = (targetId, content, emotion) => {
    dispatch({type: "EDIT", data: {
      id: targetId,
      content,
      emotion
    }})
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDateContext.Provider value={calDate}>
        <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
          <BrowserRouter>
            <main id="main">
              <Routes>
                <Route path="/" element={<Home setCalDate={setCalDate}></Home>}></Route>
                <Route path="/write" element={<Write></Write>}></Route>
                <Route path="/edit/:id" element={<Edit></Edit>}></Route>
                <Route path="/view/:id" element={<View></View>}></Route>
              </Routes>
            </main>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryDateContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
