import axios from "axios";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// hook lar düz javascript dosyasında kullanılamaz. ya component dosya olmalı ya da hook dosyası olmalı. hook isimleri use ile başlar. dosyamız bu yüzden useauthcall.
// custom hook ne zaman kullanılır? birden çok component içerisinde kullanılabilecek bir fonksiyon (mesela buradaki fetch işlemleri gibi) varsa bunu oluşturabiliriz. burada return kısmında birey yapmıyoruz. böylece gereksiz render yapmaz.

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userInfo) => {
    const BASE_URL = "https://12170.fullstack.clarusway.com/";

    // fetchstart authslicedaki reducerdan geliyor
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      // loginsuccess authslicedaki reducerdan geliyor
      dispatch(loginSuccess(data));
      navigate("/stock");
      console.log(data);
    } catch (error) {
      // fetchfail authslicedaki reducerdan geliyor
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return { login };
};

export default useAuthCall;
