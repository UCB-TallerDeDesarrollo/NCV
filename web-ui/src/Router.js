import React, {Component} from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";

import CrearActivoFijoForm from "./components/CrearActivoFijoForm";
import SumadorForm from './SumadorForm';
import HomePageForm from './HomePageForm';

export default class Router extends Component {
  render(){
    return (
      <BrowserRouter>
      <Routes>
        <Route exact path="/" component={HomePageForm}/>
        <Route exact path="/crear-activo-fijo" component={CrearActivoFijoForm}/>
      </Routes>
    </BrowserRouter>);
  }
}