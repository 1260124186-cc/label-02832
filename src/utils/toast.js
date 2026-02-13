import { ElMessage } from 'element-plus'

/**
 * 显示功能开发中提示
 */
export const showDevelopingToast = () => {
  ElMessage({
    message: '功能正在开发中，敬请期待！',
    type: 'warning',
    duration: 2000
  })
}

/**
 * 显示成功提示
 */
export const showSuccessToast = (message) => {
  ElMessage({
    message,
    type: 'success',
    duration: 2000
  })
}

/**
 * 显示错误提示
 */
export const showErrorToast = (message) => {
  ElMessage({
    message,
    type: 'error',
    duration: 2000
  })
}
