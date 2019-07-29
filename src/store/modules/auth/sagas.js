import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';

import { sigInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'session', {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error('Usuario nã é prestador');
    return;
  }

  yield put(sigInSuccess(token, user));

  history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
