import React from "react";
import styled from "styled-components";

const InviteeContainer = styled.div`    
  height: 11vw;
  width: 20vw;
  background-color: #F5F5F5;
  border-radius: 12px;
  margin: 1vw;
  transition: transform 0.08s ease-in-out;
  transition: box-shadow 0.08s ease-in-out;
  transform: scale(1.0, 1.0);
  cursor: pointer;
  :hover {
    opacity: .5;
  }
  :active {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);
  }
`;

const CardStyle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const TextBar = styled.div`
color: red;
padding: 3% 15%;
font-size: 1.8vw;
font-weight: bold;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
position: absolute;
//left: 0;
bottom: 0;
`;

const DataBar = styled.div`
font-weight: bold;
color: black;
padding: 9% 15%;
font-size: 8.5vw;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
position: absolute;
//left: 0;
bottom: 0;
`;

const DataComp = ({dataType,dataNum,...props}) => {
return <InviteeContainer>
        <CardStyle><DataBar>{dataNum}</DataBar>
        <TextBar>{dataType}</TextBar></CardStyle>
    </InviteeContainer>
};
export default DataComp;