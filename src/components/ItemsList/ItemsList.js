import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import {loginUser} from '../../actions/login';
import {logOutUser} from '../../actions/login';
import {addNewItemTodo} from '../../actions/todoList';
import {setTodoDate} from '../../actions/todoDate';
import { changeVisibilyty } from '../../actions/todoList';
import todoListService from '../../services/todoListService';
import { changeTodoItem } from '../../actions/todoList';
import { changeButtonName } from '../../actions/todoList';

class ItemsList extends Component {
    render() {
        const list = this.props.list.map((item) => 
        <li key={item['id']} className={this.setColorOfText(item['expires_at'])} style={item['completed'] ? {'textDecoration': 'line-through'} : {} } 
        onClick={(event) => {
            if(event.target.className === 'delete-button') {
                return todoListService.deleteTodoItem(item['id'], this.props.userDate['token']).then(()=> this.getTodoListItems());
            }else if(event.target.className === 'completed-checkbox') {  
                    return todoListService.changeTodoItem(item['title'], item['id'], !item['completed'],  this.props.userDate['token'], item['expires_at']).then(()=> this.getTodoListItems());
            } else if(event.target.className === 'edit-button') {
                this.editTodoItem(item['id']);
            }
        }}>
        <input type="checkbox" name="completed" className="completed-checkbox"  defaultChecked={item['completed']}/><Link to={`/todos/${item['id']}`} className='item-link'> {item['title']} </Link> <div className="edit-button"></div><div className="delete-button"></div></li>);
        
        return (
            <>  <div className='list-wrap'>
                    <ul id="items-list">
                        {list}
                    </ul>
                </div>
            </>
    )
    }

    editTodoItem = (id) => {
        this.props.changeVisibilyty();
        const item = this.props.list.filter(item => item['id'] == id)[0];        
        this.props.changeTodoItem(item['title'], item['expires_at'], item['id']);
        this.props.setTodoDate(new Date(item['expires_at']));
        this.props.changeButtonName(item['id']);

    }
    
    setColorOfText = (date) => {
        const now = new Date();
        const otherDate = new Date(date);
        const difference = otherDate.valueOf() - now.valueOf();
        if(difference < 3600600) {
            return ('red');
        } else if ((difference > 3600600)&&(difference < 3*3600600)) {
            return ('yellow');
        } else {
            return ('');
        }
    }

    getTodoListItems = () => {
        todoListService.getTodoList(this.props.userDate['token'])
        .then(resp => {
            // console.log('resp ItemList', resp);
            localStorage.setItem('TodoList', JSON.stringify(resp));
            return this.props.addNewItemTodo(resp)
        });
    }
}
const mapStateToProps = ({login, todoList, todoDate}) => ({
    isAuthenticated: login.isAuthenticated,
    userDate: login.userDate,
    list: todoList.list,
    date: todoDate.date,
    visibilityClass: todoList.visibilityClass,
    tempTitle: todoList.title,
    tempDate: todoList.date,
    tempId: todoList.tempId,
    buttonName: todoList.buttonName
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, logOutUser, addNewItemTodo, setTodoDate, changeVisibilyty, changeTodoItem, changeButtonName
}, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (ItemsList);