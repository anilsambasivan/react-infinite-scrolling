import { combineReducers } from 'redux'
import { Action, Type } from '../actions/actions'
import { QuestionResponseModel } from '../models/questionModel'

export interface Questions {
  isFetching: boolean
  questions: QuestionResponseModel
  page?: number
}

export interface State {
  questions: Questions
}

const questions = (state: Questions = { isFetching: false, questions: {} as QuestionResponseModel }, action: Action): Questions => {
    switch (action.type) {
        case Type.SET_QUESTIONS: {
            if(!state.questions?.items){
                return { ...state, questions: action.questions }
            } else {
                state.questions.items = [...state.questions.items, ...action.questions.items]
                state.questions.has_more = action.questions.has_more;
                state.questions.quota_max = action.questions.quota_max;
                state.questions.quota_remaining = action.questions.quota_remaining;
                return state;
            }
            
        }
        case Type.SET_QUESTIONS_LOADING:
            return { ...state, isFetching: action.isFetching }
        case Type.SET_QUESTIONS_PAGE_NUMBER:
            return { ...state, page: action.page }
    }
    return state
}

export default combineReducers<State>({
    questions
})