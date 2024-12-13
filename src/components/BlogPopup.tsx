import styled from "styled-components";
import { BlogPopupProps } from "../interfaces/interface";
import toast, { Toaster } from "react-hot-toast";

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
  width: 170px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1000;
  padding: 0px;
`;

const PopupItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f0f0f0;
  }

  img {
    width: 20px;
  }

  span {
    flex-grow: 1;
  }
`;

const BlogPopup: React.FC<BlogPopupProps> = ({
  onClose,
  onSave,
  onShare,
  isDetailPage,
}) => {
  const underBuild = () => toast.error("This is currently under development!");
  return (
    <PopupContainer>
      <div>
        <Toaster />
      </div>
      <PopupItem
        onClick={() => {
          onSave();
          underBuild();
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            padding: "5px",
          }}
        >
          <img
            style={{
              position: "relative",
              top: isDetailPage ? "0px" : "-25px",
            }}
            src="https://www.svgrepo.com/show/521819/save.svg"
          />
        </div>
        <span>Save</span>
      </PopupItem>
      <PopupItem
        onClick={() => {
          onShare();
          underBuild();
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            padding: "5px",
          }}
        >
          <img
            style={{
              position: "relative",
              top: isDetailPage ? "0px" : "-25px",
            }}
            src="https://www.svgrepo.com/show/521832/share-1.svg"
          />
        </div>

        <span>Share</span>
      </PopupItem>
    </PopupContainer>
  );
};

export { ThreeDotsButton, BlogPopup };
