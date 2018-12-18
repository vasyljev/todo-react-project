import {combineReducers} from 'redux';
import login from './login';
import todoList from './todoList';
import todoDate from './todoDate';
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
    form: formReducer, login, todoList, todoDate
});