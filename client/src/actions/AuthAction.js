import { SET_ERROR } from './types';

export const signUpUser = (userData, onAuth) => dispatch => {
    fetch('/api/users/signup', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((response) => {
        if (response && 'error' in response) {
            dispatch({
                type: SET_ERROR,
                payload: response.error
            });
        } else {
            onAuth(response);
        }
    }, (error) => {
        dispatch({
            type: SET_ERROR,
            payload: error.error
        });
    })
    .catch((error) => {
        dispatch({
            type: SET_ERROR,
            payload: error.error
        });
    });
}


export const loginAction = (data, onAuth) => dispatch => {
        fetch('/api/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.error === '') {
                onAuth(response);
            } else {
            dispatch({
                type: SET_ERROR,
                payload: response.error
            });
            }
        }, (error) => {
            dispatch({
                type: SET_ERROR,
                payload: error.error
            });
        })
        .catch((error) => {
            dispatch({
                type: SET_ERROR,
                payload: error.error
            });
            }    
        );
}