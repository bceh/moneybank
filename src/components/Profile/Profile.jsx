//Components
import AccountDeletion from "./AccountDeletion";
import Information from "./Information";
import Security from "./Security";
//mui/material
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Profile = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Information />
        </Grid>
        <Grid item xs={12}>
          <Security />
        </Grid>
        <Grid item xs={12}>
          <AccountDeletion />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
