import React, { createContext, useContext } from 'react';

import { useRouter } from 'next/router';
import { routes } from 'constants/routes';

type RedirectContextProps = {
  redirect(): void;
};

const RedirectContext = createContext<RedirectContextProps>(
  {} as RedirectContextProps
);

export const RedirectProvider: React.FC = ({ children }) => {
  const router = useRouter();

  const randomRedirect = () => {
    const url = routes[Math.floor(Math.random() * routes.length)];

    router.replace(url);
  };

  const redirect = () => {
    setTimeout(function () {
      randomRedirect();
    }, 15000);
  };

  return (
    <RedirectContext.Provider
      value={{
        redirect
      }}
    >
      {children}
    </RedirectContext.Provider>
  );
};

export function useRedirect(): RedirectContextProps {
  const context = useContext(RedirectContext);

  return context;
}
