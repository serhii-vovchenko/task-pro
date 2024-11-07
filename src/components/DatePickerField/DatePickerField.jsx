import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FaChevronDown } from "react-icons/fa6";
import s from "./DatePickerField.module.css"
const DatePickerField = ({field, form, ...props}) => {
    return (
        <DatePicker
            {...field}
            {...props}
            selected={field.value}
            selectedClassName={s.selectedDate}
            onChange={(val) => form.setFieldValue(field.name, val)}
            showIcon
            toggleCalendarOnIconClick
            icon={<FaChevronDown className={s.iconCalendar} />}
            calendarClassName={s.customCal}
            dayClassName={date => s.dayCalendar}
            weekDayClassName={date => s.weekCalendar}
            weekClassName={date => s.week}
            shouldCloseOnSelect={false}
            disabledKeyboardNavigation
            wrapperClassName={s.calendarWrapper}
            popperClassName={s.popperCalendar}
            showPopperArrow={false}
        />
    );
}
 
export default DatePickerField;