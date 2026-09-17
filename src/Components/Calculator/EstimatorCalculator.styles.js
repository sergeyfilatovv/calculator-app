import styled from "styled-components";

export const CalculatorHeader = styled.header`
  text-align: center;
  margin-bottom: 32px;

  h1 {
    margin: 0 0 8px;
    font-size: 28px;
    font-weight: 700;
  }
`;

export const CalculatorSubtitle = styled.p`
  margin: 0;
  color: #666;
`;

export const CalculatorForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CalculatorSection = styled.section`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const CalculatorFooter = styled.footer`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;