import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./search_bar.css";
import sort_img from "../../assets/sort.png";
import search_img from "../../assets/search.png";
import MicrophoneOn from "@mui/icons-material/Mic";
import MicrophoneOff from "@mui/icons-material/MicOff";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SearchBar = ({
  openSearchComponent,
  searchQue,
  handleOpenBottomSheet,
  autoFocus,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const textRef = useRef();
  const navigate = useNavigate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
    if (autoFocus === true) {
      textRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setSearchQuery(transcript);
    searchQue(transcript);
  }, [transcript]);

  const detectKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchClick = async () => {
    searchQue(searchQuery);
  };

  const handleSearchPage = () => {
    if (openSearchComponent == true) {
      navigate("/search");
    }
  };

  const handleLiveText = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    searchQue(newQuery);
  };

  const handleStartSpeechRec = () => {
    SpeechRecognition.startListening();
  };
  const handleStopSpeechRec = () => {
    SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Container>
      <Box display="flex" alignItems="center" mt={3} onClick={handleSearchPage}>
        <TextField
          inputRef={textRef}
          variant="outlined"
          placeholder="Search recipes..."
          fullWidth
          value={searchQuery}
          className="text-input"
          onChange={(e) => handleLiveText(e)}
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
        {listening ? (
          <IconButton
            className="filter"
            sx={{ ml: 2 }}
            onClick={handleStopSpeechRec}
          >
            <MicrophoneOff />
          </IconButton>
        ) : (
          <IconButton
            className="filter"
            sx={{ ml: 2 }}
            onClick={handleStartSpeechRec}
          >
            <MicrophoneOn />
          </IconButton>
        )}
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
