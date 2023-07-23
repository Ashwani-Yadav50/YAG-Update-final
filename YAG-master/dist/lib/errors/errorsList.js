'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const errorsList = exports.errorsList = {
  pricingPlanServiceError: {
    code: 'INTERNAL_SERVER_ERROR',
    detail: 'An unexpected error prevented the server from fulfilling the request'
  },
  planIDNotFound: {
    code: 'PLAN_NOT_FOUND',
    detail: 'Pricing Plan with the specified ID not found'
  }
};