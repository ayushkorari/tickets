import axios from "axios";
import { useState } from "react";

export interface IRequest {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete',
    body?: any,
    onSuccess: (data?: any) => any
}

export default function useRequest ({url,method,body,onSuccess}: IRequest) {
    const [errors, setErrors] = useState<any[]>([]);
    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            setErrors([]);
            onSuccess(response.data);
            return response.data;
        } catch (error: any) {
            setErrors(error.response.data.errors);
        }
    }
    return {doRequest, errors};
} 