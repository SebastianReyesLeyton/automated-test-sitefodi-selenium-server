
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";

import GameContentComponent from "../../game-content";
import { getNumberOfQuestion, getQuestion } from "../../../actions/test";
import { updateQuestionLocation ,finishTherapy } from "../../../actions/therapy";
import { storeResponse } from "../../../actions/results";

import { resetGame } from "../../../reducers/game";

import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../api/conf";

import "./game.css";

let socket;

const GamePage = () => {

    const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem('user'));
    const test = useSelector((state) => state.game);
    const { idTest, idTherapy, currentQuestion } = useParams();
    const [ curQuestion, setCurQuestion ] = useState(Number(currentQuestion));
    const [ questionD, setQuestionD ] = useState(test);
    const [ load, setLoad ] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(getNumberOfQuestion(idTest, navigate));
                dispatch(getQuestion(idTest, curQuestion, navigate));
        socket = io(SOCKET_URL);
        socket.emit('join_therapy_session', idTherapy);
    }, [])

    console.log(load, curQuestion, questionD, test);

    useEffect(() => {
        // if (questionD === null ) {
        //     setLoad(false);
        //     setQuestionD(test);
        // } 
        // else if (test.curQuestion.id !== questionD.curQuestion.id) {
        //     setLoad(false);
        //     setQuestionD(test);
        // }
        if (test.curQuestion.id !== questionD.curQuestion.id) {
            setQuestionD(test);
            setLoad(false);
        }
    }, [test]);

    useEffect(() => {
        setCurQuestion(Number(currentQuestion));
        dispatch(getNumberOfQuestion(idTest, navigate));
        dispatch(getQuestion(idTest, Number(currentQuestion), navigate));
    }, [location.pathname])

    console.log(curQuestion);

    const handleSocketNext = (data) => {
        socket.emit('next', { therapy: idTherapy, curQuestion: curQuestion });
        dispatch(storeResponse(data, { idTherapy, qType: questionD.curQuestion.type, idQuestion: questionD.curQuestion.id }, navigate));
    }

    const handleNextQuestion = (cur = curQuestion) => {
        // e.preventDefault();
        if (!load) {
            console.log(cur);
            if ( cur < questionD.numQuestions ) {
                // setCurQuestion(cur + 1);
                // dispatch(getNumberOfQuestion(idTest, navigate));
                // dispatch(getQuestion(idTest, cur + 1, navigate));
                dispatch(updateQuestionLocation({idTherapy, currentQuestion: cur + 1}, navigate));
                navigate(`/therapy/${idTherapy}/test/${idTest}/question/${cur + 1}`, {replace: true});
                setLoad(true);
            } else {
                dispatch(resetGame());
                dispatch(finishTherapy(idTherapy));
                navigate('/home');
            }
        }
    }

    if ( !Boolean(user) ) return <Navigate to="/" replace />;

    return (
        <div className="game-container">
            <div className="game-content">
                {
                    load ? 
                        <h1>Cargando</h1> 
                        :
                        <>
                            <label className="question-counter">{curQuestion} de {questionD.numQuestions}</label>
                            <GameContentComponent user={user} question={questionD} current={curQuestion} action={handleNextQuestion} socket={socket} nextAction={handleSocketNext} />
                        </> 
                }
            </div>
        </div>
    )
}

export default GamePage;