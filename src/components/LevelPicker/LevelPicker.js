import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LevelPicker.css';

const levelPicker = (props) => {
	let chosenLevel = props.level;
	let choices = props.choices.map(choice => {
		let classes = 'levelpicker-choice';
		if(chosenLevel === choice){
			classes = 'levelpicker-choice levelpicker-choice-chosen';
		}
		return(
			<div key={choice} className={classes} onClick={() => props.selectLevel(choice)}>
				{choice}
			</div>
			)
	})

	return(
		<div className='container levelpicker-choices'>
			{choices}
		</div>
	)
}

export default levelPicker;