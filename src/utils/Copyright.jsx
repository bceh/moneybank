import Typography from "@mui/material/Typography";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {`Copyright © Francis Cheng ${new Date().getFullYear()}.`}
    </Typography>
  );
};

export default Copyright;
