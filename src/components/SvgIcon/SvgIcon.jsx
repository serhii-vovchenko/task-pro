import clsx from 'clsx';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';

import { selectUserTheme } from '../../redux/auth/selectors';
import s from './SvgIcon.module.css';

const SvgIcon = ({ url, active, width = 18, height = 18 }) => {
  const currentTheme = useSelector(selectUserTheme);

  // Check if url is defined before rendering ReactSVG
  if (!url) {
    return null; // Or a placeholder/fallback icon
  }

  return (
    <div
      className={clsx(
        s.icon,
        currentTheme === 'dark' && s[currentTheme],
        active && s['active']
      )}
      style={{ width, height }}
    >
      <ReactSVG
        src={url}
        beforeInjection={svg => {
          svg.setAttribute('style', 'width: 100%; height: 100%;');
          svg.setAttribute('stroke', 'currentColor');
        }}
      />
    </div>
  );
};

export default SvgIcon;
