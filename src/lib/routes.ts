export const ROUTES = {

    LOGIN:'/auth/signin',
    SIGNUP:'/auth/register',
    

  
  USER:{
   RECEIPTS: (userId: string | number) => `/account/${userId}`
    },
  
};
export default ROUTES;