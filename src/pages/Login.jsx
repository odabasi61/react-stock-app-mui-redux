import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import { object, string } from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuthCall from "../hooks/useAuthCall";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state?.auth);

  const { login } = useAuthCall();

  // burası yup ile gelen hazır yapıdır. yup import edilirken object ve string de import edildi. burada hazır olmaları gerekir. email ve password string olduğu için onları çağırdık. sayısal değeri olan birşey olsa number import edip burada kullanmalıydık. ya da tarih olursa date. resmi sitesinde detaylı açıklıyor. değişken ismini biz belirledik (loginscheme)
  const loginScheme = object({
    email: string()
      .email("Lutfen valid bir email giriniz")
      .required("Email zorunludur"),
    password: string()
      .required("password zorunludur")
      .min(8, "password en az 8 karakter olmalıdır")
      .max(20, "password en fazla 20 karakter olmalıdır")
      .matches(/\d+/, "Password bir sayı içermelidir")
      .matches(/[a-z]/, "Password bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
      .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
  });

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
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* burada normal input da kullanılabilirdi ancak mui hazır textfield kullandık */}
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values?.email || ""}
                    // buradaki handlechange, handleblur vs formik ile hazır geliyor. yukarda destructuring yapmamız yeterli. bunlar için fonksiyon yazmaya gerek yok
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // emaile dokunuldu mu? evet ise hatayı kontrol et. email hatası var ise helpertexte bas.
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values?.password || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  {/* bu buton mui lab dan hazır import edildi. style verilebiliyor.
                  ayrıca loading kısmındaki parametre olan loadingi authslice içinde belirlemiştik. burada import ettik */}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
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
