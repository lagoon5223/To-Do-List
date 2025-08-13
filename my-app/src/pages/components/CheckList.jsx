import styled from "styled-components";
import { useState } from "react";
import DetailText from "../../components/modal/DetailText";
import SliceSwitch from "../../components/button/SliceSwitch";
import dayjs from "dayjs";

const CheckList = ({ toDoList, reFresh, isCompleted, isFail }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectItem, setSelectItem] = useState(null);

    const handleOpenModal = (item) => {
        setIsOpen(true);
        detailData(item);
    }
    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectItem(null);
    }
    const detailData = (item) => {
        setSelectItem(item);
    }
    const handleToggle = (nowDate, currentValue) => {
        if (currentValue) {
            isFail(nowDate);
        } else {
            isCompleted(nowDate);
        }
    };
    const today = dayjs().format("YYYY-MM-DD");
    console.log(today)
    // const handleComplete = (nowDate) => {
    //     if (nowDate) {
    //         isCompleted(nowDate);
    //     }
    // }
    // const handleFail = (nowDate) => {
    //     if (nowDate) {
    //         isFail(nowDate);
    //     }
    // }


    return (
        <Container>
            {toDoList.length === 0 && <p>할 일이 없습니다.</p>}
            {toDoList.map((item, index) => (
                <Item
                    key={index}
                    $completed={item.completedInfo}
                    $isOverview={item.endDate && new Date(item.endDate) < new Date(today)}
                >
                    <SliceSwitch
                        isOn={item.completeInfo}
                        onToggle={() => {
                            handleToggle(item.nowDate, item.completeInfo)
                        }}
                    />
                    <Font onClick={() => { handleOpenModal(item) }}>{item.toDo}</Font>
                    <Font onClick={() => { handleOpenModal(item) }}>{item.endDate && item.startDate ? `${item.startDate} ~ ${item.endDate}` : item.endDate ? `${item.endDate}` : ""}</Font>
                </Item>
            ))}
            <DetailText
                open={isOpen}
                detailData={selectItem}
                onClose={() => {
                    handleCloseModal();
                    reFresh();
                }}
            />
        </Container>
    );
};


const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 30px;
    gap: 10px;
    width: 90%;
    justify-content: flex-start;
`

const Item = styled.div`
    width: 19%;
    height: 140px;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    white-space: normal;
    word-break: break-word;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color:${props => props.$isOverview ? "#FFCCCC" : "#DCDCDC"} ;
    user-select: none;
`;

const Font = styled.div`
    font-size:18px;
    padding-top: 10px;
    cursor: pointer;
`
// const Date = styled.div`

// `

export default CheckList;