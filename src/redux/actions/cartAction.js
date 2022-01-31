import Axios from "axios";
import { API_URL } from "../../constants/api";

export const getCartData = (userId) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId,
      },
    })
      .then((result) => {
        // dispatch to cart reducer dengan payload -> result.data
        dispatch({
          type: "FILL_CART",
          payload: result.data,
        });
      })
      .catch(() => {
        alert(`terjadi kesalahan di server (cartAction:17)`);
      });
  };
};
