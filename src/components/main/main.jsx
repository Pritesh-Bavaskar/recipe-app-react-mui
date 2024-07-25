import React, { useEffect, useState } from "react";
import { Container, Typography, Box, IconButton, Button } from "@mui/material";
import RecipeCard from "../recipe_card/recipe_card";
import LoaderSpinner from "../loader_spinner/loader_spinner";
import "./main.css";
import user_img from "../../assets/user.png";

import {
  getListAllCategories,
  getRecipesByArea,
  getRecipesByCategory,
} from "../../api";
import { useHorizontalScroll } from "../horizontal_scroll/horizontal_scroll";
import RecipeCardArea from "../recipe_card_area/recipe_card_area";
import SearchBar from "../search_bar/search_bar";

const Main = () => {
  const [highlighted, setHighlighted] = useState("all");
  const [recipes, setRecipes] = useState([]);
  const [recipesArea, setRecipesArea] = useState([]);
  const [specificCategory, setSpecificCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoryListData = await getListAllCategories();
        setRecipes(categoryListData);
        const allReceipesbyAreaData = await getRecipesByArea("Chinese");
        setRecipesArea(allReceipesbyAreaData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      const fetchSpecificCategoryData = async () => {
        setLoading(true);
        try {
          const promises = recipes.map((recipe) =>
            getRecipesByCategory(recipe.strCategory)
          );
          const results = await Promise.all(promises);
          const flattenedResults = results.flat();
          setSpecificCategory(flattenedResults);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchSpecificCategoryData();
    }
  }, [recipes]);

  const scrollRef = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const scrollRef3 = useHorizontalScroll();

  const handleClick = (id) => {
    setHighlighted(id);
    setLoading(true);
    let allCatData = [];
    const fetchData = async () => {
      try {
        if (id !== "all") {
          const allCategoryData = await getRecipesByCategory(id);
          setSpecificCategory(allCategoryData);
        } else {
          const promises = recipes.map((recipe) =>
            getRecipesByCategory(recipe.strCategory)
          );
          const results = await Promise.all(promises);
          allCatData = results.flat();
          setSpecificCategory(allCatData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  const handleSearchQue = (searchQuery) => {
    console.log(searchQuery);
  };

  return (
    <Container className="main">
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(255, 255, 255, 0.8)"
          zIndex={9999}
        >
          <LoaderSpinner />
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        className="main"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          className="main"
          ml="5px"
        >
          <Typography variant="h5" className="title">
            Hello Jaya
          </Typography>
          <Typography variant="subtitle1" className="subtitle">
            What are you cooking today?
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box ml={2}>
            <IconButton className="profile">
              <img
                src={user_img}
                alt="profile"
                style={{ borderRadius: "50%", height: "40px" }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <SearchBar
        autoFocus={false}
        openSearchComponent={true}
        searchQue={handleSearchQue}
      />

      <Box position="relative">
        <Box
          display="flex"
          justifyContent="space-around"
          mt={2}
          className="recipe-row"
          ref={scrollRef}
        >
          <Button
            variant="contained"
            disableElevation={true}
            className="button"
            onClick={() => handleClick("all")}
            style={{
              backgroundColor: highlighted === "all" ? "#129575" : "white",
              color: highlighted === "all" ? "white" : "#129575",
            }}
          >
            All
          </Button>
          {recipes
            ? recipes.map((res, i) => (
                <Button
                  key={res.strCategory}
                  variant="contained"
                  disableElevation={true}
                  className="button"
                  onClick={() => handleClick(res.strCategory)}
                  style={{
                    backgroundColor:
                      highlighted === res.strCategory ? "#129575" : "white",
                    color:
                      highlighted === res.strCategory ? "white" : "#129575",
                  }}
                >
                  {res.strCategory}
                </Button>
              ))
            : null}
        </Box>
      </Box>

      <Box position="relative">
        <Box className="recipe-row" ref={scrollRef2}>
          {specificCategory
            ? specificCategory.map((res, i) => {
                return (
                  <RecipeCard
                    key={i}
                    title={res.strMeal}
                    time="15 Mins"
                    rating="4.5"
                    image={res.strMealThumb}
                  />
                );
              })
            : null}
        </Box>
      </Box>

      <Box mt={3}>
        <Typography
          variant="h5"
          alignItems="start"
          display="flex"
          fontWeight="bold"
          ml="10px"
        >
          New Recipes of your Area
        </Typography>
        <Box position="relative">
          <Box
            display="flex"
            mt="20px"
            mb="50px"
            className="recipe-row"
            ref={scrollRef3}
          >
            {recipesArea
              ? recipesArea.map((res, i) => {
                  return (
                    <RecipeCardArea
                      key={i}
                      title={res.strMeal}
                      time="20 mins"
                      rating="5.0"
                      image={res.strMealThumb}
                      author="James Milner"
                    />
                  );
                })
              : null}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Main;
