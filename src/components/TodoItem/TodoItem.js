import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import {addNewItemTodo} from '../../actions/todoList';
import { changeVisibilyty } from '../../actions/todoList';
import {PATHS} from "../../constants/routes";


const TodoItem = (props) => {
    console.log('TODOITEM', props.list);

    const todoItem = props.list.filter(item => item['id'] == props.match.params.id)[0];
    console.log('ITEM: ', todoItem);
    const date = new Date(todoItem.expires_at);
    console.log('DATE ', date)
    return (
        <>  
            <h2>TodoItem</h2>
            <p>Item title: {todoItem.title}</p>
            <p>Date: {date.toString()}</p>
            <Link to={PATHS.TODO_LIST_ITEMS}>Back</Link>
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


