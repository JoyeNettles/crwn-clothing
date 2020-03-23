import {takeLatest, call, put, all} from "@redux-saga/core/effects";
import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.util";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync()  {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get(); // comes back in promise form
        const collections = yield call(convertCollectionsSnapshotToMap, snapshot); //call just invokes a function (arg. 1), with params (arg 2)
        yield put(fetchCollectionsSuccess(collections)); // how you dispatch the action in saga
    } catch (error) { // to get error from collections
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync )
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}
