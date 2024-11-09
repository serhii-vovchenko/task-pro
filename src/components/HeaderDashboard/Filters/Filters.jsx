import { useState } from 'react';
import sprite from '../../../img/icons.svg';
import s from './Filters.module.css';
import CoreModal from '../Modal/CoreModal/CoreModal.jsx';
import FiltersModal from '../Modal/FiltersModal/FiltersModal';

const Filters = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className={s.wrapper} onClick={handleOpen}>
                <svg className={s.icon}>
                    <use xlinkHref={`${sprite}#icon-filter`} />
                </svg>
                <span className={s.text}>Filters</span>
            </div>
            {/* CoreModal & filtersModal */}
            <CoreModal
                name="Filters"
                open={open}
                closeModal={handleClose}
            >
                <FiltersModal closeModal={handleClose} />
            </CoreModal>
           
        </>
    );
};

export default Filters;
