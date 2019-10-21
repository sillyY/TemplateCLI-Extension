const CHINESE = {
  ADD_INPUT:
    '输入框架、文件路径和文件名. 格式: <框架> <文件路径> [文件名(不带格式)...]',
  ADD_SUCCESS: '文件创建成功😘',
  INSERT_INPUT: '输入指定模板',
  INSERT_SUCCESS: '插入文件成功😘',
  REMOVE_INPUT: '输入文件路径和文件名. 格式: <文件路径> [文件名...]',
  REMOVE_SUCCESS: '删除成功😘',
  CLONE_SUCCESS: '克隆成功😘',
  SET_LANGUAGE_SUCCESS: '设置中文成功😘',

  /* snippets */
  // CSS
  RESET: '重置页面CSS',
  // JavaScript-date
  GET_CURRENT_MONTH_FIRST: '获取当月1号00:00:00时间戳',
  GET_CURRENT_MONTH_LAST: '获取此刻时间戳',
  GET_CURRENT_WEEK_FIRST: '获取本周一00:00:00时间戳',
  GET_CURRENT_WEEK_LAST: '获取今天23:59:59:999时间戳',
  GET_LAST_WEEK_FIRST: '获取上周一00:00:00时间戳',
  GET_LAST_WEEK_LAST: '获取上周日23:59:59:999时间戳',
  GET_NEXT_MONTH_FIRST: '获取下月1号00:00:00时间戳',
  GET_NEXT_MONTH_LAST: '获取下月最后一天23:59:59:999时间戳',
  GET_PREV_MONTH_FIRST: '获取上月1号00:00:00时间戳',
  GET_PREV_MONTH_LAST: '获取上月最后一天23:59:59:999时间戳',
  TO_DATE: '时间戳转日期格式',
  TO_TIMESTAMP: '日期格式转时间戳',

  // JavaScript-type
  EXTEND: '继承',
  HAS_OWN: '对象中是否存在某个值',
  IS_DEF: '检测值是否为有效值',
  IS_UNDEF: '检测值是否为无效值',
  IS_FALSE: '检测值是否为false(===)',
  IS_TRUE: '检测值是否为true(===)',
  IS_OBJECT: '检测值是否为有效对象',
  IS_PLAIN_OBJECT: '检测值是否为纯对象',
  IS_PRIMITIVE: '检测是否为基本数据类型',
  IS_PROMISE: '检测是否是Promise',
  IS_REGEXP: '检测是否是正则',
  TO_ARRAY: '转数组',
  TO_NUMBER: '转数字',
  TO_OBJECT: '转对象',
  TO_STRING: '转字符串',
  TO_RAW_TYPE: '获取值数据类型',

  // JavaScript-utils
  CREATE_UNIQUE_STRING: '创建唯一字符串',
  ENCODE_PWD: '密码加密',
  ERROR_CAPTURED: '异步错误捕捉',
  GET_SEARCH: 'URL search解析',
  ONCE: '确保一个函数只执行一次',
  OPTION_SORT: '传参空值过滤',

  // JavaScript-validate
  VALI_EMAIL: '邮箱验证',
  VALI_PHONE: '手机号验证'
}

const ENGLISH = {
  ADD_INPUT:
    'Enter the frame, file path, and file name. Format: <framework> <file path> [file name (without format)...]',
  ADD_SUCCESS: 'Create file successfully😘',
  INSERT_INPUT: 'Enter the specified template',
  INSERT_SUCCESS: 'Insert file successfully😘',
  CLONE_SUCCESS: 'Clone file successfully😘',
  REMOVE_INPUT:
    'Enter the file path and file name. Format: <file path> [file name...]',
  REMOVE_SUCCESS: 'Deleted file successfully😘',
  SET_LANGUAGE_SUCCESS: 'Set English successfully😘',


  /* snippets */
  // CSS
  RESET: 'reset page css',
  // JavaScript-date
  GET_CURRENT_MONTH_FIRST: 'Get the 00:00:00 timestamp of the 1st of the month',
  GET_CURRENT_MONTH_LAST: 'Get the timestamp at this moment',
  GET_CURRENT_WEEK_FIRST: 'Get this 00:00:00 time stamp on Monday',
  GET_CURRENT_WEEK_LAST: 'Get today 23:59:59:999 timestamp',
  GET_LAST_WEEK_FIRST: 'Get the 00:00:00 timestamp on last Monday',
  GET_LAST_WEEK_LAST: 'Get the 23:59:59:999 timestamp on Sunday',
  GET_NEXT_MONTH_FIRST: 'Get the 00:00:00 timestamp on the 1st of next month',
  GET_NEXT_MONTH_LAST: 'Get the 23:59:59:999 timestamp on the last day of the next month',
  GET_PREV_MONTH_FIRST: 'Get the 00:00:00 timestamp on the 1st of last month',
  GET_PREV_MONTH_LAST: 'Get the last day of last month at 23:59:59:999 timestamp',
  TO_DATE: 'Timestamp format to date ',
  TO_TIMESTAMP: 'Date format to timestamp',

  // JavaScript-type
  EXTEND: 'extend',
  HAS_OWN: 'Is there a value in the object?',
  IS_DEF: 'Whether the detected value is a valid value',
  IS_UNDEF: 'Whether the detected value is an invalid value',
  IS_FALSE: 'Whether the detected value is false (===)',
  IS_TRUE: 'Whether the detected value is true (===)',
  IS_OBJECT: 'Whether the detected value is a valid object',
  IS_PLAIN_OBJECT: 'Whether the detected value is a pure object',
  IS_PRIMITIVE: 'Check if it is a basic data type',
  IS_PROMISE: 'Check if it is Promise',
  IS_REGEXP: 'Check if it is regular',
  TO_ARRAY: 'To Array',
  TO_NUMBER: 'To Number',
  TO_OBJECT: 'To Object',
  TO_STRING: 'To String',
  TO_RAW_TYPE: 'Get data type',

  // JavaScript-utils
  CREATE_UNIQUE_STRING: 'Create a unique string',
  ENCODE_PWD: 'Password encryption',
  ERROR_CAPTURED: 'Asynchronous error trapping',
  GET_SEARCH: 'URL search analysis',
  ONCE: 'Make sure a function is only executed once',
  OPTION_SORT: 'Passing null filter',

  // JavaScript-validate
  VALI_EMAIL: 'E-mail verification',
  VALI_PHONE: 'Mobile number verification'
}
const ALL_LANGUAGE = {
  CHINESE: {
    label: '中文',
    value: CHINESE
  },
  ENGLISH: {
    label: 'English',
    value: ENGLISH
  }
}
var LANGUAGE_CURRENT = 'CHINESE'

const setLanguage = lan => {
  if (!Reflect.has(ALL_LANGUAGE, lan)) return
  LANGUAGE_CURRENT = lan
}

const getLanguage = () => {
  return ALL_LANGUAGE[LANGUAGE_CURRENT].value
}

module.exports = {
  ALL_LANGUAGE,
  LANGUAGE_CURRENT,
  setLanguage,
  getLanguage
}
