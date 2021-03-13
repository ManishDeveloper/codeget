import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menubar from './components/Menubar';
import {getUserDetails} from "./redux/actions/userActions";
import PrivateRoute from './routing/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import LevelScreen from './screens/LevelScreen';
import LoginScreen from './screens/LoginScreen';
import QuestionScreen from './screens/QuestionScreen';
import RegisterScreen from './screens/RegisterScreen';
import TopicScreen from './screens/TopicScreen';


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUserDetails());
  },[dispatch])

  return (
    <Router>
      <Menubar />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <PrivateRoute exact path="/topic" component={TopicScreen} />
        <PrivateRoute exact path="/level/:id" component={LevelScreen} />
        <PrivateRoute exact path="/level/question/:id" component={QuestionScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
      </Switch>
    </Router>
  );
}

export default App;
