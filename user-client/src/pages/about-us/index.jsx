import { Box, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h2" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        malesuada elit quis pharetra congue. Nunc auctor, velit sit amet
        faucibus varius, erat lacus iaculis dui, vel tempor turpis purus eget
        leo. Etiam vel ex sapien. Donec sit amet lobortis lorem. Suspendisse
        potenti. Duis nec commodo ipsum. Pellentesque vel aliquam tortor, ac
        commodo sapien. Nulla facilisi.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Sed ultricies nunc velit, vel commodo sapien malesuada non. Donec
        maximus arcu euismod enim porttitor, vitae interdum metus fringilla.
        Nullam sit amet vestibulum est. Vivamus ac massa eget sapien bibendum
        faucibus. Sed commodo hendrerit enim, vel ultrices risus cursus quis.
        Integer sit amet consequat libero.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Praesent ullamcorper, libero ac molestie vulputate, lorem mauris
        aliquam turpis, vel bibendum nunc ipsum nec urna. Morbi ut felis
        vulputate, euismod arcu nec, feugiat mauris. Pellentesque a nisl vel
        elit finibus maximus eu at tellus. Donec ornare quam eget velit
        vulputate, vel egestas tortor ultrices. Praesent finibus arcu at ante
        fermentum dapibus.
      </Typography>
    </Box>
  );
};

export default AboutUs;
