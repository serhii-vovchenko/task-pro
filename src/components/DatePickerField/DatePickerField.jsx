import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FaChevronDown } from "react-icons/fa6";
import "./DatePickerField.css"
const DatePickerField = ({field, form, ...props}) => {
    return (
        <DatePicker
            {...field}
            {...props}
            selected={field.value}
            selectedClassName={"selectedDate"}
            onChange={(val) => form.setFieldValue(field.name, val)}
            showIcon
            toggleCalendarOnIconClick
            icon={<FaChevronDown className="iconCalendar" />}
            calendarClassName={"customCal"}
            dayClassName={date => "dayCalendar"}
            weekDayClassName={date => "weekCalendar"}
            weekClassName={date => "week"}
            shouldCloseOnSelect={false}
            disabledKeyboardNavigation
            wrapperClassName={"calendarWrapper"}
            popperClassName={"popperCalendar"}
            showPopperArrow={false}
        />
    );
}
 
export default DatePickerField;