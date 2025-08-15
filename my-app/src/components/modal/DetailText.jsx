import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Button from "../button/Button";

const DetailText = ({ open, detailData, onClose }) => {
    const [selectText, setSelectText] = useState("");
    const [endDate, setEndDate] = useState("");
    const handleText = () => {
        setSelectText("");
    }
    const handleCancel = () => {
        const cache = localStorage.getItem("todoCache");
        if (cache) {
            const list = JSON.parse(cache);
            const updatedList = list.filter(item => item.nowDate !== detailData.nowDate);
            localStorage.setItem("todoCache", JSON.stringify(updatedList));
        }
        onClose();
    };
    useEffect(() => {
        if (open, detailData?.endDate, detailData?.startDate) {
            setEndDate(`${detailData.startDate} ~ ${detailData.endDate}`)
        }
        else if (open, detailData?.endDate) {
            setEndDate(`~${detailData.endDate}`);
        } else {
            setEndDate("")
        }
        if (open, detailData?.detailInfo) {
            setSelectText(detailData.detailInfo);
            return;
        } else if (open) {
            setSelectText("상세정보가 없습니다.");
        }
    }, [open])

    return (
        <Modal open={open} width={600}>
            <Container>
                <Container2>
                    <Text>{selectText}</Text>
                    <Text>{endDate}</Text>
                </Container2>
                <ButtonWrapper>
                    <Button text="닫기" onClick={() => {
                        handleText();
                        onClose();
                    }} />
                    <Button text="삭제" onClick={handleCancel} backgroundColor="#B22222" />
                </ButtonWrapper>
            </Container>
        </Modal>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction:column;
    gap: 16px;
    padding: 30px 50px;
`
const Container2 = styled.div`
    display: flex;
    flex-direction:column;
    background-color: #DCDCDC;
`
const Text = styled.div`
    color: black;
    font-size: 30px;
    text-align: center;
    user-select: none;
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;
export default DetailText;