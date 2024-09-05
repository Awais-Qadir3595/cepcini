const BASE_URL = 'https://api.cepcini.mego.pk/api';

const ROUTES = {
  //Auth
  // addUser:'adduser',
  userlogin: '/login',
   getSpecificProducts:'/products',
   ticketsStatus:'/tickets-status'
   
};
export const KEEP_ALIVE = BASE_URL + '/keepalive-status';
export const GET_DASHBOARD = BASE_URL + '/dashboard';

const METHOD = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
};

export {BASE_URL, ROUTES, METHOD};
