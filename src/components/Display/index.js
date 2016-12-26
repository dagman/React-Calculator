import React, { PropTypes as T } from 'react';
import { Screen, TopArea, TopAreaValue, BottomArea, BottomAreaValue } from './styles';


const Display = ({
	top,
	number,
	replacement
}) => (
	<Screen>
  	<TopArea>
			<TopAreaValue>{top}</TopAreaValue>
		</TopArea>
		<BottomArea>
 			<BottomAreaValue>{number ? number : replacement}</BottomAreaValue>
		</BottomArea>
	</Screen>
);

Display.propType = {
	top: T.string.isRequired,
	number:T.string.isRequired,
	replacement: T.string.isRequired,
};

export default Display;
