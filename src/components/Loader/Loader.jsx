import { RotatingLines } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader({ width, height, color = '#9dc888' }) {
  return (
    <div className={s.loader}>
      <RotatingLines
        visible={true}
        height={height || 50}
        width={width || 50}
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}