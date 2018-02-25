const initialState = {
	series: 'Milk Tea Series',
	item: null,
	price: null,
	modalShown: false,
	sugarLevel: 'full',
	iceLevel: 'full',
};

const selectSeries = (state, action) => {
	return{
		...state,
		series: action.series
	}
}

const selectItem = (state, action) => {
	return{
		...state,
		item: action.item,
		price: action.price
	}
}

const toggleModal = (state, action) => {
	return{
		...state,
		modalShown: action.modalShown
	}
}

const selectSugarLevel = (state, action) => {
	return{
		...state,
		sugarLevel: action.sugarLevel
	}
}

const selectIceLevel = (state, action) => {
	return{
		...state,
		iceLevel: action.iceLevel
	}
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case 'SELECT_SERIES': return selectSeries(state, action);
		case 'SELECT_ITEM': return selectItem(state, action);
		case 'TOGGLE_MODAL': return toggleModal(state, action);
		case 'SELECT_SUGAR_LEVEL': return selectSugarLevel(state, action);
		case 'SELECT_ICE_LEVEL': return selectIceLevel(state, action);
		default: return state;
	}
};

export default reducer;