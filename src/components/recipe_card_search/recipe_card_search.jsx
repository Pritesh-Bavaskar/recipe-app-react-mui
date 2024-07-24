import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Star } from "@mui/icons-material";
import "./recipe_card_search.css";

const RecipeCardSearch = ({ recipe }) => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        width: 150,
        height: 150,
        margin: "20px",
        boxShadow: 3,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${recipe.strMealThumb})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          alignItems: "center",
          zIndex: 3,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          className="recipe-card-search-rating"
        >
          <Star sx={{ height: "14px", color: "#FFAD30" }} />
          4.0
        </Typography>
      </Box>
      <CardContent
        sx={{
          marginBottom: "-16px",
          position: "absolute",
          bottom: 0,
          width: "84%",
          zIndex: 3,
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontWeight={"bold"}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          maxWidth="125px"
          fontSize="17px"
          marginBottom="-1px"
        >
          {recipe.strMeal}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="#A9A9A9" fontSize="12px">
            By Chef John
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCardSearch;
