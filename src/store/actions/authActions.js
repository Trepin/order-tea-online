import axios from 'axios';

export const authStart = () => {
	return{
		type: 'AUTH_START'
	};
};

export const authSuccess = (token, userId) => {
	return{
		type: 'AUTH_SUCCESS',
		token: token,
		userId: userId
	};
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: 'LOG_OUT'
    };
};

export const authFail = (error) => {
	return{
		type: 'AUTH_FAIL',
		error: error
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime*1000);
	}
}

export const register = (email, password) => {
	return dispatch => { 
		dispatch(authStart());

		const data = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyASpWhgWOhRy5uQ9gK-TO1CoMYxZCN1Yhc';

		axios.post(url, data)
			.then(response => {
				const expirationTime = new Date().getTime() + response.data.expiresIn * 1000;
				localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.localId);
				dispatch(checkAuthTimeout(response.data.expiresIn));
				dispatch(authSuccess(response.data.idToken, response.data.localId));
			})
			.catch(err => {
                dispatch(authFail(err.response.data.error.message));
            }
			)
	};
};

export const login = (email, password) => {
	return dispatch => {
		dispatch(authStart());

		const data = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyASpWhgWOhRy5uQ9gK-TO1CoMYxZCN1Yhc';

		axios.post(url, data)
			.then(response => {
				const expirationTime = new Date().getTime() + response.data.expiresIn * 1000;
				localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.localId);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err => {
                dispatch(authFail(err.response.data.error.message));
            }
			)
	}
}

export const checkAuthState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if(!token){
			dispatch(logout());
		}else{
			const expirationTime = localStorage.getItem('expirationTime');
			if(expirationTime <= new Date().getTime()){
				dispatch(logout());
			}else{
				const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationTime - new Date().getTime()) / 1000 ));
			}
		}
	}
}