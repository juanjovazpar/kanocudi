export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const getProducts = (data: string) => {
  return {
    type: GET_PRODUCTS,
    payload: data,
  };
};

export const getProductsSuccess = (data: string) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const getProductsFailure = (data: string) => {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: data,
  };
};

export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const getProduct = (data: string) => {
  return {
    type: GET_PRODUCT,
    payload: data,
  };
};

export const getProductSuccess = (data: string) => {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const getProductFailure = (data: string) => {
  return {
    type: GET_PRODUCT_FAILURE,
    payload: data,
  };
};

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const createProduct = (data: string) => {
  return {
    type: CREATE_PRODUCT,
    payload: data,
  };
};

export const createProductSuccess = (data: string) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const createProductFailure = (data: string) => {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: data,
  };
};

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_FAILURE = 'REMOVE_PRODUCT_FAILURE';

export const removeProduct = (data: string) => {
  return {
    type: REMOVE_PRODUCT,
    payload: data,
  };
};

export const removeProductSuccess = (data: string) => {
  return {
    type: REMOVE_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const removeProductFailure = (data: string) => {
  return {
    type: REMOVE_PRODUCT_FAILURE,
    payload: data,
  };
};

export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

export const editProduct = (data: string) => {
  return {
    type: EDIT_PRODUCT,
    payload: data,
  };
};

export const editProductSuccess = (data: string) => {
  return {
    type: EDIT_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const editProductFailure = (data: string) => {
  return {
    type: EDIT_PRODUCT_FAILURE,
    payload: data,
  };
};
