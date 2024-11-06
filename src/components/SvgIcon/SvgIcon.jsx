import clsx from 'clsx';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';

import { selectUserTheme } from '../../redux/auth/selectors';
import s from './SvgIcon.module.css';

// active - це простий пропс-прапорець для іконки активної дошки в списку всіх дошок
//використання: <SvgIcon url={iconUrl} active/> - для активної дошки
//              <SvgIcon url={iconUrl} /> - для неактивної дошки або створенні нової дошки

// eslint-disable-next-line react/prop-types
const SvgIcon = ({ url, active, width = 18, height = 18 }) => {
  const currentTheme = useSelector(selectUserTheme);
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
