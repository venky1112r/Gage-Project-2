import { Typography } from "@mui/material";

const RedirectMessage = () => {
  return (
    <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
      For a secure login you will be redirected to a single-sign on page for logging into GAGE Dashboard.
    </Typography>
  );
};
 
export default RedirectMessage;