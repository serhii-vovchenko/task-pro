import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import sprite from "../../img/icons.svg"
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
            icon={
                <svg className="iconCalendar">
                    <use href={`${sprite}#icon-chevron-down`} />
                </svg>
            }
            calendarClassName={"customCal"}
            dayClassName={date => "dayCalendar"}
            weekDayClassName={date => "weekCalendar"}
            weekClassName={date => "week"}
            disabledKeyboardNavigation
            wrapperClassName={"calendarWrapper"}
            popperClassName={"popperCalendar"}
            showPopperArrow={false}
        />
    );
}
 
export default DatePickerField;