import React, { Component } from 'react';
import {loginUser} from '../../actions/login';
import {logOutUser} from '../../actions/login';
import {addNewItemTodo} from '../../actions/todoList';
import {setTodoDate} from '../../actions/todoDate';
import { changeVisibilyty } from '../../actions/todoList';
import { changeTodoItem } from '../../actions/todoList';
import { changeButtonName } from '../../actions/todoList';
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
        
        console.log('ToDoList render', this.props.isAuthenticated);
        const {handleSubmit} = this.props;
        return(
            <>
                z{/* <h2>Hello, {this.props.userDate['user']['firstName']}!</h2> */}
                <h4>What do you want to do today?</h4>  
                <Switch>
                    <Route exact path={PATHS.TODO_LIST_ITEMS} component={ItemsList} />
                    <Route  path={PATHS.TODO_ITEM} component={TodoItem} />
                </Switch> 
                <div id='add-form-wrap' className={this.props.visibilityClass} onClick={this.closeWindowOnClick}>        
                    <form onSubmit={handleSubmit} id="add-new-item-form">
                        <div id="close-button"></div>
                        <div id="add-new-item-form-wrap">
                            <Field name='todoItem' 
                                   type='text' 
                                   component='input' 
                                   placeholder={this.props.tempTitle} 
                                   className="login-form-input" />
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
                <button onClick={this.addNewItemClickHandle} className='submit-button'>Add new item</button>
                {/* <button onClick={() => this.props.logOutUser()} className='submit-button'>Log Out</button> */}
                <button onClick={() => {
                    this.props.logOutUser();
                    localStorage.setItem('isAuthenticated', false);
                    }} className='submit-button'>Log Out</button>
            </>
        );
        
    }  
    
    closeWindowOnClick = event => {
        if(event.target.id === 'add-form-wrap' || event.target.id === 'close-button') {
            this.props.changeVisibilyty();
            this.props.changeTodoItem('by milk', new Date() ,'');
            this.props.reset();
        }
    }
        
    addNewItemClickHandle = () => {
        this.props.changeButtonName('');
        this.props.changeVisibilyty();
    }

    getTodoListItems = () => {
        todoListService.getTodoList(this.props.userDate['token'])
        .then(resp => {
            localStorage.setItem('TodoList', JSON.stringify(resp));
            return this.props.addNewItemTodo(this.props.addNewItemTodo(JSON.parse(localStorage.getItem('TodoList'))));
        });
    }

    handleChange = date => {
        if(this.props.tempId != '') {
            this.props.setTodoDate(this.props.tempDate);
        }
        let now = new Date();
        return ( now.valueOf() < date.valueOf() ?  this.props.setTodoDate(date) : window.alert('ERROR!'));
    }

    componentDidMount() {
        // this.getTodoListItems();  
        if(JSON.parse(localStorage.getItem('isAuthenticated')) == true) {
            console.log('auth render true');
           this.props.loginUser();
       }
        this.props.addNewItemTodo(JSON.parse(localStorage.getItem('TodoList')));      
    }

    componentDidUpdate() {       
        // this.getTodoListItems();        
        this.props.addNewItemTodo(JSON.parse(localStorage.getItem('TodoList')));
    }
}

ToDoList = reduxForm({
    form: 'newItemTodo',
    initialValues: {
        todoItem: '',
        endDateTodoItem: null
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
    loginUser, logOutUser, addNewItemTodo, setTodoDate, changeVisibilyty, changeTodoItem, changeButtonName
}, dispatch);



export default connect (mapStateToProps, mapDispatchToProps) (ToDoList); 
