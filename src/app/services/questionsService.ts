
import { QuestionResponseModel } from "../models/questionModel";
import axios from 'axios';

// for now just the hard coded api url 
export const getAllQuestions = (page?: number) => {
    return axios.get<QuestionResponseModel>(`https://api.stackexchange.com/2.2/questions?page=${page}&pagesize=25&order=desc&sort=activity&site=stackoverflow`);
}