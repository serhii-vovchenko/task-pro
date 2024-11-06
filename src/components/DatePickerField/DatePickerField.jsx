import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FaChevronDown } from "react-icons/fa6";
import s from "./DatePickerField.module.css"
const DatePickerField = ({...props}) => {
    return (
        <DatePicker
            {...props}
            showIcon
            showPopperArrow={false}
            toggleCalendarOnIconClick
            icon={<FaChevronDown className={s.iconCalendar} />}
            popperClassName={s.popperCustom}
            calendarClassName={s.customCal}
            dayClassName={date => s.dayCalendar}
            weekDayClassName={date => s.weekCalendar}
            weekClassName={date => s.week}
        />
    );
}
 
export default DatePickerField;