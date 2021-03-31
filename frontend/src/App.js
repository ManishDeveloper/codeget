import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menubar from './components/Menubar';
import {getUserDetails} from "./redux/actions/userActions";
import AdminRoute from './routing/AdminRoute';
import PrivateRoute from './routing/PrivateRoute';
import DashboardScreen from './screens/dashboardScreen/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import LevelScreen from './screens/LevelScreen';
import LoginScreen from './screens/LoginScreen';
import QuestionScreen from './screens/QuestionScreen';
import RegisterScreen from './screens/RegisterScreen';
import TopicScreen from './screens/TopicScreen';
import { ToastContainer, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        <AdminRoute exact path="/dashboard/:page/:id?" component={DashboardScreen} />
        <PrivateRoute exact path="/level/:id" component={LevelScreen} />
        <PrivateRoute exact path="/question/:level/:categoryId" component={QuestionScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
      </Switch>
    <ToastContainer position="bottom-right" transition={Slide} />
    </Router>
    
  );
}

export default App;
