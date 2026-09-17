import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalWindow = styled.div`
  background: #fff;
  width: 90%;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 24px;
  position: relative;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: #000;
  }
`;

export const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
  display: block;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 1.75rem;
  color: #1a1a1a;
`;

export const ModalPrice = styled.span`
  font-weight: 700;
  color: #0d6efd;
  font-size: 1.1rem;
  margin-right: 16px;
`;

export const ModalDuration = styled.span`
  color: #555;
  font-size: 0.95rem;
`;

export const ModalInfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
`;

export const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #333;
`;

export const ModalDescription = styled.p`
  line-height: 1.6;
  color: #444;
  margin: 0;
`;
