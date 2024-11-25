import { useEffect } from 'react';

// ----------------------------------------------------------------------

type RTLProps = {
  children: React.ReactNode;
  direction: 'lrt' | 'rtl';
};

export function RTL({ children, direction }: RTLProps) {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  return <>{children}</>;
}
