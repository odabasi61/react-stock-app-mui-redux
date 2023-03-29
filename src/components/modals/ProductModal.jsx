import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { modalStyle } from "../../styles/globalStyle"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import useStockCall from "../../hooks/useStockCall"
import { useSelector } from "react-redux"

export default function ProductModal({ open, handleClose, info, setInfo }) {
  const { postStockData } = useStockCall()
  const { categories } = useSelector((state) => state.stock)
  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postStockData("products", info)
    handleClose()
    setInfo({
      category_id: "",
      brand_id: "",
      name: "",
    })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose()
          setInfo({ category_id: "", brand_id: "", name: "" })
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={info?.category_id}
                label="Category"
                onChange={handleChange}
              >
                {categories?.map((item) => (
                  <MenuItem key={item.id} value={10}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              required
              value={info?.name}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              variant="outlined"
              required
              value={info?.phone}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              required
              value={info?.address}
              onChange={handleChange}
            />

            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              required
              value={info?.image}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained">
              Submit Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
