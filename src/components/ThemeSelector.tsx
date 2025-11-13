import { memo } from 'react';

interface ThemeSelectorProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

const themes = {
  purple: { bg: 'from-purple-600 to-blue-600', card: 'bg-purple-600', marked: 'bg-purple-500' },
  green: { bg: 'from-green-600 to-teal-600', card: 'bg-green-600', marked: 'bg-green-500' },
  red: { bg: 'from-red-600 to-pink-600', card: 'bg-red-600', marked: 'bg-red-500' },
  orange: { bg: 'from-orange-600 to-yellow-600', card: 'bg-orange-600', marked: 'bg-orange-500' },
};

function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex gap-2">
      {Object.keys(themes).map(t => (
        <button
          key={t}
          onClick={() => onThemeChange(t)}
          className={`w-8 h-8 rounded-full ${themes[t as keyof typeof themes].card} ${
            theme === t ? 'ring-4 ring-white' : 'opacity-50'
          }`}
          title={t}
        />
      ))}
    </div>
  );
}

export default memo(ThemeSelector);
export { themes };
