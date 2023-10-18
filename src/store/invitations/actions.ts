export const CREATE_INVITATION = 'CREATE_INVITATION';
export const CREATE_INVITATION_SUCCESS = 'CREATE_INVITATION_SUCCESS';
export const CREATE_INVITATION_FAILURE = 'CREATE_INVITATION_FAILURE';

export const createInvitation = (data: string) => {
  return {
    type: CREATE_INVITATION,
    payload: data,
  };
};

export const createInvitationSuccess = (data: string) => {
  return {
    type: CREATE_INVITATION_SUCCESS,
    payload: data,
  };
};

export const createInvitationFailure = (data: string) => {
  return {
    type: CREATE_INVITATION_FAILURE,
    payload: data,
  };
};

export const EDIT_INVITATION = 'EDIT_INVITATION';
export const EDIT_INVITATION_SUCCESS = 'EDIT_INVITATION_SUCCESS';
export const EDIT_INVITATION_FAILURE = 'EDIT_INVITATION_FAILURE';

export const editInvitation = (data: string) => {
  return {
    type: EDIT_INVITATION,
    payload: data,
  };
};

export const editInvitationSuccess = (data: string) => {
  return {
    type: EDIT_INVITATION_SUCCESS,
    payload: data,
  };
};

export const editInvitationFailure = (data: string) => {
  return {
    type: EDIT_INVITATION_FAILURE,
    payload: data,
  };
};

export const REMOVE_INVITATION = 'REMOVE_INVITATION';
export const REMOVE_INVITATION_SUCCESS = 'REMOVE_INVITATION_SUCCESS';
export const REMOVE_INVITATION_FAILURE = 'REMOVE_INVITATION_FAILURE';

export const removeInvitation = (data: string) => {
  return {
    type: REMOVE_INVITATION,
    payload: data,
  };
};

export const removeInvitationSuccess = (data: string) => {
  return {
    type: REMOVE_INVITATION_SUCCESS,
    payload: data,
  };
};

export const removeInvitationFailure = (data: string) => {
  return {
    type: REMOVE_INVITATION_FAILURE,
    payload: data,
  };
};

export const SEND_INVITATION = 'SEND_INVITATION';
export const SEND_INVITATION_SUCCESS = 'SEND_INVITATION_SUCCESS';
export const SEND_INVITATION_FAILURE = 'SEND_INVITATION_FAILURE';

export const sendInvitation = (data: string) => {
  return {
    type: SEND_INVITATION,
    payload: data,
  };
};

export const sendInvitationSuccess = (data: string) => {
  return {
    type: SEND_INVITATION_SUCCESS,
    payload: data,
  };
};

export const sendInvitationFailure = (data: string) => {
  return {
    type: SEND_INVITATION_FAILURE,
    payload: data,
  };
};

export const SEND_INVITATIONS = 'SEND_INVITATIONS';
export const SEND_INVITATIONS_SUCCESS = 'SEND_INVITATIONS_SUCCESS';
export const SEND_INVITATIONS_FAILURE = 'SEND_INVITATIONS_FAILURE';

export const sendInvitations = (data: string) => {
  return {
    type: SEND_INVITATIONS,
    payload: data,
  };
};

export const sendInvitationsSuccess = (data: string) => {
  return {
    type: SEND_INVITATIONS_SUCCESS,
    payload: data,
  };
};

export const sendInvitationsFailure = (data: string) => {
  return {
    type: SEND_INVITATIONS_FAILURE,
    payload: data,
  };
};
