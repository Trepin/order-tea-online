import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LevelPicker.css';

const levelPicker = (props) => {
	let chosenLevel = props.level;
	let choices = props.choices.map(choice => {
		let classes = 'Choice';
		if(chosenLevel === choice){
			classes = 'Choice Chosen';
		}
		return(
			<div key={choice} className={classes} onClick={() => props.selectLevel(choice)}>
				{choice}
			</div>
			)
	})

	return(
		<div className='container Choices'>
			{choices}
		</div>
	)
}

export default levelPicker;