import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import {addNewItemTodo} from '../../actions/todoList';
import { changeVisibilyty } from '../../actions/todoList';
import {PATHS} from "../../constants/routes";


const TodoItem = (props) => {
    const todoItem = props.list.filter(item => item['id'] == props.match.params.id)[0];    
    const date = new Date(todoItem.expires_at);
    return (
        <>
            <div className='item-wrap'>  
                <h3>TodoItem</h3>
                <div>
                    <p>Item title: {todoItem.title}</p>
                    <p>Date: {date.toString()}</p>
                </div>                
            </div>
            <Link to={PATHS.TODO_LIST_ITEMS} className="submit-button">Back</Link>
        </>
    )
}

const mapStateToProps = ({todoList}) => ({
    list: todoList.list,
    visibilityClass: todoList.visibilityClass
  });

const mapDispatchToProps = dispatch => bindActionCreators({
     addNewItemTodo, changeVisibilyty
}, dispatch);



export default connect (mapStateToProps, mapDispatchToProps) (TodoItem); 


