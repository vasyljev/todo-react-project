import axios from 'axios';
import {API_BASE} from "../constants/API";


class todoListServices {
    sendTodoItem = (data, userData, expiresDate, id) => {
        if(id != '') {
           return this.changeTodoItem(data, id, false, userData, expiresDate)
        } else {
            return axios.post(`${API_BASE}/todos`, {
                title: data,
                expires_at: expiresDate
            }, 
            {
                headers: {
                    token: userData
                }
            })
            .then(res => {
              console.log(res.data);
                return res.data;
            })
            .catch(error => {
                console.log(error);
            })
        }


        
    }
    getTodoList = (userData) => {
        return axios.get(`${API_BASE}/todos`, {
            headers: {
                token: userData
            }
        })
        .then(res => {
            console.log('res.data.data', res.data.data);
            return res.data.data;
        })
        .catch(error => {
            console.log(error);
        })
    }

    deleteTodoItem = (itemId, userData) => {
        return axios.delete(`${API_BASE}/todos/${itemId}`, {
            headers: {
                token: userData
            }})
            .then(res => {
                console.log('res data delete: ', res.data);
                  return res.data;
              })
              .catch(error => {
                  console.log(error);
              })
    }

    changeTodoItem = (itemTitle, itemId, itemComplete, userData, expiresDate) => {
        return axios.put(`${API_BASE}/todos/${itemId}`,{
            title: itemTitle,
            expires_at: expiresDate,
            completed: itemComplete
        }, 
        {
            headers: {
                token: userData
            }})
            .then(res => {
                console.log('res data change: ', res.data);
                  return res.data;
              })
              .catch(error => {
                  console.log(error);
              })
    }
}

const todoListService = new todoListServices();
export default todoListService;