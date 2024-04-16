import React from "react";
import styled from "styled-components";

const FinishPageContainer = styled.div`
  padding: 20px;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const FinishPage = () => {
  return (
    <FinishPageContainer>
      <Message>Thank you for submitting the form.</Message>
      <Message>
        You will receive a message on your registered mobile number.
      </Message>
      <Message>
        If not, please retry the same method again with correct credentials.
      </Message>
    </FinishPageContainer>
  );
};
export default FinishPage;
