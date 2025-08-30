import styled from "styled-components";

const AddTodoButton = ({ onClick, text }) => {
    return (
        <>
            <OpenButton onClick={onClick}>{text}</OpenButton>
        </>
    );
};

const OpenButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    margin: 5px;
    background-color: #4CAF50;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default AddTodoButton;