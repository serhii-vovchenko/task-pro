import { ReactSVG } from 'react-svg';
import css from './SvgIcon.module.css';

// eslint-disable-next-line react/prop-types
const SvgIcon = ({ url, width = 18, height = 18 }) => {
  return (
    <div className={css.icon} style={{ width, height }}>
      <ReactSVG
        src={url}
        beforeInjection={svg => {
          svg.setAttribute('css', 'width: 100%; height: 100%;');
          svg.setAttribute('stroke', 'currentColor');
        }}
      />
    </div>
  );
};

export default SvgIcon;
