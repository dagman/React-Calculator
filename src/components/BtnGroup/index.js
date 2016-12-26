import styled from 'styled-components';
import React, { PropTypes as T } from 'react';
import Button from 'muicss/lib/react/button';

const Buttons = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const FlatButton = (props) => <Button variant="flat" {...props} />

const BtnGroup = ({
	onProcentClick,
	onNegPosClick,
	onResultClick,
	onZeroClick,
	onDotClick,
	onOperandClick,
	onNumberClick,
	clearDisplay,
}) => (
	<Buttons>
		<FlatButton onClick={clearDisplay}>AC</FlatButton>
		<FlatButton onClick={onNegPosClick}><sup>+</sup>/<sub>−</sub></FlatButton>
		<FlatButton onClick={onProcentClick}>%</FlatButton>
		<FlatButton onClick={onOperandClick} className="operand">÷</FlatButton>
		<FlatButton onClick={onNumberClick}>7</FlatButton>
		<FlatButton onClick={onNumberClick}>8</FlatButton>
		<FlatButton onClick={onNumberClick}>9</FlatButton>
		<FlatButton onClick={onOperandClick} className="operand">×</FlatButton>
		<FlatButton onClick={onNumberClick}>4</FlatButton>
		<FlatButton onClick={onNumberClick}>5</FlatButton>
		<FlatButton onClick={onNumberClick}>6</FlatButton>
		<FlatButton onClick={onOperandClick} className="operand">−</FlatButton>
		<FlatButton onClick={onNumberClick}>1</FlatButton>
		<FlatButton onClick={onNumberClick}>2</FlatButton>
		<FlatButton onClick={onNumberClick}>3</FlatButton>
		<FlatButton onClick={onOperandClick} className="operand">+</FlatButton>
		<FlatButton onClick={onZeroClick} className="fat-zero">0</FlatButton>
		<FlatButton onClick={onDotClick}>.</FlatButton>
		<FlatButton onClick={onResultClick} className="result">=</FlatButton>
	</Buttons>
);

BtnGroup.propType = {
	onProcentClick: T.func.isRequired,
	onNegPosClick: T.func.isRequired,
	onResultClick: T.func.isRequired,
	onZeroClick: T.func.isRequired,
	onDotClick: T.func.isRequired,
	onOperandClick: T.func.isRequired,
	onNumberClick: T.func.isRequired,
	clearDisplay: T.func.isRequired,
}

export default BtnGroup;
