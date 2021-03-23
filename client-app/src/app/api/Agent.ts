import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/Activity';

axios.defaults.baseURL="http://localhost:5000/api";

const sleep = (delay: number) => {
    return new Promise(
        (resolve)=>{
            setTimeout(resolve,delay);
        }
    )
}

axios.interceptors.response.use(response =>{
    return sleep(1000).then(
       () => { return response; }
    ).catch(
        (error)=> {
            console.log(error);
            return Promise.reject(error);
        }
    )
});

const responseBody = <T> (response:AxiosResponse<T>) => { return response.data} 

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url:string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url:string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url:string) => axios.delete<T>(url).then(responseBody),
}

const activities = {
    list:  () => { return requests.get<Activity[]>(`/activities`)},
    details:  (id:string) => {return requests.get<Activity[]>(`/activities/${id}`)},
    create:  (activity:Activity) => {return requests.post<Activity>(`/activities`, activity)},
    update:  (id:string, activity:Activity) => {return requests.put<Activity>(`/activities/${id}`,activity)},
    remove:  (id:string) => {return requests.del<Activity>(`/activities/${id}`)}
}

const agent = {
    activities
}

export default agent
