//Components
import AccManage from "./AccManage";
import CategoryManage from "./CategoryManage";
import PaperContainer from "../../utils/PaperContainer";
import Title from "../../utils/Title";
//mui/material
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const AccCateManage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PaperContainer subTitle="Account">
            <Title>Manage Accounts</Title>
            <AccManage />
          </PaperContainer>
        </Grid>
        <Grid item xs={12}>
          <PaperContainer subTitle="Category">
            <Title>Manage Categories</Title>
            <CategoryManage />
          </PaperContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccCateManage;
