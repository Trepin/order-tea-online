const checkValidity = (value, rules, inputid) => {
	let isValid = true;
	let errMessage = null;

	if(rules.minLength){
		let isFulfilled = value.length >= rules.minLength;
		isValid = isFulfilled && isValid;
		errMessage = isFulfilled ? errMessage : 'password must be more then 8 characters';
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		let isFulfilled = pattern.test(value);
		isValid = isFulfilled && isValid;
		errMessage = isFulfilled ? errMessage : 'format of email is invalid'
	}


	if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        let isFulfilled = pattern.test( value );
        isValid = isFulfilled && isValid
        errMessage = isFulfilled ? errMessage : 'you should only enter number'
    }

	if(rules.required){
		let isFulfilled = value.trim() !== '';
		isValid = isFulfilled && isValid;
		errMessage = isFulfilled ? errMessage : inputid + ' is required';
	}

	return {
		isValid: isValid,
		errMessage: errMessage
	}

};

export default checkValidity;