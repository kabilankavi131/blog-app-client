import styled from "styled-components";
import { BlogPopupProps } from "../interfaces/interface";
import toast, { Toaster } from "react-hot-toast";

const ThreeDotsButton = styled.button`
  position: absolute;
  top: 20px;
  left: 83%;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  z-index: 1000;
  @media (min-width: 300px) and (max-width: 800px) {
    left: 85%;
  }
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 270px;
  width: 170px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.31);
  border-radius: 5px;
  z-index: 90;
  padding: 0px;
  @media (min-width: 300px) and (max-width: 800px) {
    left: 40%;
  }
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
    <PopupContainer
      style={{
        position: "absolute",
        right: isDetailPage ? "270px" : "10px",
      }}
    >
      <div>
        <Toaster />
      </div>
      <PopupItem
        onClick={() => {
          onSave();
          underBuild();
        }}
        style={{
          position: "relative",
          marginLeft: "0px",
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
              width: "20px",
            }}
            src="https://www.svgrepo.com/show/521819/save.svg"
          />
        </div>
        <span>Save</span>
      </PopupItem>
      <PopupItem
        style={{
          position: "relative",
          marginLeft: "0px",
        }}
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
              width: "20px",
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
