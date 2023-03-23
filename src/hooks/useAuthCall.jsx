import axios from "axios";
import { fetchFail, fetchStart, loginSuccess,
  logoutSuccess,
  registerSuccess, } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

// hook lar düz javascript dosyasında kullanılamaz. ya component dosya olmalı ya da hook dosyası olmalı. hook isimleri use ile başlar. dosyamız bu yüzden useauthcall.
// custom hook ne zaman kullanılır? birden çok component içerisinde kullanılabilecek bir fonksiyon (mesela buradaki fetch işlemleri gibi) varsa bunu oluşturabiliriz. burada return kısmında birey yapmıyoruz. böylece gereksiz render yapmaz.

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = "https://12170.fullstack.clarusway.com/";

  const login = async (userInfo) => {
    // fetchstart authslicedaki reducerdan geliyor
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      // loginsuccess authslicedaki reducerdan geliyor
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/stock");
      console.log(data);
    } catch (error) {
      // fetchfail authslicedaki reducerdan geliyor
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(fetchStart())
    try {
      await axios.post(`${BASE_URL}account/auth/logout/`)
      dispatch(logoutSuccess())
      toastSuccessNotify("Logout performed")
      navigate("/")
    } catch (err) {
      dispatch(fetchFail())
      toastErrorNotify("Logout can not be performed")
    }
  }

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      )
      dispatch(registerSuccess(data))
      toastSuccessNotify("Register performed")
      navigate("/stock")
    } catch (err) {
      dispatch(fetchFail())
      toastErrorNotify("Register can not be performed")
    }
  }

  return { login, register, logout }
};

export default useAuthCall;
