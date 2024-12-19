import styled from "styled-components";
import { BlogPopupProps } from "../interfaces/interface";
import toast, { Toaster } from "react-hot-toast";

const PopupContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 270px;
  width: 170px;
  box-shadow: 0 4px 8px var(--border-color);
  border-radius: 5px;
  z-index: 100;
  background: var(--background);
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
    background: var(--border-color);
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
  return (
    <PopupContainer
      style={{
        position: "absolute",
        right: isDetailPage ? "13%" : "7%",
      }}
    >
      <div>
        <Toaster />
      </div>
      <PopupItem
        onClick={() => {
          onSave();
          toast.error("This is currently under development!")
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="var(--primary-text)"
            style={{
              position: "relative",
              top: isDetailPage ? "0px" : "10%",
            }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
              fill="var(--primary-text)"
            />
          </svg>
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
          toast.error("This is currently under development!")
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            padding: "5px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="var(--primary-text)"
            style={{
              position: "relative",
              top: isDetailPage ? "0px" : "10%",
            }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.6495 0.799565C18.4834 -0.72981 16.0093 0.081426 16.0093 1.99313V3.91272C12.2371 3.86807 9.65665 5.16473 7.9378 6.97554C6.10034 8.9113 5.34458 11.3314 5.02788 12.9862C4.86954 13.8135 5.41223 14.4138 5.98257 14.6211C6.52743 14.8191 7.25549 14.7343 7.74136 14.1789C9.12036 12.6027 11.7995 10.4028 16.0093 10.5464V13.0069C16.0093 14.9186 18.4834 15.7298 19.6495 14.2004L23.3933 9.29034C24.2022 8.2294 24.2022 6.7706 23.3933 5.70966L19.6495 0.799565ZM7.48201 11.6095C9.28721 10.0341 11.8785 8.55568 16.0093 8.55568H17.0207C17.5792 8.55568 18.0319 9.00103 18.0319 9.55037L18.0317 13.0069L21.7754 8.09678C22.0451 7.74313 22.0451 7.25687 21.7754 6.90322L18.0317 1.99313V4.90738C18.0317 5.4567 17.579 5.90201 17.0205 5.90201H16.0093C11.4593 5.90201 9.41596 8.33314 9.41596 8.33314C8.47524 9.32418 7.86984 10.502 7.48201 11.6095Z"
              fill="var(--primary-text)"
            />
            <path
              d="M7 1.00391H4C2.34315 1.00391 1 2.34705 1 4.00391V20.0039C1 21.6608 2.34315 23.0039 4 23.0039H20C21.6569 23.0039 23 21.6608 23 20.0039V17.0039C23 16.4516 22.5523 16.0039 22 16.0039C21.4477 16.0039 21 16.4516 21 17.0039V20.0039C21 20.5562 20.5523 21.0039 20 21.0039H4C3.44772 21.0039 3 20.5562 3 20.0039V4.00391C3 3.45162 3.44772 3.00391 4 3.00391H7C7.55228 3.00391 8 2.55619 8 2.00391C8 1.45162 7.55228 1.00391 7 1.00391Z"
              fill="var(--primary-text)"
            />
          </svg>
        </div>

        <span>Share</span>
      </PopupItem>
    </PopupContainer>
  );
};

export { BlogPopup };
