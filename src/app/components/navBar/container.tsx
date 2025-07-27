
import { getUserFromSession } from '@/lib/session';

const NavBar = async () => {
  const user = await getUserFromSession();
  
  if (!user) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      welcome back {user.userName} 
    </div>
  );
};
export default NavBar;