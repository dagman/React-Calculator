import styled from 'styled-components';

export const Screen = styled.div`
  width: 100%;
  height: 150px;
  color: #eee;
  text-align: right;
  background-color: #333;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const TopArea = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40%;
  align-items: center;
`;

export const TopAreaValue = styled.div`
  font-size: 1.5em;
  font-weight: 300;
`;

export const BottomArea = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 60%;
  align-items: flex-end;
`;

export const BottomAreaValue = styled.div`
  font-size: 3em;
  font-weight: 300;
`;
