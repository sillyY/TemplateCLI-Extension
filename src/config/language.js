const ALL_LANGUAGE = {
  CHINESE,
  ENGLISH
}
const CHINESE = {
  ADD_INPUT:
    '输入框架、文件路径和文件名. 格式: <框架> <文件路径> [文件名(不带格式)...]',
  ADD_SUCCESS: '文件创建成功',
  INSERT_INPUT: '输入指定模板',
  INSERT_SUCCESS: '插入文件成功',
  REMOVE_INPUT: '输入文件路径和文件名. 格式: <文件路径> [文件名...]',
  REMOVE_SUCCESS: '删除成功'
}

const ENGLISH = {
  ADD_INPUT:
    'Enter the frame, file path, and file name. Format: <framework> <file path> [file name (without format)...]',
  ADD_SUCCESS: 'Create file successfully',
  INSERT_INPUT: 'Enter the specified template',
  INSERT_SUCCESS: 'Insert file successfully',
  REMOVE_INPUT:
    'Enter the file path and file name. Format: <file path> [file name...]',
  REMOVE_SUCCESS: 'Deleted file successfully'
}
var LANGUAGE_CURRENT = 'CHINESE'

const setLanguage = lan => {
  if (!ALL_LANGUAGE.has(lan)) return
  LANGUAGE_CURRENT = lan
}

const getLanguageConfig = () => {
  return ALL_LANGUAGE[LANGUAGE_CURRENT]
}

module.exports = {
  ALL_LANGUAGE,
  LANGUAGE_CURRENT,
  setLanguage,
  getLanguageConfig
}
