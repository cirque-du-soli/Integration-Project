import { axios, axiosJWT } from "../api/axios";
import { useEffect } from "react";

const axiosJWT = () => {

    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refreshToken');

    useEffect(() => {

        // intercept requests and add token
        const reqInt = axiosJWT.interceptors.request.use(
            config => {
                if (!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        // intercept responses and check for 403 status
        const respInt = axiosJWT.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const response = await axios.get('/auth/refresh',
                        {
                            headers:
                                { authorization: `Bearer ${refreshToken}` }
                        });


                    prevRequest.headers['authorization'] = `Bearer ${response.data.token}`;
                    sessionStorage.setItem('token', response.data.token);
                    return axiosJWT(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosJWT.interceptors.request.eject(reqInt);
            axiosJWT.interceptors.response.eject(respInt);
        }
    })

    return axiosJWT;
}

export default axiosJWT;