import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/modals/FirmModal"
import useStockCall from "../hooks/useStockCall";
import { flex } from "../styles/globalStyle";

// firma api çekme işlemini birden çok yerde kullanacağımız için (mesela purchases) usestockcall isimli hook oluşturduk. ve aşağıdaki fetch işlemlerini oraya taşıyıp ordan tekrar buraya çağırdık.

// import axios from "axios"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice"

const Firms = () => {
  // const { token } = useSelector((state) => state.auth)
  // const dispatch = useDispatch()

  // const getFirms = async () => {
  //   const BASE_URL = "https://10001.fullstack.clarusway.com/"
  //   dispatch(fetchStart())
  //   const url = "firms"
  //   try {
  //     const { data } = await axios(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //       postman de yaptığımız authorization işlemleri. header kısmında yapılıyor. hem post hem get işleminde yapıyoruz. post/auth girişi yaparken token verir.
  //     })
  //     dispatch(getSuccess({ data, url }))
  //   } catch (error) {
  //     console.log(error)
  //     dispatch(fetchFail())
  //   }
  // }

  const { getStockData } = useStockCall();
  const { firms } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    // getFirms()
    getStockData("firms");
  }, []);

  console.log(firms);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>

      <Button sx={{ mb: 2 }} variant="contained" onClick={handleOpen}>
        New Firm
      </Button>

      {/* burada açılacak olan modal firmmodal isimli component. ona çeşitli stateler propsladık */}
      <FirmModal open={open} handleClose={handleClose} info={info}
        setInfo={setInfo}/>
      <Grid container sx={flex}>
        {firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
