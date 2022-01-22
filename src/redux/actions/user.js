import Axios from "axios";
import { API_URL } from "../../constants/api";

export const registerUser = ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users`, {
      firstName,
      lastName,
      username,
      email,
      password,
      role: "user",
    })
      .then((result) => {
        delete result.data.password;
        dispatch({
          type: "USER_LOGIN",
          payload: result.data,
        });
        alert(`berhasil mendaftarkan user`);
      })
      .catch(() => {
        alert(`gagal mendaftarkan user`);
      });
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
      },
    })
      .then((result) => {
        // console.log(result.data);
        if (result.data.length) {
          if (password === result.data[0].password) {
            delete result.data[0].password;
            localStorage.setItem(
              "userDataEmmerce",
              JSON.stringify(result.data[0])
            );
            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
          } else {
            // handle error wrong password
            dispatch({
              type: "USER_ERROR",
              payload: "Wrong username/password",
            });
          }
        } else {
          // handle error username not found
          dispatch({
            type: "USER_ERROR",
            payload: "Wrong username/password",
          });
        }
      })
      .catch((error) => {
        alert(`Terjadi Kesalahan di server`);
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataEmmerce");

  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    })
      .then((result) => {
        delete result.data[0].password;
        localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]));

        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
