import { Typography, Box } from "@mui/material";
import { TailSpin } from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      pt={"150px"}
    >
      <TailSpin
        height="50"
        width="50"
        radius="3"
        color="green"
        ariaLabel="loading"
      />
      <Typography ml={"10px"} mt={"10px"} pt={"10px"} fontWeight={"bold"}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoaderSpinner;
