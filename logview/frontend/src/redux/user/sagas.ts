import { takeLatest, put, call, all } from "redux-saga/effects";


function* userRegister (action){
    try {
        const currentUser = yield call(register, {})
        yield put({
            type: 'GET_ALL_RECIPES_SUCCESS',
            payload: allRecipes
        });
    } catch (error) {
        yield put({
            type: 'GET_ALL_RECIPES_FAILED',
            error
        });
    }
}




export default function* userSaga() {
    yield all ([
        takeLatest('USER_REGISTER', userRegister),
        takeLatest('USER_LOGIN', userLogin),
        takeLatest('USER_UPDATE_PROFILE', userUpdate),
    ])
}