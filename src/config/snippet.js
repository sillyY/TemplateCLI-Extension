const { getLanguage } = require('./language')
module.exports = {
    CSS: {
        common: {
            RESET: {
                label: 'reset',
                getDesc: () => getLanguage().RESET,
                path: './css/common/reset.css'
            }
        }
    },
    JavaScript: {
        date: {
            GET_CURRENT_MONTH_FIRST: {
                label: 'getCurrentMonth_first',
                getDesc: () => getLanguage().GET_CURRENT_MONTH_FIRST,
                path: './JavaScript/date/getCurrentMonth_first.js'
            },
            GET_CURRENT_MONTH_LAST: {
                label: 'getCurrentMonth_last',
                getDesc: () => getLanguage().GET_CURRENT_MONTH_LAST,
                path: './JavaScript/date/getCurrentMonth_last.js'
            },
            GET_CURRENT_WEEK_FIRST: {
                label: 'getCurrent_week_first',
                getDesc: () => getLanguage().GET_CURRENT_WEEK_FIRST,
                path: './JavaScript/date/getCurrentWeek_first.js'
            },
            GET_CURRENT_WEEK_LAST: {
                label: 'getCurrentWeek_last',
                getDesc: () => getLanguage().GET_CURRENT_WEEK_LAST,
                path: './JavaScript/date/getCurrentWeek_last.js'
            },
            GET_LAST_WEEK_FIRST: {
                label: 'getLastWeek_first',
                getDesc: () => getLanguage().GET_LAST_WEEK_FIRST,
                path: './JavaScript/date/getLastWeek_first.js'
            },
            GET_LAST_WEEK_LAST: {
                label: 'getLastWeek_last',
                getDesc: () => getLanguage().GET_LAST_WEEK_LAST,
                path: './JavaScript/date/getLastWeek_last.js'
            },
            GET_NEXT_MONTH_FIRST: {
                label: 'getNextMonth_first',
                getDesc: () => getLanguage().GET_NEXT_MONTH_FIRST,
                path: './JavaScript/date/getNextMonth_first.js'
            },
            GET_NEXT_MONTH_LAST: {
                label: 'getNextMonth_last',
                getDesc: () => getLanguage().GET_NEXT_MONTH_LAST,
                path: './JavaScript/date/getNextMonth_last.js'
            },
            GET_PREV_MONTH_FIRST: {
                label: 'getPrevMonth_first',
                getDesc: () => getLanguage().GET_PREV_MONTH_FIRST,
                path: './JavaScript/date/getPrevMonth_first.js'
            },
            GET_PREV_MONTH_LAST: {
                label: 'getPrevMonth_last',
                getDesc: () => getLanguage().GET_PREV_MONTH_LAST,
                path: './JavaScript/date/getPrevMonth_last.js'
            },
            TO_DATE: {
                label: 'toDate',
                getDesc: () => getLanguage().TO_DATE,
                path: './JavaScript/date/toDate.js'
            },
            TO_TIMESTAMP: {
                label: 'toTimestamp',
                getDesc: () => getLanguage().TO_TIMESTAMP,
                path: './JavaScript/date/toTimestamp.js'
            }
        },
        type: {
            EXTEND: {
                label: 'extend',
                getDesc: () => getLanguage().EXTEND,
                path: './JavaScript/type/extend.js'
            },
            HAS_OWN: {
                label: 'hasOwn',
                getDesc: () => getLanguage().HAS_OWN,
                path: './JavaScript/type/hasOwn.js'
            },
            IS_DEF: {
                label: 'isDef',
                getDesc: () => getLanguage().IS_DEF,
                path: './JavaScript/type/isDef.js'
            },
            IS_UNDEF: {
                label: 'isUndef',
                getDesc: () => getLanguage().IS_UNDEF,
                path: './JavaScript/type/isUndef.js'
            },
            IS_FALSE: {
                label: 'isFalse',
                getDesc: () => getLanguage().IS_FALSE,
                path: './JavaScript/type/isFalse.js'
            },
            IS_TRUE: {
                label: 'isTrue',
                getDesc: () => getLanguage().IS_TRUE,
                path: './JavaScript/type/isTrue.js'
            },
            IS_OBJECT: {
                label: 'isObject',
                getDesc: () => getLanguage().IS_OBJECT,
                path: './JavaScript/type/isObject.js'
            },
            IS_PLAIN_OBJECT:{
                label: 'isPlainObject',
                getDesc: () => getLanguage().IS_PLAIN_OBJECT,
                path: './JavaScript/type/isPlainObject.js'
            },
            IS_PRIMITIVE: {
                label: 'isPrimitive',
                getDesc: () => getLanguage().IS_PRIMITIVE,
                path: './JavaScript/type/isPrimitive.js'
            },
            IS_PROMISE: {
                label: 'isPromise',
                getDesc: () => getLanguage().IS_PROMISE,
                path: './JavaScript/type/isPromise.js'
            },
            IS_REGEXP: {
                label: 'isRegExp',
                getDesc: () => getLanguage().IS_REGEXP,
                path: './JavaScript/type/isRegExp.js'
            },
            TO_ARRAY: {
                label: 'toArray',
                getDesc: () => getLanguage().TO_ARRAY,
                path: './JavaScript/type/toArray.js'
            },
            TO_NUMBER: {
                label: 'toNumber',
                getDesc: () => getLanguage().TO_NUMBER,
                path: './JavaScript/type/toNumber.js'
            },
            TO_OBJECT: {
                label: 'toObject',
                getDesc: () => getLanguage().TO_OBJECT,
                path: './JavaScript/type/toObject.js'
            },
            TO_STRING: {
                label: 'toString',
                getDesc: () => getLanguage().TO_STRING,
                path: './JavaScript/type/toString.js'
            },
            TO_RAW_TYPE: {
                label: 'toRawType',
                getDesc: () => getLanguage().TO_RAW_TYPE,
                path: './JavaScript/type/toRawType.js'
            }
        },
        utils: {
            CREATE_UNIQUE_STRING: {
                label: 'createUniqueString',
                getDesc: () => getLanguage().CREATE_UNIQUE_STRING,
                path: './JavaScript/utils/createUniqueString.js'
            },
            ENCODE_PWD: {
                label: 'encodePwd',
                getDesc: () => getLanguage().ENCODE_PWD,
                path: './JavaScript/utils/encodePwd.js'
            },
            ERROR_CAPTURED: {
                label: 'errorCaptured',
                getDesc: () => getLanguage().ERROR_CAPTURED,
                path: './JavaScript/utils/errorCaptured.js'
            },
            GET_SEARCH: {
                label: 'getSearch',
                getDesc: () => getLanguage().GET_SEARCH,
                path: './JavaScript/utils/getSearch.js'
            },
            ONCE: {
                label: 'once',
                getDesc: () => getLanguage().ONCE,
                path: './JavaScript/utils/once.js'
            },
            OPTION_SORT: {
                label: 'optionSort',
                getDesc: () => getLanguage().OPTION_SORT,
                path: './JavaScript/utils/optionSort.js'
            }
        },
        validate: {
            VALI_EMAIL: {
                label: 'valiEmail',
                getDesc: () => getLanguage().VALI_EMAIL,
                path: './JavaScript/validate/email.js'
            },
            VALI_PHONE: {
                label: 'valiPhone',
                getDesc: () => getLanguage().VALI_PHONE,
                path: './JavaScript/validate/phone.js'
            }
        }
    }
}