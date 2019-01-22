import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



import {addNewItemTodo} from '../../actions/todoList';
import {setTodoDate} from '../../actions/todoDate';
import { changeVisibilyty } from '../../actions/todoList';
import { changeTodoItem } from '../../actions/todoList';
import { changeButtonName } from '../../actions/todoList';


import ToDoList from '../../containers/ToDoList';
import {PATHS} from "../../constants/routes";
import PrivateRoute from '../../containers/PrivateRoute';
import {loginUser} from '../../actions/login';
import {logOutUser} from '../../actions/login';
import todoListService from '../../services/todoListService';

class ToDo extends Component {
    render() {
        console.log('ToDo render');
        let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
        return (
                <Switch>
                    <PrivateRoute path={PATHS.TODO_LIST} submitHandle={this.editOrAddListItem} component={ToDoList} isAuthenticated={isAuthenticated} />                       
                </Switch>                           
        );
    }

    editOrAddListItem = value => {
        const item = value.todoItem;
        value.todoItem = '';
        console.log('props', this.props);
        todoListService.sendTodoItem(item, this.props.userDate['token'], this.props.date, this.props.tempId, this.props.tempDate)
        .then(()=> this.getTodoListItems())
        .then(() => this.props.setTodoDate(new Date()))
        .then(() => this.props.changeVisibilyty());
        this.props.changeTodoItem('by milk', new Date() ,''); 
    }

    getTodoListItems = () => {
        todoListService.getTodoList(this.props.userDate['token'])
        .then(resp => {
            localStorage.setItem('TodoList', JSON.stringify(resp));
            return this.props.addNewItemTodo(this.props.addNewItemTodo(JSON.parse(localStorage.getItem('TodoList'))));
        });
    }

}

const mapStateToProps = ({login, todoList, todoDate}) => ({
    isAuthenticated: login.isAuthenticated,
    userDate: login.userDate,
    list: todoList.list,
    date: todoDate.date,
    visibilityClass: todoList.visibilityClass,
    tempTitle: todoList.tempTitle,
    tempDate: todoList.tempDate,
    tempId: todoList.tempId,
    buttonName: todoList.buttonName
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, logOutUser, addNewItemTodo, setTodoDate, changeVisibilyty, changeTodoItem, changeButtonName
}, dispatch);


export default connect (mapStateToProps, mapDispatchToProps) (ToDo); 
