import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { QuestionResponseModel } from '../models/questionModel'
import { getAllQuestions as apiGetAllQuestions } from '../services/questionsService'

export enum Type {
    SET_QUESTIONS = 'SET QUESTIONS',
    SET_QUESTIONS_LOADING = 'SET QUESTIONS LOADING',
    SET_QUESTIONS_PAGE_NUMBER = 'SET_QUESTION_PAGE_NUMBER'
}


// Actions
export interface SetAction {
  type: Type.SET_QUESTIONS
  questions: QuestionResponseModel
}

export interface SetFetcing {
  type: Type.SET_QUESTIONS_LOADING
  isFetching: boolean
}

export interface SetPage {
    type: Type.SET_QUESTIONS_PAGE_NUMBER
    page?: number
  }

// Merging Action Types
export type Action = SetAction | SetFetcing | SetPage

// Action Creators
export const set = (questions: QuestionResponseModel): SetAction => {
  return { type: Type.SET_QUESTIONS, questions }
}
export const isFetching = (isFetching: boolean): SetFetcing => {
  return { type: Type.SET_QUESTIONS_LOADING, isFetching }
}
export const setPage = (page?: number): SetPage => {
    return { type: Type.SET_QUESTIONS_PAGE_NUMBER, page }
}

// Thunk action method
export const getAllQuestions = (page?: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      return new Promise<void>(() => {
        dispatch(isFetching(true))
        // Get question in progress

        apiGetAllQuestions(page).then(res => {
            dispatch(set(res.data))
            dispatch(isFetching(false))
            dispatch(setPage(page))
        }).catch(error => {
            console.log(error);
            dispatch(isFetching(false))
        })
      })
    }
  }
