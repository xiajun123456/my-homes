/**
 * Created by xiajun on 2018/6/25.
 */
export const dealWithDateFormat = dateData => {
  let dateFormat = new Date(dateData)
  let year = dateFormat.getFullYear()
  let month = dateFormat.getMonth() + 1
  let date = dateFormat.getDate()
  return `${year}-${month}-${date}`
}
