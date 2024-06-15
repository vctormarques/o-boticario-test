import { Button } from '@chakra-ui/react';
import { IoMdClipboard } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';

interface NavLinkButtonProps {
  to: string;
  children: React.ReactNode;
  icon: React.ElementType;
}

const NavLinkButton: React.FC<NavLinkButtonProps> = ({
  to,
  children,
  icon
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const IconComponent = icon;
  console.log('path', location.pathname);
  console.log('isActive', isActive);
  return (
    <NavLink to={to} className={`nav-link ${isActive ? 'active' : 'inactive'}`}>
      <Button
        variant="link"
        color={isActive ? '#35a013' : 'gray.600'}
        leftIcon={<IconComponent />}
        fontSize={18}
      >
        {children}
      </Button>
    </NavLink>
  );
};
export default NavLinkButton;
