import React, { useState } from "react";
import { NextButton, PrevButton } from "./HomePage";
import styled from "styled-components";
const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  text-align: right;
  display: flex;
  justify-content: center;
`;

const SetupPage = ({ onNextPageClick, onPrevPageClick }) => {
  const [formData, setFormData] = useState({
    accountSid: "",
    authToken: "",
    twilioContactNumber: "",
    personalMobileNo: "",
    ticketDate: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    setMessage("");

    console.log("data submitted");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Handle response
      if (response.ok) {
        console.log("nikunj");
        // If the response is successful, proceed to the next page
        onNextPageClick();
        console.log("nikunj");
      } else {
        throw new Error();
      }
    } catch (error) {
      setMessage("Error submitting data:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <label htmlFor="accountSid">Account SID:</label>
        <input
          type="text"
          id="accountSid"
          name="accountSid"
          value={formData.accountSid}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="authToken">Auth Token:</label>
        <input
          type="text"
          id="authToken"
          name="authToken"
          value={formData.authToken}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="twilioContactNumber">Twilio Contact Number:</label>
        <input
          type="text"
          id="twilioContactNumber"
          name="twilioContactNumber"
          value={formData.twilioContactNumber}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="personalMobileNo">Personal Mobile Number:</label>
        <input
          type="text"
          id="personalMobileNo"
          name="personalMobileNo"
          value={formData.personalMobileNo}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="ticketDate">Ticket Date:</label>
        <input
          type="date"
          id="ticketDate"
          name="ticketDate"
          value={formData.ticketDate}
          onChange={handleChange}
        />
      </InputContainer>
      <ErrorMessage>{message}</ErrorMessage>
      <ButtonContainer>
        <PrevButton onClick={onPrevPageClick}>
          <span className="txt-back"> Back</span>
        </PrevButton>
        <NextButton type="submit">
          <span>Next</span>
        </NextButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default SetupPage;
