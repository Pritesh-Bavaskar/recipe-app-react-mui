import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
} from "@mui/material";
import "./recipe_card.css";
import bookmark_img from "../../assets/bookmark.png";
import { Star } from "@mui/icons-material";

const RecipeCard = ({ title, time, rating, image }) => {
  return (
    <Card
      sx={{
        maxWidth: 220,
        minWidth: 220,
        m: 1,
        border: "none",
        boxShadow: "none",
      }}
      className="recipe-card-main"
    >
      <Box
        sx={{ mr: "-25px", mb: "-75px", zIndex: "1" }}
        className="recipe-image-container"
      >
        <CardMedia
          component="img"
          height="140"
          src={image}
          alt={title}
          className="recipe-card-img"
        />
        <Typography
          variant="body2"
          color="text.secondary"
          className="recipe-card-rating"
          sx={{ ml: "-27px", mb: "30px" }}
        >
          <Star sx={{ height: "15px", color: "#FFAD30" }} />
          <Box>{rating}</Box>
        </Typography>
      </Box>
      <Box className="recipe-card-content">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="recipe-card-title"
        >
          {title}
        </Typography>
        <CardContent className="recipe-card-desc">
          <Typography
            variant="body2"
            color="text.secondary"
            className="recipe-card-time"
          >
            <Box>Time</Box>
            <Box sx={{ fontWeight: "bold" }}>{time}</Box>
          </Typography>
          <IconButton>
            <img
              src={bookmark_img}
              alt="filter"
              style={{
                borderRadius: "50%",
                height: "20px",
                padding: "4px",
                backgroundColor: "white",
              }}
            />
          </IconButton>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RecipeCard;
