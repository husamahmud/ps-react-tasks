import { useState } from 'react';

function useDark() {
  const [dark, setDark] = useState(false);
  const toggleDark = () => {
    setDark((dark) => !dark);
  };

  useEffect(() => {
    dark
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }, [dark]);

  return <div></div>;
}

export default useDark;

const [dark, setDark] = useState(false);
