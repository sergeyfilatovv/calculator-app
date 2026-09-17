// Catalog.styles.js
import styled from 'styled-components';


export const CatalogTitle = styled.h2`
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.2;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
`;

export const FilterButton = styled.button`
  padding: 10px 18px;
  border: 1px solid #e0e0e0;
  background: #fff;
  color: #333;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #a5a5a5;
    background: #f9f9f9;
  }

  /* Стили для активного состояния — только через styled-components */
  ${({ active }) =>
    active &&
    `
    background: #0d6efd;
    color: #fff;
    border-color: #0d6efd;

    &:hover {
      background: #0b5ed7;
      border-color: #0b5ed7;
    }
  `}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

export const CardBody = styled.div`
  padding: 16px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.15rem;
  color: #1a1a1a;
`;

export const CardSummary = styled.p`
  margin: 0 0 16px;
  color: #555;
  font-size: 0.92rem;
  line-height: 1.5;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #444;
  font-size: 0.9rem;
`;
