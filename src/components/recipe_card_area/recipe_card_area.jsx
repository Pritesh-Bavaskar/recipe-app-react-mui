import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
} from "@mui/material";
import "./recipe_card_area.css";
import time_img from "../../assets/time.png";
import auther_img from "../../assets/auther.png";
import { Star } from "@mui/icons-material";

const RecipeCardArea = ({ title, time, rating, image, author }) => {
  return (
    <Card
      sx={{
        maxWidth: 380,
        minWidth: 380,
        m: 1,
        border: "none",
        boxShadow: "none",
      }}
      className="recipe-card-area-main"
    >
      <Box sx={{ zIndex: "1" }} className="recipe-area-image-container">
        <CardMedia
          component="img"
          src={image}
          alt={title}
          className="recipe-card-area-img"
        />
      </Box>
      <Box className="recipe-card-area-content">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="recipe-card-area-title"
        >
          <span className="title-text">{title}</span>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="recipe-card-area-rating"
          sx={{ ml: "51px", mb: "30px" }}
        >
          {rating
            ? Array.from({ length: Math.abs(rating) }).map((_, index) => (
                <Star
                  key={index}
                  sx={{ height: "17px", color: "#FFAD30", ml: "-3px" }}
                />
              ))
            : null}
        </Typography>
        <CardContent className="recipe-card-area-desc">
          {author && (
            <Typography
              variant="body2"
              color="text.secondary"
              className="recipe-card-area-time"
            >
              <IconButton>
                <img
                  src={auther_img}
                  alt="filter"
                  style={{
                    borderRadius: "50%",
                    height: "20px",
                    marginLeft: "-5px",
                    backgroundColor: "white",
                  }}
                />
              </IconButton>
              By {author}
            </Typography>
          )}
          <Typography
            variant="body2"
            color="text.secondary"
            className="recipe-card-area-time"
          >
            <IconButton>
              <img
                src={time_img}
                alt="filter"
                style={{
                  borderRadius: "50%",
                  height: "20px",
                  padding: "4px",
                  backgroundColor: "white",
                }}
              />
            </IconButton>
            <Box sx={{ fontWeight: "bold" }}>{time}</Box>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RecipeCardArea;
