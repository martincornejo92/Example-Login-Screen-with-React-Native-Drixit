export const SAVE_TOKEN = 'SAVE_TOKEN';
export const ON_APP_READY = 'ON_APP_READY';
export const ON_APP_LOADING_FINISH = 'ON_APP_LOADING_FINISH';
export const ON_USER_DATA = 'ON_USER_DATA'

export const saveToken = token => ({
  type: SAVE_TOKEN,
  payload: token,
});

export const onUserData = user => ({
  type: ON_USER_DATA,
  payload: user,
});

export const onAppReady = () => ({
  type: ON_APP_READY,
});

export const onAppLoadingFinish = () => ({
  type: ON_APP_LOADING_FINISH,
});
