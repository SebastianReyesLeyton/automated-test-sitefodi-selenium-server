import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth';
import UserReducer from './user';
import UsersReducer from './users';
import GetUserReducer from './getUser';
import ItemsReducer from './items';
import QuestionsReducer from './getQuestions';
import GetTestReducer from './getTest';
import GameReducer from './game';

export default configureStore({
    reducer: {
        auth: AuthReducer,
        userRequest: UserReducer,
        usersRequest: UsersReducer,
        getUser: GetUserReducer,
        items: ItemsReducer,
        questionsRequest: QuestionsReducer,
        getTest: GetTestReducer,
        game: GameReducer
    },
});