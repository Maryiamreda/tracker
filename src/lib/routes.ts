export const ROUTES = {

    LOGIN:'/auth/signin',
    SIGNUP:'/auth/register',
    

  
  USER:{
   RECEIPTS: (userName: string | number) => `/account/${userName}`
    },
  
};
export default ROUTES;