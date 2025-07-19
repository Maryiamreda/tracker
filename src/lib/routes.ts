export const ROUTES = {

    LOGIN:'/auth/signin',
    SIGNUP:'/auth/register',
    EVENTS: {
    DETAILS: (eventId: any) => `/events/${eventId}`,
     BOOKEVENT:(eventId: any) => `/events/booking/${eventId}`,
  }

  ,
  USER:{
    RECEIPTS:'/:userid'
  },
  
};
export default ROUTES;