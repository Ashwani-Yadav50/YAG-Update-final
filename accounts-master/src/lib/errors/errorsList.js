export const errorsList = {
  accountServiceError: {
    code: 'INTERNAL_SERVER_ERROR',
    detail: 'An unexpected error prevented the server from fulfilling the request'
  },
  accountIDNotFound: {
    code: 'PLAN_NOT_FOUND',
    detail: 'Pricing Plan with the specified ID not found'
  },
  duplicateIDFound:{
    title:"Duplicate userName",
    status: 409,
    code: 'DUPLICATE_USERNAME_FOUND',
    detail: 'Duplicate username found while saving in database',
  },
  IDNOTFound:{
    title:"Duplicate userName",
    status: 401,
    code: 'KEY_NOT_FOUND',
    detail: 'Invalid Key Found.',
  },
   requestBodyNotFound:{
    title:"Empty Request Body",
    status: 409,
    code: 'REQUEST_BODY_NOT_FOUND',
    detail: 'Empty request body from client side.Check request body again.',
  },
  noContentFound:{
    title:"No content Found",
    status:204,
    code:'NO_CONTENT_FOUND',
    detail:'User account not found in database please make sure the user was already registerd or the username is correct.'
  }
}
