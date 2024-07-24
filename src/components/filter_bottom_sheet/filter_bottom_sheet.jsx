import React, { useEffect, useState } from "react";
import "./filter_bottom_sheet.css";
import { Typography, Box, Button } from "@mui/material";
import { getAllAreas, getAllCategories } from "../../api";

const FilterBottomSheet = ({
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedArea,
  setSelectedArea,
}) => {
  const [categories, setCategory] = useState([]);
  const [areas, setArea] = useState([]);
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleClickCatHigh = (id) => {
    setSelectedCategory(id);
  };

  const handleClickAreaHigh = (id) => {
    setSelectedArea(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryListData = await getAllCategories();
      setCategory(categoryListData);
      const allReceipesbyAreaData = await getAllAreas("Chinese");
      setArea(allReceipesbyAreaData);
    };
    fetchData();
  }, []);

  return (
    <Box className="bottom-sheet" onClick={handleContentClick}>
      <Box className="bottom-sheet-content">
        <Typography fontWeight={"bold"}>Filter Search</Typography>
        <Box
          pl={"25px"}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"start"}
          flexDirection={"column"}
        >
          <Typography fontWeight={"bold"} p={"10px"}>
            Category
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"start"}
            alignItems={"start"}
            flexWrap={"wrap"}
          >
            <Button
              variant="outlined"
              className="outline-button"
              onClick={() => handleClickCatHigh("all")}
              style={{
                backgroundColor:
                  selectedCategory === "all" ? "#129575" : "white",
                color: selectedCategory === "all" ? "white" : "#129575",
                borderColor: "#129575",
              }}
            >
              All
            </Button>
            {categories
              ? categories.map((res, i) => (
                  <Button
                    key={i}
                    variant="outlined"
                    className="outline-button"
                    onClick={() => handleClickCatHigh(res.strCategory)}
                    style={{
                      backgroundColor:
                        selectedCategory === res.strCategory
                          ? "#129575"
                          : "white",
                      color:
                        selectedCategory === res.strCategory
                          ? "white"
                          : "#129575",
                      borderColor: "#129575",
                    }}
                  >
                    {res.strCategory}
                  </Button>
                ))
              : null}
          </Box>
          <Typography fontWeight={"bold"} p={"10px"}>
            Area
          </Typography>
          <Box
            pb={"20px"}
            display={"flex"}
            justifyContent={"start"}
            alignItems={"start"}
            flexWrap={"wrap"}
          >
            <Button
              variant="outlined"
              className="outline-button"
              onClick={() => handleClickAreaHigh("all")}
              style={{
                backgroundColor: selectedArea === "all" ? "#129575" : "white",
                color: selectedArea === "all" ? "white" : "#129575",
                borderColor: "#129575",
              }}
            >
              All
            </Button>
            {areas
              ? areas.map((res, i) => (
                  <Button
                    key={i}
                    variant="outlined"
                    className="outline-button"
                    onClick={() => handleClickAreaHigh(res.strArea)}
                    style={{
                      backgroundColor:
                        selectedArea === res.strArea ? "#129575" : "white",
                      color: selectedArea === res.strArea ? "white" : "#129575",
                      borderColor: "#129575",
                    }}
                  >
                    {res.strArea}
                  </Button>
                ))
              : null}
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        disableElevation={true}
        className="bottom-sheet-button"
        onClick={onClose}
      >
        Filter
      </Button>
    </Box>
  );
};

export default FilterBottomSheet;
