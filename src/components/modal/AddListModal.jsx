import { useState, useEffect } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import Button from "../button/Button";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import {CheckAddListTypes} from "../../types/types"


/**
 * 
 * @param {*} param0 
 * @returns toDo, detailInfo, endDate, startDate, nowDate, completeInfo
 */
const AddListModal = ({ open, onClose, toDoValue }) => {
  /**
   * 할 일(타이틀, 제목, 마감일, 시작일)
   */
  const [toDo, setToDo] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  /**
   * 상세정보
   */
  const [showDetail, setShowDetail] = useState(false);
  const [detailInfo, setDetailInfo] = useState("");
  /**
   * 중복 입력 방지
   */
  const [isOneData, setIsOneData] = useState(false);
  /**
   * 당일 할 일 확인
   */
  const [showDay, setShowDay] = useState(false);

  


  /**
   * 값 초기화
   */
  useEffect(() => {
    if (open) {
      setToDo("");
      setEndDate("");
      setDetailInfo("");
      setStartDate("");
      setIsOneData(true);
    }
  }, [open])

  return (
    <Modal open={open} width={600}>
      <Container>
        <Title>할 일을 추가해주세요</Title>

        <CheckBoxLabel>
          <input
            type="checkbox"
            checked={showDetail}
            onChange={() => setShowDetail((prev) => !prev)}
          />
          상세 내용 입력
        </CheckBoxLabel>
        <CheckBoxLabel>
          <input
            type="checkbox"
            checked={showDay}
            onChange={() => setShowDay((prev) => !prev)}
          />
          당일
        </CheckBoxLabel>

        <Label>할 일</Label>
        <Input value={toDo} onChange={(e) => setToDo(e.target.value)} />
        {!showDay && (
          <>
            <Label>시작일</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e)=> setStartDate(e.target.value)}
            />
          </>
        )}
        <Label>마감일</Label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {showDetail && (
          <>
            <Label>상세정보</Label>
            <Input
              value={detailInfo}
              onChange={(e) => setDetailInfo(e.target.value)}
              placeholder="상세정보를 입력하세요."
            />
          </>
        )}


        <ButtonWrapper>
          <Button text="닫기" onClick={onClose} />
          <Button text="추가" onClick={() => {
            if (!toDo.trim()) {
              alert("할 일을 입력해주세요.")
              return;
            }
            if (isOneData) {
              const nowDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
              toDoValue({ toDo, detailInfo, endDate, startDate, nowDate, completeInfo: false });
              setIsOneData(false);
            }
            onClose();
          }} />
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

AddListModal.propTypes = CheckAddListTypes;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px 50px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const CheckBoxLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  justify-content: flex-end;
`
export default AddListModal;
