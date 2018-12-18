import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import datePickerContainer from '../ToDoList/inputDate';

class AddEditItem extends Component {
    render() {
        const {handleSubmit} = this.props;
        const sendItem = () => this.props.sendItem();
        const token = this.props.token;
        const date = this.props.date;
        const setDefaultDate = () => this.props.setDefaultDate(new Date());
        const getTodoListItems = () => this.props.getTodoListItems();
        return(
            <form onSubmit={value => handleSubmit(value)}
            // {value => sendItem(handleSubmit(value), token, date).then(()=> getTodoListItems()).then(() => setDefaultDate())} 
            >
                            
                    <Field name='todoItem' type='text' component='input' placeholder='buy milk' />
                    <Field name='endDateTodoItem' 
                            component={datePickerContainer}
                            showTimeSelect                                                        
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm"
                            timeCaption="time" 
                            selected={this.props.selected}
                            myOnChange={this.props.myOnChange}
                            />
                      
                   <button type="submit">submit</button>
                </form>
        )
    }
}

AddEditItem = reduxForm({
    form: 'AddEditItem',
    onSubmit: (value) => { 
        console.log('submit', value.endDateTodoItem);
        const item = value.todoItem;
        value.todoItem = '';
        return (item);
    }
})(AddEditItem);

export default AddEditItem;