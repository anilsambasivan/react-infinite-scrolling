import * as React from 'react'
import { RootState } from '../store'
import { connect } from 'react-redux'
import { getAllQuestions } from '../actions/actions'
import { ThunkDispatch } from 'redux-thunk'
import { Questions } from '../reducers/reducers'
import { Question } from './question'

import './questionList.css'

interface State {
    prevYAxis: 0
}

interface OwnProps {
}

interface DispatchProps {
    getAllQuestions: (page?: number) => void
}

interface StateProps {
  questions: Questions
}

type Props = StateProps & OwnProps & DispatchProps

export class QuestionList extends React.Component<Props, State> {
    observer = {} as IntersectionObserver;
    loadingRef = {} as Element;
    currentPage = 1;

    constructor(prop:Props) {
        super(prop)
        this.state = {
            prevYAxis: 0
        };
    }

    componentDidMount() {
        // load the first page on initial render of application
        this.props.getAllQuestions(1);
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities: any, observer: any) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevYAxis > y) {
            this.currentPage = this.currentPage + 1;
            this.props.getAllQuestions(this.currentPage);
        }
        this.setState({ prevYAxis: y });
    }

    render() {
        // todo: move inline styles to css file
        const loadingTextCSS = { display: this.props.questions?.isFetching ? "block" : "none" };
  
        return (
        <div className="table table-hover">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Question Title</th>
                        <th scope="col">Created Date</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.questions?.questions?.items?.map((question) => {
                    return  <Question question={question}></Question>
                    })}
                   
                </tbody>
            </table>
            <div ref={loadingRef => (this.loadingRef = loadingRef as Element)} className="loading-css">
                <span style={loadingTextCSS}>Loading...</span>
            </div>`
        </div>
        )
    }
}

const mapStateToProps = (states: RootState, ownProps: OwnProps): StateProps => {
  return {
    questions: states.question.questions
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    getAllQuestions: async (page?: number) => {
      await dispatch(getAllQuestions(page))
      console.log('Made Get All Questions Call')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)