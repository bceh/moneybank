import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
const PaperContainer = (props) => {
  const { children, subTitle } = props;
  return (
    <Paper
      sx={{
        p: 2,
        pt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: "gray", alignSelf: "flex-end" }}
      >
        {subTitle}
      </Typography>
      {children}
    </Paper>
  );
};

export default PaperContainer;
