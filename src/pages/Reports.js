import React from 'react';
import TopView from '../../src/TopView.png'
import styled from "styled-components";
import DataComponent from '../../src/components/DataComponent/index.js'


const Buggy = styled.img`
height: 70%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Leftie = styled.div`
width: 15%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: absolute;
left: 20%;
top: 20%;
`;

const Rightie = styled.div`
width: 15%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: absolute;
right: 20%;
top: 20%;
`;

const Spacing = styled.div`
padding: 40% 0%;
`;

function Reports() {
  return (
    <div className='reports'>
      <Buggy src = {TopView} alt = "dune buggy top view"></Buggy>
      <Leftie>
        <DataComponent dataType = "RPM (x1000)" dataNum = "2.4"></DataComponent>
        <Spacing></Spacing>
        <DataComponent dataType = "RPM (x1000)" dataNum = "2.4"></DataComponent>
      </Leftie>
      <Rightie>
        <DataComponent dataType = "RPM (x1000)" dataNum = "2.4"></DataComponent>
        <Spacing></Spacing>
        <DataComponent dataType = "RPM (x1000)" dataNum = "2.4"></DataComponent>
      </Rightie>
      {/* <h1>Reports</h1> */}
    </div>
  );
}

export default Reports;