export const URL = {
  getCode: '/mj/policelogin/verifycode', // 获取验证码图片
  code500: '/mj/policelogin/error', // 500报错
  getAuthCode: '/mj/policelogin/loginByAuthCode', // 获取免登code
  login: '/mj/policelogin/login', // 登录
  loginOut: '/mj/policelogin/logout', // 退出登录
  userInfo: '/mj/policelogin/info', // 获取登录信息

  allNum: '/mj/selCount/sel', //  获取各个图标任务个数
  lockLongterUse: '/mj/locklongtermunused/selPage', // 锁具长期未使用列表
  keyLongterUse: '/mj/longtermunused/selPage', //  钥匙长期未使用列表
  unknowKey: '/mj/uncertifiedelectronickey/selPage', //  未认证电子钥匙列表
  newUser: '/mj/newUser/selPage', //  新入住人员列表
  leaveUser: '/mj/leaveUser/selPage', //  疑似离开人员列表
  houseMoreUser: '/mj/house/selPage', //  一房多人居住列表
  houseNeverUse: '/mj/houseinactive/selPage', //  短期没有使用列表
  nightMoreUse: '/mj/houseabnormal/selPage', //  夜间使用频繁列表
  friendMoreCome: '/mj/housetemporary/selPage', //  访客来访频繁列表
  replaceMoreUser: '/mj/housetemporarytenant/selPage', //  更换房客频繁列表
  userMoreHouse: '/mj/peoplemultipleroom/selPage', //  一人多处住所列表
  nightAbnormalActivity: '/mj/peoplenocturnalactivity/selPage', //  夜间异常活动列表
  replaceMoreHouse: '/mj/peopleexchangehouses/selPage', //  住所频繁更换列表
  focusUser: '/mj/peoplemanageinfo/selPage', //  关注人员列表
  controlUser: '/mj/housemanagepersonnelhealth/selPage', //  红黄码人员列表
  goToWorkUser: '/mj/housemanagepersonnelwork/selPage', //  开复工人员列表
  newUserOpentime: '/mj/newUserOpentime/sel', //  查询最近3天开门记录
  userMoreHouseList: '/mj/peoplemultipleroomnews/selectForLnid', //  一人多房房间信息
  replaceMoreHouseList: '/mj/peopleexchangehousesnews/selectForLnid', //  住所频繁更换房间信息
  getPoliceList: '/mj/zonePubInfo/selBean', //  获取区域派出所

  feedbackOrReturned1: '/mj/interfaceApp/missionLocklongtermunused', //  锁具长期未使用反馈或者退回
  feedbackOrReturned2: '/mj/interfaceApp/missionLongtermunused', //  钥匙长期未使用反馈或者退回
  feedbackOrReturned3: '/mj/interfaceApp/missionUncertifiedelectronickey', //  未认证电子钥匙反馈或者退回
  feedbackOrReturned4: '/mj/interfaceApp/missionNewUser', //  新入住人员反馈或者退回
  feedbackOrReturned5: '/mj/interfaceApp/missionLeaveUser', //  疑似离开人员反馈或者退回
  feedbackOrReturned6: '/mj/interfaceApp/missionHouse', //  一房多人居住反馈或者退回
  feedbackOrReturned7: '/mj/interfaceApp/missionHouseinactive', //  短期没有使用反馈或者退回
  feedbackOrReturned8: '/mj/interfaceApp/missionHouseabnormal', //  夜间使用频繁反馈或者退回
  feedbackOrReturned9: '/mj/interfaceApp/missionHousetemporary', //  访客来访频繁反馈或者退回
  feedbackOrReturned10: '/mj/interfaceApp/missionHousetemporarytenant', // 更换房客频繁反馈或者退回
  feedbackOrReturned11: '/mj/interfaceApp/missionPeoplemultipleroom', // 一人多处住所反馈或者退回
  feedbackOrReturned12: '/mj/interfaceApp/missionPeoplenocturnalactivity', // 夜间异常活动反馈或者退回
  feedbackOrReturned13: '/mj/interfaceApp/missionPeopleexchangehouses', // 住所频繁更换反馈或者退回
  feedbackOrReturned14: '/mj/interfaceApp/missionPeoplemanageinfo', // 关注人员反馈或者退回
  feedbackOrReturned15: '/mj/interfaceApp/missionHousemanagepersonnelhealth', // 红黄码人员反馈或者退回
  feedbackOrReturned16: '/mj/interfaceApp/missionHousemanagepersonnelwork', // 开复工人员反馈或者退回

  editPwd: '/mj/police/setpassword' // 更新密码
}

const WHITE_LIST = [URL.login]

export const isWhiteList = (path?: string) => {
  return path ? WHITE_LIST.includes(path) : true
}
