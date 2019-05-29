import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Board from "./Board";
import registerServiceWorker from './registerServiceWorker';
import HTML5Backend from "react-dnd-html5-backend" 
import {DragDropContext} from "react-dnd";




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();




export default DragDropContext(HTML5Backend)(Board);