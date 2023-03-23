import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import useAuthCall from "../hooks/useAuthCall";
import LoginForm, { loginScheme } from "../components/LoginForm"

const Login = () => {

  const { login } = useAuthCall();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            // form yapımızda ne varsa burda formik hazır componentinde hepsini yapıyoruz. initial values, başlangıç değerleri için. validationshema, yazdığımız kodun olasılıkları yani şu durumda geçerli olsun şu durumda hata versin vs. onsubmit de submitte olacaklar. sonra formik içine form yapısını ekliyoruz. bu form yapısı değişkeni olmayan bir fonksiyon içinde yazılıyor. bu değişkensiz fonksiyon içinde destructuring yaptık.
            initialValues={{ email: "", password: "" }}
            // kütüphanesinde validation ama biz harici şey eklediğimiz için validationshema yaptık
            validationSchema={loginScheme}
            // burada value ve actionlar için iki parametre koyulur. herhangi bir isim de verilebilir ancak best practise olarak böyle verdik.
            onSubmit={(values, actions) => {
              // onsubmitte post işlemi yapılıyor yani girilen email password vs backende gidiyor. bunun için login fonksiyonuna (logini useauthcall dosyasında oluşturup buraya import ettik) values parametresi yazdık (bu parametre de aşağıdaki fonksiyonun içinde destructuring edilmişti ordan aldık)
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            // formikten gelen tüm fonksiyonları loginforma gönderdik.
            component={(props) => <LoginForm {...props} />}
          >
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Don't you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
