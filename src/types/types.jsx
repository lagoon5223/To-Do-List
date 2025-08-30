import PropTypes from "prop-types";
/**
 * Types
 */
export const CheckAddListTypes = PropTypes.shape({
    toDo: PropTypes.string,
    completeInfo: PropTypes.bool,
    detailInfo: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    nowDate: PropTypes.string
})

export const CheckDetailTextTypes = PropTypes.shape({
    detailData: PropTypes.string
})
