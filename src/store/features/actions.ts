export const CREATE_FEATURE = 'CREATE_FEATURE';
export const CREATE_FEATURE_SUCCESS = 'CREATE_FEATURE_SUCCESS';
export const CREATE_FEATURE_FAILURE = 'CREATE_FEATURE_FAILURE';

export const createFeature = (data: string) => {
  return {
    type: CREATE_FEATURE,
    payload: data,
  };
};

export const createFeatureSuccess = (data: string) => {
  return {
    type: CREATE_FEATURE_SUCCESS,
    payload: data,
  };
};

export const createFeatureFailure = (data: string) => {
  return {
    type: CREATE_FEATURE_FAILURE,
    payload: data,
  };
};

export const EDIT_FEATURE = 'EDIT_FEATURE';
export const EDIT_FEATURE_SUCCESS = 'EDIT_FEATURE_SUCCESS';
export const EDIT_FEATURE_FAILURE = 'EDIT_FEATURE_FAILURE';

export const editFeature = (data: string) => {
  return {
    type: EDIT_FEATURE,
    payload: data,
  };
};

export const editFeatureSuccess = (data: string) => {
  return {
    type: EDIT_FEATURE_SUCCESS,
    payload: data,
  };
};

export const editFeatureFailure = (data: string) => {
  return {
    type: EDIT_FEATURE_FAILURE,
    payload: data,
  };
};

export const REMOVE_FEATURE = 'REMOVE_FEATURE';
export const REMOVE_FEATURE_SUCCESS = 'REMOVE_FEATURE_SUCCESS';
export const REMOVE_FEATURE_FAILURE = 'REMOVE_FEATURE_FAILURE';

export const removeFeature = (data: string) => {
  return {
    type: REMOVE_FEATURE,
    payload: data,
  };
};

export const removeFeatureSuccess = (data: string) => {
  return {
    type: REMOVE_FEATURE_SUCCESS,
    payload: data,
  };
};

export const removeFeatureFailure = (data: string) => {
  return {
    type: REMOVE_FEATURE_FAILURE,
    payload: data,
  };
};
