/**
 * Created by xiajun on 2018/5/21.
 */
import App from '@/main'
import {promptConfig} from 'appConfig'
export const prompt = (message, type) => {
  App.$message({
    showClose: promptConfig.showClose,
    message: message,
    type: type,
    duration: promptConfig.duration,
    center: promptConfig.center,
    dangerouslyUseHTMLString: promptConfig.dangerouslyUseHTMLString
  })
}
export const success = message => {
  prompt(message, 'success')
}
export const warning = message => {
  prompt(message, 'warning')
}
export const info = message => {
  prompt(message, 'info')
}
export const error = message => {
  prompt(message, 'error')
}
/*
 * 确定框封装
 * */
export const confirm = (message, title = '提示消息', sureBtnText = '确定', cancelBtnText = '取消') => {
  return App.$confirm(message, title, {
    confirmButtonText: sureBtnText,
    cancelButtonText: cancelBtnText,
    confirmButtonClass: 'btn  btn-ok',
    cancelButtonClass: 'btn btn-cancel',
    customClass: 'confirm-config',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    dangerouslyUseHTMLString: true,
    type: 'warning'
  })
}
