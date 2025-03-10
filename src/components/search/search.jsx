import { Box, IconButton, Container, Typography, Grid } from "@mui/material";
import SearchBar from "../search_bar/search_bar";
import "./search.css";
import arrow_left from "../../assets/arrow-left.png";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import {
  getRecipesByCategory,
  getRecipesBySearch,
  getRecipesByArea,
} from "../../api";
import RecipeCardSearch from "../recipe_card_search/recipe_card_search";
import FilterBottomSheet from "../filter_bottom_sheet/filter_bottom_sheet";
import debounce from "lodash/debounce";
import LoaderSpinner from "../loader_spinner/loader_spinner";

const Search = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");
  const [searchQue, setSearchQue] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      setLoading(true);
      try {
        const result1 = await getRecipesBySearch(searchQuery);
        const result2 = await getRecipesByCategory(selectedCategory);
        const result3 = await getRecipesByArea(selectedArea);
        if (result1 != null) {
          if (result2 != null && result3 == null) {
            const result = result1.filter((item1) =>
              result2.some((item2) => item2.strMeal === item1.strMeal)
            );
            setRecipes(result);
            // console.log("result:", result);
          } else if (result3 != null && result2 == null) {
            const result = result1.filter((item1) =>
              result3.some((item3) => item3.strMeal === item1.strMeal)
            );
            setRecipes(result);
            // console.log("result:", result);
          } else if (result2 == null && result3 == null) {
            setRecipes(result1);
            // console.log("result:", result1);
          } else {
            const result = result1.filter(
              (item1) =>
                result2.some((item2) => item2.strMeal === item1.strMeal) &&
                result3.some((item3) => item3.strMeal === item1.strMeal)
            );
            setRecipes(result);
            // console.log("result:", result);
          }
        } else {
          setRecipes([]);
          // console.log("result:", recipes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [selectedCategory, selectedArea]
  );

  const handleSearchQuery = (searchQuery) => {
    debouncedSearch(searchQuery);
    setSearchQue(searchQuery);
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    handleSearchQuery(searchQue);
  };

  return (
    <Container>
      <Box className="search-main">
        <IconButton onClick={() => navigate(-1)}>
          <img
            src={arrow_left}
            alt="search"
            style={{
              borderRadius: "50%",
              height: "20px",
              padding: "2px",
            }}
          />
        </IconButton>
        <Typography
          fontWeight={"bold"}
          fontSize={"18px"}
          ml={"-50px"}
          p={"0px 26px 0px 23px"}
        >
          Search recipes
        </Typography>
        <Box></Box>
      </Box>
      <SearchBar
        autoFocus={true}
        openSearchComponent={false}
        searchQue={handleSearchQuery}
        handleOpenBottomSheet={handleOpenBottomSheet}
      />
      <Box position="relative" minHeight="400px">
        {loading ? (
          <LoaderSpinner />
        ) : recipes && recipes.length ? (
          <>
            <Box className="search-result">
              <Typography fontWeight={"bold"}>Search Result</Typography>
              <Typography color={"#A9A9A9"} fontSize={"14px"}>
                {recipes.length} results
              </Typography>
            </Box>
            <Grid container spacing={0} justifyContent="center">
              {recipes.map((recipe, index) => (
                <Grid item key={index} m={"-15px"}>
                  <RecipeCardSearch recipe={recipe} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={"50px"}
          >
            <Typography fontWeight={"bold"}>No Results Found</Typography>
          </Box>
        )}
      </Box>

      {isBottomSheetOpen && (
        <Box className="overlay" onClick={handleCloseBottomSheet}>
          <FilterBottomSheet
            onClose={handleCloseBottomSheet}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
          />
        </Box>
      )}
    </Container>
  );
};

export default Search;
