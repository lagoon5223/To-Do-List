import styled from "styled-components";
import { useEffect, useState } from "react";

const CompletePage = () => {
    const [completedList, setCompletedList] = useState([]);

    useEffect(() => {
        const cache = localStorage.getItem("todoCache");
        if (cache) {
            const todoList = JSON.parse(cache);
            const completedItems = todoList.filter(item => item.completeInfo === true);
            setCompletedList(completedItems);
        }
    }, []);

    return (
        <Container>
            <Title>완료된 할 일</Title>
            {completedList.length === 0 && <p>완료된 할 일이 없습니다.</p>}
            {completedList.map((item, index) => (
                <Item key={index}>
                    <Task>{item.toDo}</Task>
                    {item.endDate && <Date>{`${item.nowDate.match(/^\d{4}-\d{2}-\d{2}/)[0]} ~ ${item.endDate}`}</Date>}
                    {item.detailInfo && <Detail>{item.detailInfo}</Detail>}
                </Item>
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 30%;
    height: 100%;
`;
const Title = styled.h2`
    margin-bottom: 20px;
`;

const Item = styled.div`
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
`;

const Task = styled.div`
    font-weight: 700;
    font-size: 18px;
`;

const Date = styled.div`
    font-size: 14px;
    color: #555;
    margin-top: 5px;
`;

const Detail = styled.div`
    font-size: 14px;
    margin-top: 10px;
    white-space: pre-wrap;
`;

export default CompletePage;
