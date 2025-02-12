import axios from "axios";
import {authorizationAdmin} from "../../helpers/token"

// const authorizationAdmin= {
//   headers: {
//     authorization: `Bearer ${token}`,user: user},
//   }

export const typesUser = {
  POST_USER: "POST_USER",
  GET_ALL_USERS: "GET_ALL_USERS",
  GET_USER_BY_ID: "GET_USER_BY_ID",
  DELETE_USER: "DELETE_USER",
  MODIFY_USER: "MODIFY_USER",
  POST_MAIL_USER: "POST_MAIL_USER",
  SET_MAIL_USER: "SET_MAIL_USER",
  GET_USER:'GET_USER',
  PUT_USER: 'PUT_USER'
};

export const setUserMail = (data) => {
  try {
    return {
      type: typesUser.SET_MAIL_USER,
      payload: data,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(
        "https://bookflix-back.herokuapp.com/api/users",
        authorizationAdmin()
      );
     // console.log("data", data);
      return dispatch({
        type: typesUser.GET_ALL_USERS,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const postUser = (user) => {
  return (dispatch) => {
    return axios
      .post("https://bookflix-back.herokuapp.com/api/users", user, authorizationAdmin)
      .then((response) => {
        dispatch({
          type: typesUser.POST_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};
export const getUserById = (id) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(
        `https://bookflix-back.herokuapp.com/api/users/${id}`,
        authorizationAdmin()
      );
      return dispatch({
        type: typesUser.GET_USER_BY_ID,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};


export const deleteUser = (id) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.delete(
        `https://bookflix-back.herokuapp.com/api/users/admin/${id}`,
        authorizationAdmin()
      )
      //  console.log('data con id', id)
      return dispatch({
        type: typesUser.DELETE_USER,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};


  export const mailUsers = (input)=>{
   
    return (dispatch) => {
      return axios.post('https://bookflix-back.herokuapp.com/api/users/admin/mail',input, authorizationAdmin())
      
        .then(response => {
         
          dispatch({
            type: typesUser.POST_MAIL_USER,
            payload: response.data
            
          });
        },)
        .catch(error => {
          throw error;
        });
      
  };
};


export const getUserByMail = (email) => {
  return (dispatch) => {
    return axios
      .get(`https://bookflix-back.herokuapp.com/api/users/admin/mail/${email}`,  authorizationAdmin())
      .then((response) => {
        dispatch({
          
          type: typesUser.GET_USER,
          payload: response.data,
         
        } ); //  console.log('res', response)
      } )
      .catch((error) => {
        throw error;
      });
  };
};

export const changeRol = (id) => {
  return (dispatch) => {
    return axios
      .put('https://bookflix-back.herokuapp.com/api/users/admin/modify',{id},  authorizationAdmin())
      
      .then((response) => {
        dispatch({
          
          type: typesUser.PUT_USER,
          payload: response.data,
         
        } );  console.log('res', response.data)
      })
      .catch((error) => {
        throw error;
      });
  };
};

