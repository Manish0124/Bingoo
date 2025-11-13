import { memo, useEffect, useState } from 'react';

interface NumberAnimationProps {
  number: number | null;
}

function NumberAnimation({ number }: NumberAnimationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (number) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [number]);

  if (!show || !number) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-3xl p-12 shadow-2xl animate-bounce">
        <div className="text-8xl font-bold text-purple-600">{number}</div>
      </div>
    </div>
  );
}

export default memo(NumberAnimation);
