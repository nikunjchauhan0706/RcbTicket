import React, { useState } from "react";
import { styled } from "styled-components";
import HomePage from "./HomePage";
import SetupPage from "./SetupPage";
import FinishPage from "./FinishPage";
import ProgressBar from "./ProgressBar";

const MainPage = styled.div`
  margin: 70px auto;
  padding: 40px 20px;
  min-width: 800px;
  text-align: center;
  background: #fff;
  overflow: hidden;
  max-width: 850px;
  border-radius: 30px 30px;
  box-shadow: 0px 0px 20px 8px #ddd;
`;
const Title = styled.div`
  margin: 25px;
  font-size: 2em;
  text-align: center;
  color: #212121;
  font-family: "Aeonik", sans-serif;
`;
export const url = "https://rcbticket.onrender.com";
const Wizard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPageClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <HomePage onStartClick={handleNextPageClick} />;
      case 1:
        return (
          <SetupPage
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
          />
        );
      case 2:
        return <FinishPage />;
      default:
        return null;
    }
  };
  return (
    <MainPage>
      <Title>
        <span>Hello! </span>
        <div>Welcome to the RCB ticket notifier App</div>
      </Title>
      <ProgressBar currentPage={currentPage} />
      {renderPage()}
    </MainPage>
  );
};

export default Wizard;
