const initialState = {
	token: null,
	userId: null,
	loading: false,
	error: null
};

const authStart = (state, action) => {
	return {
		...state,
		loading: true,
		error: null
	}
}

const logout = (state, action) => {
    return {
    	...state,
    	token: null,
    	userId:null
    }
};

const authSuccess = (state, action) => {
	return {
		...state,
		token: action.token,
		userId: action.userId,
        error: null,
        loading: false
	}
}

const authFail = (state, action) => {
	return{
		...state,
		error:action.error.toLowerCase().split('_').join(' '),
		loading: false
	}
} 

const reducer = (state = initialState, action) => {
	switch(action.type){
		case 'AUTH_START': return authStart(state, action);
		case 'AUTH_SUCCESS': return authSuccess(state, action);
		case 'LOG_OUT': return logout(state, action);
		case 'AUTH_FAIL': return authFail(state, action);
		default: return state;
	}
};

export default reducer;