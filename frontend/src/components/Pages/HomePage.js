import React, { useState } from "react";
import { styled } from "styled-components";
import { FaSearch } from "react-icons/fa"; // Importing search icon from react-icons library
import { backendUrl } from "./Wizard";

const Text = styled.div`
  margin: 20px;
  color: #8056b0;
`;

const Button = styled.button`
  text-decoration: none;
  border-radius: 100px;
  padding: 15px 32px;
  text-align: center;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  outline: 0;
  margin: 0 2px;
`;

const TextInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-right: 10px;
  font-size: medium;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const InputContainer = styled.div`
  padding-left: 6%;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchButton = styled(Button)`
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #8056b0;
`;

export const NextButton = styled(Button)`
  background-color: #8056b0;
  color: white;
  border: 2px solid #8056b0;

  &:hover {
    background-color: white;
    color: #8056b0;
    border: 2px solid #8056b0;
  }
`;
export const PrevButton = styled(Button)`
  background-color: white;
  color: #212121;
  border: 2px solid #212121;

  &:hover {
    background-color: #8056b0;
    color: white;
    border: 2px solid #8056b0;
  }

  &:hover > .button-icon {
    filter: invert(100%);
  }
`;

const HomePage = ({ onStartClick }) => {
  const [number, setNumber] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/getCredentials/+91${number}`
      );
      if (response.status === 200) {
        setShowNextButton(true);
        setMessage("");
      } else {
        throw new Error();
      }
    } catch (error) {
      setMessage("Number is already registered.");
      setShowNextButton(false);
    }
  };

  return (
    <div>
      <Text>Check if the Number is already registered or not</Text>
      <InputContainer>
        <TextInput
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter 10 digit Mobile number"
        />
        <SearchButton onClick={handleSearch}>
          <FaSearch style={{ marginRight: "5px" }} />
        </SearchButton>
      </InputContainer>

      <Text>{message}</Text>

      {showNextButton && (
        <NextButton onClick={onStartClick}>
          <span>Start</span>
        </NextButton>
      )}
    </div>
  );
};

export default HomePage;
