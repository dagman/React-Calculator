/* eslint-disable no-eval */
import React, { Component } from 'react';
import Display from '../../components/Display';
import BtnGroup from '../../components/BtnGroup';

import { Calculator } from './styles';

const userOperands = { '+': '+', '-': '-', '/': '÷', '*': '×' };
const operands = { '+': '+', '-': '-', '÷': '/', '×': '*' };

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.getDefaultState = this.getDefaultState.bind(this);
		this.adjustToDisplay = this.adjustToDisplay.bind(this);
		this.isPositive = this.isPositive.bind(this);
		this.adjustToDisplay = this.adjustToDisplay.bind(this);
		this.isMatchesAnOperand = this.isMatchesAnOperand.bind(this);
		this.calculate = this.calculate.bind(this);

		// this methods will get passed down to BtnGroup component
		this.clearDisplay = this.clearDisplay.bind(this);
		this.onNumberClick = this.onNumberClick.bind(this);
		this.onOperandClick = this.onOperandClick.bind(this);
		this.onNegPosClick = this.onNegPosClick.bind(this);
		this.onProcentClick = this.onProcentClick.bind(this);
		this.onZeroClick = this.onZeroClick.bind(this);
		this.onDotClick = this.onDotClick.bind(this);
		this.onResultClick = this.onResultClick.bind(this);
		
		// setting state for calculator
		this.state = this.getDefaultState();
	}

	getDefaultState() {
		return {
			top: '', // expression to show to user
			number: '0', // number that user types in
			expression: '0', // expression to use in calculation
			replacement: '',
		};
	}

	calculate(exp) { 
		return String(eval(exp));
	}

	isPositive(str) {
		return str[0] !== '-';
	}
	
	adjustToDisplay(exp) {
		return exp.replace(/[/*]/, match => userOperands[match]);
	}

	isMatchesAnOperand(exp) {
		return exp.match(/[\+\-\/\*]/);
	}

  clearDisplay() {
		this.setState(this.getDefaultState());
	}
 
	onNumberClick(e) {
		const value = e.target.textContent;
		const { number, expression, replacement } = this.state;

		this.setState({
			top: this.isMatchesAnOperand(expression.slice(1)) ? this.adjustToDisplay(expression) + value: '',
			number: number !== '0' ? number + value : value,
			expression: expression !== '0' && !replacement ? expression + value : value,
			replacement: '',
		});
	}

	onOperandClick(e) {
		const { number, replacement, expression } = this.state;
	
		if(!number && !replacement) return;
		
		// gonna use '-' not only for calculations but for showing too 
		const userOperand = e.target.textContent.replace('−', '-');
		const calculated = this.calculate(expression);
		const nextExpChunk = !expression.includes('e') ? calculated : expression;


		this.setState({
			top: `${nextExpChunk} ${userOperand} `, 
			expression: `${nextExpChunk} ${operands[userOperand]} `, 
			number: '',
			replacement: '',
		});
	}

	onNegPosClick() {
		const { number, replacement } = this.state;
		
		if(!number && !replacement) return;
		
		const { top, expression } = this.state;
		
		if(number) {
			const nextNum = 
			this.isPositive(number) 
				? '-' + number : number.slice(1);

			if(!top) {
				return this.setState({ 
					number: nextNum, 
					expression: nextNum
				});
			} else {
				const expChunk = 
				this.isPositive(number) 
					? expression.slice(0, expression.lastIndexOf(number))
					: expression.slice(0, expression.indexOf('('));
				
				const nextExp = 
				this.isPositive(number) 
					? `${expChunk}(${nextNum})` : `${expChunk}${nextNum}`;
				
				return this.setState({
					top: this.adjustToDisplay(nextExp),
					number: nextNum,
					expression: nextExp,
				});
			}
		} else {
			const nextNum = 
			this.isPositive(expression) 
				? '-' + expression : expression.slice(1);
			
			return this.setState({
				number: nextNum,
				expression: nextNum,
				replacement: '',
			});
		}
	}

	onProcentClick() {
		const { top, number, expression } = this.state;

		if(top && number && expression) {
			const firstNum = 
			this.isPositive(expression)
				? expression.split(/[+-/*]/)[0]
				: `-${expression.slice(1).split(/[+-/*]/)[0]}`;
			
			const expChunk = 
			this.isPositive(number)
				? expression.slice(0, expression.lastIndexOf(number))
				: expression.slice(0, expression.indexOf('('));
			 
			const procent = String(firstNum * (number / 100));

			const nextExp = 
			this.isPositive(procent)
				? `${expChunk}${procent}`
				: `${expChunk}(${procent})`;
	
			this.setState({
				top: this.adjustToDisplay(nextExp),
				number: procent,
				expression: nextExp,
			});
		}
	}

	onZeroClick() {
		const { number, expression } = this.state;
		if(expression === '0' || number === '0') return;
		
		this.setState({
			top: this.isMatchesAnOperand(expression) ? this.adjustToDisplay(expression) + '0' : '',
			number: number + '0',
			expression: expression + '0',
		});
		
	}

	onDotClick(e) {
		const { top, number, expression, replacement } = this.state;

		if(number.includes('.') || replacement.includes('.')) return;

		if(!top) {
			if(number) {
				return this.setState({
					number: number + '.',
					expression: expression + '.',
				});
			} else {
				return this.setState({
					number: replacement + '.',
					expression: expression + '.',
					replacement: '',
				});
			}
		}

		return this.setState({
			top: this.adjustToDisplay(expression) + '.',
			number: number + '.',
			expression: expression + '.',
			replacement: '',
		});
	}

	onResultClick() {
		const { top, number, expression } = this.state;

		if(!top || !number) return;

		let value = this.calculate(expression);
		if(value.length > 10) {
			value = String(Number(value).toExponential());
		}
		
		this.setState({
			top: '',
			number: '',
			expression: value,
			replacement: value,
		});
	}

	// disable rendering if expression value is not gonna to change
	shouldComponentUpdate(_, nextState) {
		return this.state.expression !== nextState.expression;
	}

	// componentDidUpdate() {
	// 	console.log(this.state);
	// }

	render() {
		return (
			<Calculator>
				<Display {...this.state} />
				<BtnGroup {...this} />
			</Calculator>
		);
	}
}
