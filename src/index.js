import React from 'react';
import ReactDOM from 'react-dom';
import App from "./ExampleComponent";
import ExampleComponent from "./ExampleComponent";

const RetoolConnectedComponent = Retool.connectReactComponent(App);
document.body.setAttribute('style', 'margin: 0;') 
ReactDOM.render(
  <RetoolConnectedComponent/>, 
  document.body.appendChild(document.createElement('div')) 
);