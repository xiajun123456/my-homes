/**
 * Created by xiajun on 2018/5/30.
 */
export const getAllMenuUrl = function (menu) {
  let menuUrlObj = {}
  menu.forEach((val, key) => {
    if (val.subMenu) {
      val.subMenu.forEach(subVal => {
        menuUrlObj[subVal.menuUrl] = {
          type: true,
          menuUrl: subVal.menuUrl,
          menuId: subVal.id
        }
      })
    }
    if (!val.subMenu) {
      menuUrlObj[val.menuUrl] = {
        type: true,
        menuUrl: val.menuUrl,
        menuId: val.id
      }
    }
  })
  menuUrlObj['/404'] = {
    type: true,
    menuUrl: 0,
    menuId: 0
  }
  return menuUrlObj
}
