import styled from "styled-components"

const Circle = ({ status, text }) => {
    return (
        <CircleWrapper>
            <CircleCss $status={status} />
            {text && <Font>{text}</Font>}
        </CircleWrapper>
    )
}
const CircleWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`
const CircleCss = styled.div`
    display: flex;
    justify-content: caenter;
    align-items: center;
    width: 11px;
    height: 11px;
    background-color:${({ $status }) =>
        $status === "completed" ? "#90EE90" :
            $status === "fail" ? "#FFCCCC" :
                $status === "progress" ? "#ADD8E6" :
                    "#DCDCDC"
    };
    border-radius: 50%;
`
const Font = styled.div`
    font-size: 12px;
    font-weight: 500;
`

export default Circle;