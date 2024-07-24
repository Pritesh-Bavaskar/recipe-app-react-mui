import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./search_bar.css";
import sort_img from "../../assets/sort.png";
import search_img from "../../assets/search.png";

const SearchBar = ({
  openSearchComponent,
  searchQue,
  handleOpenBottomSheet,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchClick = async () => {
    searchQue(searchQuery);
  };

  const handleSearchPage = () => {
    if (openSearchComponent == true) {
      navigate("/search");
    }
  };

  return (
    <Container>
      <Box display="flex" alignItems="center" mt={3} onClick={handleSearchPage}>
        <TextField
          variant="outlined"
          placeholder="Type and hit search to find recipes..."
          fullWidth
          value={searchQuery}
          className="text-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={handleSearchClick}
          InputProps={{
            sx: { borderRadius: 3, height: "42px" },
            startAdornment: (
              <IconButton className="sort" onClick={handleSearchClick}>
                <img
                  src={search_img}
                  alt="search"
                  style={{
                    borderRadius: "50%",
                    height: "20px",
                    padding: "2px",
                  }}
                />
              </IconButton>
            ),
          }}
        />
        <IconButton
          className="filter"
          sx={{ ml: 2 }}
          onClick={handleOpenBottomSheet}
        >
          <img
            src={sort_img}
            alt="filter"
            style={{ borderRadius: "50%", height: "20px", padding: "2px" }}
          />
        </IconButton>
      </Box>
    </Container>
  );
};

export default SearchBar;
