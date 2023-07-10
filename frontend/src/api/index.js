import axios from 'axios';

const url = 'http://localhost:5001';

export const login = async (email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        email,
        password
    }
    try {
        const res = await axios.post(url+'/api/users/login', body, config);
        return res
    } catch (err) {

    }
}

export const getProducts = async (params) => {
    try {
        const res = await axios.get(url+'/api/display',{
            params
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const uploadData = async (data) => {
    try {
        const res = await axios.post('/api/uploadData', data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const uploadImage = async (data) => {
    try {
        const res = await axios.post('/api/upload', data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
