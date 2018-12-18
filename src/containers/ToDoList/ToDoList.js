import React, { Component } from 'react';
import {loginUser} from '../../actions/login';
import {logOutUser} from '../../actions/login';
import {addNewItemTodo} from '../../actions/todoList';
import {setTodoDate} from '../../actions/todoDate';
import { changeVisibilyty } from '../../actions/todoList';
import { changeTodoItem } from '../../actions/todoList';
import ItemsList from '../../components/ItemsList';
import TodoItem from '../../components/TodoItem';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Field, reduxForm} from 'redux-form';
import datePickerContainer from './inputDate';
import {PATHS} from "../../constants/routes";
import { Route, Switch} from 'react-router-dom';

import todoListService from '../../services/todoListService';


class ToDoList extends Component {
    render() {
        // console.log('list: ', this.props.list[0]);
        // console.log('date: ', this.props.date);
        const {handleSubmit} = this.props;
        console.log('Temp ', this.props.tempDate, this.props.tempTitle, 'Temp ID: ', this.props.tempId);
        return(
            <>
                <h2>Hello, {this.props.userDate['user']['firstName']}!</h2>
                <h4>What do you want to do today?</h4>  
                <Switch>
                    <Route exact path={PATHS.TODO_LIST_ITEMS} component={ItemsList} />
                    <Route  path={PATHS.TODO_ITEM} component={TodoItem} />
                </Switch>         
                <form onSubmit={values => todoListService.sendTodoItem(handleSubmit(values), this.props.userDate['token'], this.props.date, this.props.tempId, this.props.tempDate).then(()=> this.getTodoListItems()).then(() => this.props.setTodoDate(new Date()))} className={this.props.visibilityClass}>
                    <Field name='todoItem' type='text' component='input' placeholder={this.props.tempTitle} />
                    <Field name='endDateTodoItem' 
                            component={datePickerContainer}
                            showTimeSelect
                            selected={this.props.tempDate}
                            myOnChange={this.handleChange}                            
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm"
                            timeCaption="time" 
                            />
                      
                   <button type="submit">submit</button>
                </form>
                <button onClick={() => this.props.changeVisibilyty()}>Add new item</button>
                <button onClick={() => this.props.logOutUser()}>Log Out</button>
            </>
        );
        
    }   
 

    getTodoListItems = () => {
        todoListService.getTodoList(this.props.userDate['token'])
        .then(resp => {
            return this.props.addNewItemTodo(resp)
        });
    }

    handleChange = date => {
        let now = new Date();
        return ( now.valueOf() < date.valueOf() ?  this.props.setTodoDate(date) : console.log('ERROR!'));
    }

    componentDidMount() {
        this.getTodoListItems();
    }

    componentDidUpdate(props) {
        console.log('update', props.list);
        this.getTodoListItems();
        
    }
}

ToDoList = reduxForm({
    form: 'newItemTodo',
    onSubmit: (value) => { 
        console.log('submit', value.endDateTodoItem);
        const item = value.todoItem;
        value.todoItem = '';
        return (item);
    }
})(ToDoList);

const mapStateToProps = ({login, todoList, todoDate}) => ({
    isAuthenticated: login.isAuthenticated,
    userDate: login.userDate,
    list: todoList.list,
    date: todoDate.date,
    visibilityClass: todoList.visibilityClass,
    tempTitle: todoList.tempTitle,
    tempDate: todoList.tempDate,
    tempId: todoList.tempId
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, logOutUser, addNewItemTodo, setTodoDate, changeVisibilyty, changeTodoItem
}, dispatch);



export default connect (mapStateToProps, mapDispatchToProps) (ToDoList); 
