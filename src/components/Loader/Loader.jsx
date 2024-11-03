import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader({ width, height }) {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        height={height ? height : 50}
        width={width ? width : 50}
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}
