// import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

// firma api çekme işlemini birden çok yerde kullanacağımız için (mesela purchases) usestockcall, firms vs isimli hook oluşturduk.

const useStockCall = () => {
  const dispatch = useDispatch();
  //   const { token } = useSelector((state) => state.auth)
  const { axiosWithToken } = useAxios();
  // axioswithtoken fonksiyonunu useaxios hook da oluşturduk. buraya import ediyoruz.

  // firms, brands, sales vs hepsi için ayrı ayrı fonksiyon yazmak yerine dinamik değişkenleri olan bir fonksiyon yazdık. adını da getstockdata verdik. bu yüzden url parametresini de ekledik.
  const getStockData = async (url) => {
    // const BASE_URL = "https://12170.fullstack.clarusway.com/"
    dispatch(fetchStart());
    try {
      //   const { data } = await axios(`${BASE_URL}stock/${url}/`, {
      //     headers: { Authorization: `Token ${token}` },
      //   })
      const { data } = await axiosWithToken(`stock/${url}/`);
      // console.log(data);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  // burada silme işlemi olacağı için id de ekledik. url endpoint için.
  const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      // axioswithtoken olduğu için baseurl e gerek kalmadı.
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} successfuly deleted`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not be deleted`);
    }
  };

  // burada post işlemi yapıyoruz. yeni firma ekleme kısmı. bilgi gittiği için parametre ekliyoruz. parametreye info dedik.
  const postStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} successfuly added`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not be added`);
    }
  };

  const putStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} info successfuly updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} info cannot be updated`);
    }
  };

  return { getStockData, deleteStockData, postStockData, putStockData };
};

export default useStockCall;
