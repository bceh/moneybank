import Typography from "@mui/material/Typography";

function Title(props) {
  const { children, ...rest } = props;
  return (
    <Typography component="h2" variant="h6" color="primary" {...rest}>
      {props.children}
    </Typography>
  );
}

export default Title;
