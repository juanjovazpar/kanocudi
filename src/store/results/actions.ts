export const GET_RESULTS = 'GET_RESULTS';
export const GET_RESULTS_SUCCESS = 'GET_RESULTS_SUCCESS';
export const GET_RESULTS_FAILURE = 'GET_RESULTS_FAILURE';

export const getResults = (data: string) => {
  return {
    type: GET_RESULTS,
    payload: data,
  };
};

export const getResultsSuccess = (data: string) => {
  return {
    type: GET_RESULTS_SUCCESS,
    payload: data,
  };
};

export const getResultsFailure = (data: string) => {
  return {
    type: GET_RESULTS_FAILURE,
    payload: data,
  };
};
