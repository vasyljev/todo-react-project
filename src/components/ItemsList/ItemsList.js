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

class ItemsList extends Component {
    render() {
        // const list =() => this.props.correntList();
        const list = this.props.list.map((item) => 
        <li key={item['id']} className={this.setColorOfText(item['expires_at'])} style={item['completed'] ? {'textDecoration': 'line-through'} : {} } 
        onClick={(event) => {console.log('ItemsList111:', item['id'], this.props.userDate['token']); 
            if(event.target.className === 'delete-button') {
                return todoListService.deleteTodoItem(item['id'], this.props.userDate['token']).then(()=> this.getTodoListItems());
            }else if(event.target.className === 'completed-checkbox') {  
                    // console.log('completed', item['title'], item['id'], !item['completed'], this.props.userDate['token']); 
                    // event.target.checked = !item['completed'];
                    return todoListService.changeTodoItem(item['title'], item['id'], !item['completed'],  this.props.userDate['token'], item['expires_at']).then(()=> this.getTodoListItems());
            } else if(event.target.className === 'edit-button') {
                console.log(item['id']);
                this.editTodoItem(item['id']);
            }
        }}>
        <input type="checkbox" name="completed" className="completed-checkbox"  defaultChecked={item['completed']}/><Link to={`/todos/${item['id']}`}>Item {item['id']} {item['title']} </Link> <div className="edit-button"></div><div className="delete-button"></div></li>);
        
        return (
            <>
                <h2>ItemsList {this.props.tempId}</h2>
                <ul>
                    {list}
                </ul>
            </>
    )
    }

    editTodoItem = (id) => {
        this.props.changeVisibilyty();
        const item = this.props.list.filter(item => item['id'] == id)[0];
        // console.log('iiiiii ', item);
        this.props.changeTodoItem(item['title'], item['expires_at'], item['id']);

    }
    
    setColorOfText = (date) => {
        const now = new Date();
        const otherDate = new Date(date);
        // console.log('other date: ', otherDate.valueOf());
        const difference = otherDate.valueOf() - now.valueOf();
        if(difference < 3600600) {
            // console.log('red', difference);
            return ('red');
        } else if ((difference > 3600600)&&(difference < 3*3600600)) {
            // console.log('yellow');
            return ('yellow');
        } else {
            // console.log('black', difference);
            return ('');
        }
    }

    getTodoListItems = () => {
        todoListService.getTodoList(this.props.userDate['token'])
        .then(resp => {
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
    tempId: todoList.tempId
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, logOutUser, addNewItemTodo, setTodoDate, changeVisibilyty, changeTodoItem
}, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (ItemsList);