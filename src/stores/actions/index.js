export const SAVE_TOKEN = 'SAVE_TOKEN';
export const ON_APP_READY = 'ON_APP_READY';
export const ON_APP_LOADING_FINISH = 'ON_APP_LOADING_FINISH';

export const saveToken = token => ({
  type: TOKEN_LOADING,
  payload: token,
});

export const onAppReady = () => ({
  type: ON_APP_READY,
});

export const onAppLoadingFinish = () => ({
  type: ON_APP_LOADING_FINISH,
});
