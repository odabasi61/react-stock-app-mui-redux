import axios from "axios";
import { useSelector } from "react-redux";

// bazı yerlerde axios ile veri çekme işlemini tekrarlı yapıyoruz. useaxios burada bize yardımcı oluyor. veriyi buraya çekip buradan da export ediyoruz. mesela usestatecall da get ve delete işlemleri için lazım olan veri çekme işlemleri için axioswithtoken isimli değişken oluşturduk. burada hem baseurl ile veriyi fetch ettik hem de postman de yaptığımız authorization işlemini yaptık (postman de header kısmında authorization için token gerekiyor. auth/login ile elde ettiğimiz token burada useselector den çekildi ve burada kullanıldı). aşağıda oluşturduğumuz yapı axios sitesinde axios instance kısmında mevcut. onu buraya uyarladık. token kullanmadığımız versiyona axiospublic adını verdik.

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  const axiosPublic = axios.create({
    baseURL: "https://12170.fullstack.clarusway.com/",
  });

  const axiosWithToken = axios.create({
    baseURL: "https://12170.fullstack.clarusway.com/",
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosWithToken, axiosPublic };
};

export default useAxios;
