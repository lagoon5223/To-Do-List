import styled from "styled-components";
import CheckList from "../components/CheckList";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import AddListModal from "../../components/modal/AddListModal";
import { useNavigate } from 'react-router-dom';
import Circle from "../../components/Circle";

const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [toDoList, setToDoList] = useState([]);
    const [cacheCheck, setCacheCheck] = useState(false);
    const [reFresh, setReFresh] = useState(false);

    const navigate = useNavigate();

    //할 일 추가 모달 열기
    const handleOpenModal = () => {
        setIsOpen(true);
    }
    //할 일 추가 모달 닫기
    const handleCloseModal = () => {
        setIsOpen(false);
    }
    //캐시 가져오기
    const handleGetCache = () => {
        const cache = localStorage.getItem("todoCache");
        return cache;
    }
    /**
     * 스위치가 on이 됐을 때 completedInfo 수정
     */
    const handleReFresh = (nowDate) => {
        if (nowDate) {
            const cache = handleGetCache();
            if (cache) {
                const todoList = JSON.parse(cache);
                const updatedList = todoList.map(item =>
                    item.nowDate === nowDate
                        ? { ...item, completeInfo: true }
                        : item
                );
                // console.log(updatedList, "completed = true 일 떄")
                localStorage.setItem("todoCache", JSON.stringify(updatedList));
            }
        }
        setReFresh(true);
    }
    /**
     * 스위치가 off이 됐을 때 completedInfo 수정
     */
    const handleFail = (nowDate) => {
        if (nowDate) {
            const cache = handleGetCache();
            if (cache) {
                const todoList = JSON.parse(cache);
                const updatedList = todoList.map(item =>
                    item.nowDate === nowDate
                        ? { ...item, completeInfo: false }
                        : item
                );
                // console.log(updatedList, "completed = false 일 떄")
                localStorage.setItem("todoCache", JSON.stringify(updatedList));
            }
        }
        setReFresh(true)
    }
    /**
     * 캐시에 저장
     */
    useEffect(() => {
        if (cacheCheck) {
            localStorage.setItem("todoCache", JSON.stringify(toDoList));
            setCacheCheck(false);
        }
    }, [cacheCheck]);
    /**
     * 캐시 불러오기
     */
    useEffect(() => {

        const cache = localStorage.getItem("todoCache");
        if (cache) {
            setToDoList(JSON.parse(cache));
        }
        setReFresh(false);
    }, [reFresh]);
    /**
     * 날짜와 완료 여부를 확인하고 정렬하는 로직
     */
    useEffect(() => {
        const cache = handleGetCache();
        if (cache) {
            const todoList = JSON.parse(cache);
            const sorted = [...todoList].sort((a, b) => {
                if (a.completeInfo !== b.completeInfo) return a.completeInfo ? 1 : -1;
                const dateA = a.endDate ? new Date(a.endDate) : new Date(0);
                const dateB = b.endDate ? new Date(b.endDate) : new Date(0);
                return dateA - dateB;
            });
            setToDoList(sorted);
            localStorage.setItem("todoCache", JSON.stringify(sorted)); // 여기서 바로 저장
        }
    }, []);

    /**
     * 할 일 목록들
     * toDo, detailInfo, endDate, startDate, nowDate, completeInfo
     * 리뷰 : 변수 명을 하나로 지정.
     */
    const handleValue = (item) => {
        setToDoList(prev => [...prev, item]);
        setCacheCheck(true);
    };
    /**
     * 완료 페이지 이동
     */
    const handleCompletedPage = () => {
        navigate("/complete");
    }
    return (
        <Container>
            <Container2>
                <TitleFont>To-Do-List</TitleFont>
            </Container2>

            <Container3>
                <StatusContainer>
                    <Circle status="completed" text="완료" />
                    <Circle status="fail" text="마감일 지남" />
                    <Circle status="progress" text="진행 중" />
                    <Circle text="진행 전" />
                </StatusContainer>

                <ButtonContainer>
                    <Button onClick={handleOpenModal} text={"할 일 추가하기"} backgroundColor='#4CAF50' color='balck' />
                    <Button onClick={handleCompletedPage} text={"완료된 일 보기"} backgroundColor='#4CAF50' color='balck' />
                </ButtonContainer>
            </Container3>

            <CheckList
                toDoList={toDoList}
                reFresh={handleReFresh}
                isCompleted={handleReFresh}
                isFail={handleFail}
            />
            <AddListModal
                open={isOpen}
                onClose={handleCloseModal}
                toDoValue={handleValue}
            />
        </Container>
    );
}



const Container = styled.div`
    display: flex;
    margin: 20px;
    width: 100%;
    height: 100%;
    flex-direction: column;
`
const Container2 = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
`
const Container3 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
const ButtonContainer = styled.div`
    display: flex;
    width: 50%;
    height: auto;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    gap: 10px;
`
const StatusContainer = styled.div`
    display: flex;
    gap: 20px;
`
const TitleFont = styled.div`
    display: flex;
    color: #000000;
    font-size: 400%;
    justify-content: center;
    align-items: center;
`

export default MainPage;