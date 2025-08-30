import styled from "styled-components";
import { useState } from "react";
import DetailText from "../../components/modal/DetailText";
import SliceSwitch from "../../components/button/SliceSwitch";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { CheckAddListTypes } from "../../types/types";
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
    const checkDay = ({ startDate, endDate, completeInfo }) => {
        let colors;
        switch (true) {
            //완료된 일
            case completeInfo:
                colors = "completed"
                console.log("completed")
                break;
            //진행중인 일
            case !startDate && endDate === today:
                colors = "progress";
                console.log("completed2")
                break;
            case startDate && endDate &&
                (dayjs(today).isAfter(startDate) || dayjs(startDate).isSame(today)) &&
                (dayjs(today).isBefore(endDate) || dayjs(endDate).isSame(today)):
                colors = "progress";
                console.log("completed5")
                break;
            //아직 진행되지 않은 일
            case dayjs(endDate).isAfter(today):
                colors = "atmosphere";
                console.log("completed3")
                break;
            //지난 일
            case !startDate && dayjs(endDate).isBefore(today):
                colors = "fail";
                console.log("completed4")
                break;

            case startDate && dayjs(endDate).isBefore(today):
                colors = "fail";
                console.log("completed6")
                break;
        }
        return colors;
    }
    const today = dayjs().format("YYYY-MM-DD");

    return (
        <Container>
            {toDoList.length === 0 && <p>할 일이 없습니다.</p>}
            {toDoList.map((item, index) => (
                <Item
                    key={index}
                    $completed={item.completedInfo}
                    $status={checkDay(item)}
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

CheckList.propTypes = CheckAddListTypes;



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
    background-color: ${({ $status }) =>
        $status === "completed" ? "#90EE90" :
            $status === "fail" ? "#FFCCCC" :
                $status === "progress" ? "#ADD8E6" :
                    "#DCDCDC"
    };    user-select: none;
`;

const Font = styled.div`
    font-size:18px;
    padding-top: 10px;
    cursor: pointer;
`
// const Date = styled.div`

// `

export default CheckList;