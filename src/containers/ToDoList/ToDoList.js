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

        return(
            <>
                <h2>Hello, {this.props.userDate['user']['firstName']}!</h2>
                <h4>What do you want to do today?</h4>  
                <Switch>
                    <Route exact path={PATHS.TODO_LIST_ITEMS} component={ItemsList} />
                    <Route  path={PATHS.TODO_ITEM} component={TodoItem} />
                </Switch> 
                <div id='add-form-wrap' className={this.props.visibilityClass} onClick={(event) => {
                    if(event.target.id === 'add-form-wrap' || event.target.id === 'close-button') {
                        this.props.changeVisibilyty();
                        this.props.changeTodoItem('by milk', new Date() ,'');
                    }
                }}>        
                    <form onSubmit={values => {
                        todoListService.sendTodoItem(handleSubmit(values), this.props.userDate['token'], this.props.date, this.props.tempId, this.props.tempDate).then(()=> this.getTodoListItems()).then(() => this.props.setTodoDate(new Date())).then(() => this.props.changeVisibilyty());
                        this.props.changeTodoItem('by milk', new Date() ,'');
                    }
                        }  id="add-new-item-form">
                        <div id="close-button"></div>
                        <div id="add-new-item-form-wrap">
                            <Field name='todoItem' type='text' component='input' placeholder={this.props.tempTitle} className="login-form-input" />
                            <Field name='endDateTodoItem' 
                                    component={datePickerContainer}
                                    showTimeSelect
                                    selected={this.props.date}
                                    myOnChange={this.handleChange}                            
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    timeCaption="time"
                                    className="login-form-input" 
                                    />
                            
                        <button type="submit" className="submit-button">{this.props.buttonName}</button>
                    </div>
                    </form>
                </div>
                <button onClick={() => this.props.changeVisibilyty()} className='submit-button'>Add new item</button>
                <button onClick={() => this.props.logOutUser()} className='submit-button'>Log Out</button>
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

    componentDidUpdate() {
       
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
    tempId: todoList.tempId,
    buttonName: todoList.buttonName
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, logOutUser, addNewItemTodo, setTodoDate, changeVisibilyty, changeTodoItem
}, dispatch);



export default connect (mapStateToProps, mapDispatchToProps) (ToDoList); 
