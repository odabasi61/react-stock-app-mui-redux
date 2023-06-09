import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { object, string } from "yup";

// burası yup ile gelen hazır yapıdır. yup import edilirken object ve string de import edildi. burada hazır olmaları gerekir. email ve password string olduğu için onları çağırdık. sayısal değeri olan birşey olsa number import edip burada kullanmalıydık. ya da tarih olursa date. resmi sitesinde detaylı açıklıyor. değişken ismini biz belirledik (loginscheme)
export const loginScheme = object({
  email: string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: string()
    .required("Password is required!")
    .min(8, "Password must contain at least 8 characters!")
    .max(20, "Password cannot be more than 20 characters!")
    .matches(/\d+/, "Password must contain a number!")
    .matches(/[a-z]/, "Password must contain a lowercase letter!")
    .matches(/[A-Z]/, "Password must contain an uppercase letter!")
    .matches(
      /[!,?{}><%&$#£+-.]+/,
      "Password must contain a special character!"
    ),
});

// login.js deki formikten gelen probu burda destructure ettik.
const LoginForm = ({ values, handleChange, errors, touched, handleBlur }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* burada normal input da kullanılabilirdi ancak mui hazır textfield kullandık */}
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email}
          // buradaki handlechange, handleblur vs formik ile hazır geliyor. yukarda destructuring yapmamız yeterli. bunlar için fonksiyon yazmaya gerek yok
          onChange={handleChange}
          onBlur={handleBlur}
          // emaile dokunuldu mu? evet ise hatayı kontrol et. email hatası var ise helpertexte bas.
          helperText={touched.email && errors.email}
          error={touched.email && Boolean(errors.email)}
        />
        <TextField
          label="password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password && errors.password}
          error={touched.password && Boolean(errors.password)}
        />
        {/* bu buton mui lab dan hazır import edildi. style verilebiliyor.
                  ayrıca loading kısmındaki parametre olan loadingi authslice içinde belirlemiştik. burada import ettik */}
        <LoadingButton
          loading={loading}
          loadingPosition="center"
          variant="contained"
          type="submit"
        >
          Submit
        </LoadingButton>
      </Box>
    </Form>
  );
};

export default LoginForm;
