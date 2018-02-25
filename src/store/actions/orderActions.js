export const selectSeries = (series) => {
	return{
		type: 'SELECT_SERIES',
		series: series
	}
}

export const selectItem = (item, price) => {
	return{
		type: 'SELECT_ITEM',
		item: item,
		price: price
	};
}

export const toggleModal = (modalShown) => {
	return{
		type: 'TOGGLE_MODAL',
		modalShown: modalShown
	}
}

export const selectSugarLevel = (sugarLevel) => {
	return{
		type: 'SELECT_SUGAR_LEVEL',
		sugarLevel: sugarLevel
	}
}

export const selectIceLevel = (iceLevel) => {
	return{
		type: 'SELECT_ICE_LEVEL',
		iceLevel: iceLevel
	}
}

export const recordDate = (date) => {
	return{
		type: 'RECORD_DATE',
		date: date
	}
}