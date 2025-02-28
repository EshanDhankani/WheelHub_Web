import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";

function HomeSection({ imageSrc }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        background: "linear-gradient(142deg, #030950, #12175F, #2F1F2F)",
        paddingTop: "3%",
        height: "110vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          gap: 1,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "60px",
            },
            paddingLeft: {
              xs: 0,
              md: 10,
            },
            fontWeight: 100,
            color: "white",
            margin: 0,
          }}
        >
          Find Your Dream Car From{" "}
          <Box component="span" sx={{ fontWeight: "bold" }}>
            WheelHub{" "}
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 1,
            paddingTop: "10px",
            paddingLeft: {
              xs: 0,
              md: 10,
            },
          }}
        >
          <Link href="/login">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C7253E",
                color: "black",
                fontWeight:"bold",
                fontSize:"20px",
                textTransform: "none",
                borderRadius: "25px",
              }}
            >
              Get Started
            </Button>
          </Link>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#EBEAFF",
              color: "black",
              fontWeight:"bold",
              fontSize:"20px",
              textTransform: "none",
              borderRadius: "25px",
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: { xs: 1, md: 0 },
        }}
      >
        <img
          src={imageSrc}
          alt="Home"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

    </Box>

  );
}

HomeSection.propTypes = {
  imageSrc: PropTypes.string.isRequired,
};

export default HomeSection;

