import axios from "axios";

export const fetchUsers = () => (dispatch => {
  const usersListUrl = `http://jsonplaceholder.typicode.com/users`;
  axios.get(usersListUrl).then((response) => {
   if(response.status ===200 ){
    const users = response.data;
    users.sort((a,b) => {
      return a.name > b.name
    })

    dispatch({type:'USERS', data: users}) ;
   }
  })
})
