import { createStore, combineReducers, applyMiddleware, DeepPartial } from 'redux'
import question, { State as QuestionState } from '../reducers/reducers'
import thunk from 'redux-thunk'

export interface RootState {
    question: QuestionState
}

export default createStore(combineReducers<RootState>({
    question
}), applyMiddleware(thunk))