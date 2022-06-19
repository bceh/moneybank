import AccountDeletion from "./AccountDeletion";
import Security from "./Security";
import Information from "./Information";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Profile = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={12} lg={12}>
          <Information />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Security />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <AccountDeletion />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
