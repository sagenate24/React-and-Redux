import axios from 'axios';

export function loginActions(data) {
    return dispatch => {
        return axios.post('/api/auth', data);
    }
}