// MenuContext.js
import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

// export const useMenuContext = () => useContext(MenuContext);

export function useMenuContext() {
    return useContext(MenuContext);
}

export function MenuProvider({ children }) {
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: 'Nasi Goreng Special',
      price: 'Rp 20.000',
      description: 'Nasi goreng dengan topping telur dadar/mata sapi',
      image: null,
      type: 'Food',
      isOutOfStock: false
    },
    {
      id: 2,
      name: 'Nasi Goreng Seafood',
      price: 'Rp 30.000',
      description: 'Nasi goreng dengan aneka seafood segar',
      image: null,
      type: 'Food',
      isOutOfStock: false
    },
    {
      id: 3,
      name: 'Nasi Goreng Komplit',
      price: 'Rp 35.000',
      description: 'Nasi goreng dengan topping seafood dan telur dadar/mata sapi',
      image: null,
      type: 'Food',
      isOutOfStock: false
    },
  ]);

  const updateMenu = (updatedMenu) => {
    // console.log('Updating menu:', updatedMenu);
    setMenus((prevMenus) =>
    //   prevMenus.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu))
      prevMenus.map((menu) => 
        menu.id === updatedMenu.id ? { ...menu, ...updatedMenu } : menu
      )
    );
  };

  return (
    <MenuContext.Provider value={{ menus, setMenus, updateMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
