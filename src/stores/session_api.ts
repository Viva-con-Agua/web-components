import axios from 'axios';

const call = axios.create({
    baseURL: import.meta.env.VCA_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
call.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (
            error.response == undefined ||
            (error.response.status !== 401 &&
                error.response.data.message !== 'missing or malformed jwt')
        ) {
            return new Promise((_, reject) => {
                reject(error);
            });
        }
        if (error.config.url == '/auth/refresh') {
            return new Promise((_, reject) => {
                reject(error);
                window.location.href = '/logout';
            });
        }
        return new Promise((resolve, reject) =>
            api.call
                .get('/auth/refresh')
                .then((response) => {
                    if (response.status === 200) {
                        const config = error.config;
                        axios
                            .request(config)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    }
                })
                .catch((error) => {
                    window.location.href = '/logout';
                    reject(error);
                })
        );
    }
);

export default class api {
    static get call() {
        return call;
    }
    static create_call(url = import.meta.env.VCA_PUBLIC_BACKEND_URL) {
        return axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }
}
