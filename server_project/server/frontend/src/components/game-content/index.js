import { CardQuestionTherapistView, CardQuestionPatientView } from '../game-content/cardQuestion';

const GameContentComponent = (props) => {

    let content;

    switch (props.question.curQuestion.type) {
        case "Carta":
            content = (props.user.rol === 'terapeuta') ? 
                          <CardQuestionTherapistView infoContent={Object.assign({ 
                            cur: props.current, 
                            numOfQuestions: props.question.numQuestions, 
                            action: props.action, 
                            socket: props.socket, 
                            nextAction: props.nextAction
                         },props.question.curQuestion)} /> 
                        : <CardQuestionPatientView infoContent={Object.assign({ cur: props.current, numOfQuestions: props.question.numQuestions, action: props.action, socket: props.socket },props.question.curQuestion)} /> 
            break;
        default:
            break;
    }

    return content
}

export default GameContentComponent;