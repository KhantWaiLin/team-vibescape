import { navItems, adminNavItems } from '../const/const';

/**
 * Simple function to choose navigation items based on admin status
 * @param isAdmin - Whether the user is an admin
 * @returns Navigation items array
 */
export const chooseNavItems = (isAdmin: boolean) => {
  return isAdmin ? adminNavItems : navItems;
};
