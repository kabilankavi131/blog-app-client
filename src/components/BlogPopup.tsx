import styled from "styled-components";
import { BlogPopupProps } from "../interfaces/interface";

const ThreeDotsButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  width: 150px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1000;
  padding: 5px;
`;

const PopupItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f0f0f0;
  }
`;

const BlogPopup: React.FC<BlogPopupProps> = ({ onClose, onSave, onShare }) => {
  return (
    <PopupContainer>
      <PopupItem
        onClick={() => {
          onSave();
          onClose();
        }}
      >
        Save
      </PopupItem>
      <PopupItem
        onClick={() => {
          onShare();
          onClose();
        }}
      >
        Share
      </PopupItem>
    </PopupContainer>
  );
};

export { ThreeDotsButton, BlogPopup };
