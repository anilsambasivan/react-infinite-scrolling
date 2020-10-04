import * as React from 'react'
import { RootState } from '../store'
import { connect } from 'react-redux'
import './questionList.css'
import { QuestionModel } from '../models/questionModel'

interface State {
}

interface OwnProps {
  question: QuestionModel
}


interface StateProps {
  question: QuestionModel
}

type Props = StateProps & OwnProps

export class Question extends React.Component<Props, State> {
    constructor(prop:Props) {
        super(prop)
    }

    render() {
        return (<tr>
                <td>{this.props.question.owner.display_name}</td>
                <td><a href={this.props.question.link} target="_blank">{this.props.question.title}</a></td>
                <td>{new Date(this.props.question.creation_date).toDateString()}</td>
            </tr>)
    }
}

const mapStateToProps = (ownProps: OwnProps): StateProps => {
  return {
    question: ownProps.question
  }
}


export default connect(mapStateToProps)(Question)