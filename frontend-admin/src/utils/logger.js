/**
 * 日志工具模块
 *
 * 提供统一的日志记录机制，支持不同级别的日志输出
 * 在生产环境可通过配置关闭调试日志
 */

// 日志级别
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
}

// 当前日志级别（可根据环境变量配置）
const currentLevel = import.meta.env.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN

// 日志颜色配置
const LOG_COLORS = {
  DEBUG: '#7f8c8d',
  INFO: '#3498db',
  WARN: '#f39c12',
  ERROR: '#e74c3c'
}

/**
 * 格式化日志输出
 * @param {string} level - 日志级别
 * @param {string} module - 模块名称
 * @param {string} message - 日志消息
 * @param {any} data - 附加数据
 */
const formatLog = (level, module, message, data) => {
  const timestamp = new Date().toLocaleTimeString()
  const prefix = `[${timestamp}] [${level}] [${module}]`
  return { prefix, message, data }
}

/**
 * 创建模块日志记录器
 * @param {string} moduleName - 模块名称
 * @returns {Object} 日志记录器对象
 */
export const createLogger = (moduleName) => {
  return {
    /**
     * 调试日志 - 用于开发调试
     */
    debug(message, data = null) {
      if (currentLevel <= LOG_LEVELS.DEBUG) {
        const { prefix } = formatLog('DEBUG', moduleName, message, data)
        if (data !== null) {
          console.log(`%c${prefix}`, `color: ${LOG_COLORS.DEBUG}`, message, data)
        } else {
          console.log(`%c${prefix}`, `color: ${LOG_COLORS.DEBUG}`, message)
        }
      }
    },

    /**
     * 信息日志 - 用于记录一般操作信息
     */
    info(message, data = null) {
      if (currentLevel <= LOG_LEVELS.INFO) {
        const { prefix } = formatLog('INFO', moduleName, message, data)
        if (data !== null) {
          console.info(`%c${prefix}`, `color: ${LOG_COLORS.INFO}`, message, data)
        } else {
          console.info(`%c${prefix}`, `color: ${LOG_COLORS.INFO}`, message)
        }
      }
    },

    /**
     * 警告日志 - 用于记录潜在问题
     */
    warn(message, data = null) {
      if (currentLevel <= LOG_LEVELS.WARN) {
        const { prefix } = formatLog('WARN', moduleName, message, data)
        if (data !== null) {
          console.warn(`%c${prefix}`, `color: ${LOG_COLORS.WARN}`, message, data)
        } else {
          console.warn(`%c${prefix}`, `color: ${LOG_COLORS.WARN}`, message)
        }
      }
    },

    /**
     * 错误日志 - 用于记录错误信息
     */
    error(message, error = null) {
      if (currentLevel <= LOG_LEVELS.ERROR) {
        const { prefix } = formatLog('ERROR', moduleName, message, error)
        if (error !== null) {
          console.error(`%c${prefix}`, `color: ${LOG_COLORS.ERROR}`, message, error)
        } else {
          console.error(`%c${prefix}`, `color: ${LOG_COLORS.ERROR}`, message)
        }
      }
    },

    /**
     * 分组日志 - 用于组织相关日志
     */
    group(label, fn) {
      if (currentLevel <= LOG_LEVELS.DEBUG) {
        console.group(`[${moduleName}] ${label}`)
        fn()
        console.groupEnd()
      }
    },

    /**
     * 计时日志 - 用于性能分析
     */
    time(label) {
      if (currentLevel <= LOG_LEVELS.DEBUG) {
        console.time(`[${moduleName}] ${label}`)
      }
    },

    timeEnd(label) {
      if (currentLevel <= LOG_LEVELS.DEBUG) {
        console.timeEnd(`[${moduleName}] ${label}`)
      }
    }
  }
}

// 导出默认日志记录器
export const logger = createLogger('App')

// 导出日志级别常量（便于外部配置）
export { LOG_LEVELS }
