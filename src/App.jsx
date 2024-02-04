import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import LocationCard from "./Components/LocationCard";
import ResidentCard from "./Components/ResidentCard";
import Pagination from "./Components/Pagination";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (showWelcome) {
      const welcomeTimeout = setTimeout(() => {
        setShowWelcome(false);
        setShowLoading(true);
        clearTimeout(welcomeTimeout);
      }, 3000);
    }
  }, [showWelcome]);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`;

    if (!showWelcome) {
      setShowLoading(true);
      const timeoutId = setTimeout(() => {
        getLocation(url);
        setShowLoading(false);

        const titleElement = document.getElementById("title");
        if (titleElement) {
          titleElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [finder, showWelcome]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = textInput.current.value.trim();
    if (!inputValue) {
      setErrorMessage("Please enter a number before searching.");
    } else {
      setFinder(inputValue);
      setErrorMessage("");
      setShowInstructions(false);
    }
  };

  const quantity = 5;
  const second = currentPage * quantity;
  const first = second - quantity;

  let residentsPart =
    location && location.residents
      ? location.residents.slice(first, second)
      : [];

  return (
    <div className={`app ${showLoading ? "loading" : ""}`}>
      {showWelcome && (
        <div className="welcome-section">
          <img
            src="https://i.imgur.com/8e8oy5d.png"
            alt="Welcome Logo"
            className="welcome-logo"
          />
        </div>
      )}

      {showLoading && (
        <div className="loading-section">
          <h2 className="loading-text">Loading...</h2>
        </div>
      )}

      {!showLoading && !showWelcome && (
        <>
          {!isLoading && (
            <div className="banner-container">
              <img
                src="https://dorkdaily.com/wp-content/uploads/RickAndMortyBanner.jpg"
                alt="Banner"
                className="banner"
              />
            </div>
          )}

          <h1 id="title">Rick and Morty</h1>
          <form onSubmit={handleSubmit} className="app__form">
            <input
              className="app__text"
              type="number"
              ref={textInput}
              placeholder="type a number (1 to 126)"
            />
            <button className="app__btn">Search</button>
          </form>

          {errorMessage && <p>{errorMessage}</p>}

          {showInstructions && (
            <div className="welcome-container">
              <p>
                Welcome! <br />
                Enter a number between 1 and 126 to start exploring between the
                different locations.
              </p>
            </div>
          )}

          {hasError || finder === "0" ? (
            <h2>This location does not exist</h2>
          ) : (
            <>
              {!showInstructions && <LocationCard location={location} />}
              {!showInstructions &&
              location &&
              location.residents &&
              residentsPart.length > 0 ? (
                <div className="app__container">
                  {residentsPart.map((resident) => (
                    <ResidentCard key={resident} url={resident} />
                  ))}
                </div>
              ) : (
                !showInstructions && <p>No residents found</p>
              )}
              {!showInstructions && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={
                    location && location.residents
                      ? Math.ceil(location.residents.length / quantity)
                      : 0
                  }
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
