// 改变姓名显示字段
const cutoutType = (data, type) => {
  let text = ''
  switch (type) {
    case '1':
      text = data.ownername
      break
    case '2':
      if (data.keytype === 0) {
        if (data.peoplestatus === 0) {
          text = data.account
        } else {
          text = data.username
        }
      } else if (data.keytype === 2) {
        text = data.userid
      }
      break
    case '3':
      text = data.account
      break
    case '4':
      text = data.peoplestatus === 0 ? data.account : data.username
      break
    case '5':
      text = data.peoplestatus === 0 ? data.account : data.username
      break
    case '6':
      text = data.peoplestatus === 0 ? data.account : data.username
      break
    case '7':
      text = data.userid
      break
    case '8':
      text = data.peoplestatus === 0 ? data.account : data.username
      break
    case '9':
      text = data.ownername
      break
    case '10':
      text = data.ownername
      break
    case '11':
      text = data.ownername
      break
    case '12':
      text = data.ownername
      break
    case '13':
      text = data.ownername
      break
    case '14':
      text = data.username
      break
    case '15':
      text = data.username
      break
    case '16':
      text = data.username
      break
    case '17':
      text = data.ownername
      break
    case '18':
      text = data.ownername
      break
    case '19':
      text = data.enterprisename
      break
  }
  return text
}

// 是否显示头像
const cutoutPhoneShow = type => {
  if (
    type === 2 ||
    type === 4 ||
    type === 5 ||
    type === 6 ||
    type === 7 ||
    type === 8 ||
    type === 14 ||
    type === 15 ||
    type === 16
  ) {
    return true
  } else {
    return false
  }
}

// 改变图片路径
const cutoutImgurl = data => {
  if (data) {
    let pic = ''
    const urlImage = data.indexOf('/alpub/') !== -1
    const url = 'http://download.uidt.net/img/alpub/'
    const url1 = 'http://download.uidt.net/img/alemp/'
    if (urlImage) {
      pic = url + data.split('=')[1]
    } else {
      pic = url1 + data.split('=')[1]
    }
    return pic
  } else {
    return '/assets/icon_portrait.png'
  }
}

// 改变地址名称
const cutoutPlace = (data, type) => {
  let text = ''
  switch (type) {
    case '9':
      text = data.houseaddr
      break
    case '14':
      text = data.latelydetailaddr.split(',')[0]
      break
    case '16':
      text = data.latelydetailaddr
      break
    case '17':
      text = data.houseaddress
      break
    default:
      text = data.detailaddr
      break
  }
  return text
}

// 详情页是否显示加载更多
const cutoutIsshow = type => {
  if (type === 4 || type === 5 || type === 6 || type === 7 || type === 14 || type === 16) {
    return true
  } else {
    return false
  }
}

// 详情页加载更多字段名称
const cutoutText = type => {
  if (type === 4 || type === 5 || type === 6 || type === 7) {
    return '更多'
  } else if (type === 14 || type === 16) {
    return '展开查看'
  }
}

// 详情页显示地址或者手机号或者姓名加手机号
const cutoutShowText = (data, type) => {
  if (type === 1 || type === 9 || type === 10 || type === 11 || type === 12 || type === 13) {
    return data.ownerphone
  } else if (type === 17 || type === 18) {
    return data.ownerphone
  } else if (type === 19) {
    return data.ownername + data.ownerphone
  } else {
    return cutoutPlace(data, type)
  }
}

// 关注人员详情页判断关注状态
const cutoutUserType = (data, type, value) => {
  let text = ''
  if (data) {
    if (value === 'latelytime') {
      text = data.indexOf('T') !== -1 ? data.split('T').join(' ') : data
      return text
    } else if (value === 'usertype') {
      switch (data) {
        case 1:
          text = '在外过年且已回人员'
          break
        case 2:
          text = '在外过年未回人员'
          break
        case 3:
          text = '在长过年人员'
          break
        case 4:
          text = '长期在外人员'
          break
        default:
          text = data
          break
      }
      return text
    } else {
      return data
    }
  } else {
    return '--'
  }
}

const isOkList = [
  { name: '反馈人', value: 'fkpolicename' },
  { name: '反馈时间', value: 'fktime' },
  { name: '反馈结果', value: 'remarks' }
]

// 锁具长期未使用详情显示项
const lockLongNotuse = [
  { name: '房屋地址', value: 'detailaddr' },
  { name: '房间号', value: 'housenumber' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '锁具安装时间', value: 'lockinstalltime' },
  { name: '未使用天数', value: 'locknouserdays' },
  { name: '最后一次房客使用时间', value: 'latelytime' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 钥匙长期未使用详情显示项
const keyLongNotuse = [
  { name: '身份证号', value: 'userid' },
  { name: '联系电话', value: 'ownerphone' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '钥匙发放时间', value: 'authtime' },
  { name: '钥匙到期时间', value: 'expireddate' },
  { name: '钥匙未使用天数', value: 'keyunusedays' },
  { name: '最后一次开门时间', value: 'latelytime' },
  { name: '钥匙类型', value: 'keytypename' },
  { name: '认证状态', value: 'authstatename' },
  { name: '房东姓名', value: 'ownername' },
  { name: '房东联系电话', value: 'ownerphone' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 未认证电子钥匙
const unknowKey = [
  { name: '分派时钥匙最近一次开门时间', value: 'latelytime' },
  { name: '钥匙发放时间', value: 'authtime' },
  { name: '钥匙到期时间', value: 'expireddate' },
  { name: '房东姓名', value: 'ownername' },
  { name: '房东联系电话', value: 'ownerphone' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 新入住人员
const newUser = [
  { name: '身份证号', value: 'userid' },
  { name: '联系电话', value: 'account' },
  { name: '钥匙发放时间', value: 'authtime' },
  { name: '最近一次开门时间', value: 'zuijinkaimen' },
  { name: '钥匙类型', value: 'keytypename' },
  { name: '认证状态', value: 'authstatename' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '房东姓名', value: 'ownername' },
  { name: '房东联系电话', value: 'ownerphone' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 疑似离开人员
const leaveUser = [
  { name: '身份证号', value: 'userid' },
  { name: '联系电话', value: 'account' },
  { name: '钥匙失效时间', value: 'stoptime' },
  { name: '最近一次开门时间', value: 'lasttime' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '房东姓名', value: 'ownername' },
  { name: '房东联系电话', value: 'ownerphone' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 一房多人居住
const houseMoreUser = [
  { name: '房屋地址', value: 'houseaddr' },
  { name: '房间号', value: 'housenumber' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '当前在住人数', value: 'peoplecount' },
  { name: '最近一次开门时间', value: 'latelyopentime' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 短期没有使用
const houseNeverUse = [
  { name: '房屋地址', value: 'houseaddr' },
  { name: '房间号', value: 'housenumber' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '在用钥匙数量', value: 'keycount' },
  { name: '最近一次开门时间', value: 'latelytime' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 夜间使用频繁
const nightMoreUse = [
  { name: '房屋地址', value: 'detailaddr' },
  { name: '房间号', value: 'housenumber' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '在用钥匙数量', value: 'keycount' },
  { name: '周期内开门总数', value: 'cycleopencount' },
  { name: '最近一次开门时间', value: 'latelytime' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 访客来访频繁
const friendMoreCome = [
  { name: '房屋地址', value: 'detailaddr' },
  { name: '房间号', value: 'housenumber' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '在用钥匙数量', value: 'keycount' },
  { name: '周期内发放访客钥匙总数', value: 'cyclegivekey' },
  { name: '最近一次开门时间', value: 'latelytime' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 更换房客频繁
const replaceMoreUser = [
  { name: '房屋地址', value: 'detailaddr' },
  { name: '房间号', value: 'housenumber' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '周期内发放钥匙总数', value: 'cyclegivekey' },
  { name: '当前在用钥匙总数', value: 'effectivekeycount' },
  { name: '最近一次开门时间', value: 'latelytime' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 一人多处住所
const userMoreHouse = [
  { name: '最近一次开门时间', value: 'latelytime' },
  { name: '身份证号', value: 'userid' },
  { name: '联系电话', value: 'account' },
  { name: '当前在住房间总数', value: 'inhousecount' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 夜间异常活动
const nightAbnormalActivity = [
  { name: '最近一次开门时间', value: 'lastopendoortime' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '身份证号', value: 'userid' },
  { name: '联系电话', value: 'account' },
  { name: '周期内开门总数', value: 'cycleopendoorcount' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 住所频繁更换
const replaceMoreHouse = [
  { name: '最近一次开门时间', value: 'latelytime' },
  { name: '身份证号', value: 'userid' },
  { name: '联系电话', value: 'account' },
  { name: '周期内更换房间总数', value: 'variablecount' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 疫情关注人员
const focusUser = [
  { name: '房屋地址', value: 'houseaddress' },
  { name: '房间号', value: 'roomnum' },
  { name: '身份证号', value: 'userid' },
  { name: '最近一次开门时间', value: 'latelytime' },
  { name: '关注状态', value: 'usertype' },
  { name: '钥匙类型', value: 'keytypename' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '钥匙发放时间', value: 'starttime' },
  { name: '钥匙到期时间', value: 'expiretime' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

// 红黄码隔离人员和开复工人员
const controlUserAndGoToWorkUser = [
  { name: '房屋地址', value: 'detailaddr' },
  { name: '社区/行政村', value: 'xzqhname' },
  { name: '街道', value: 'gldwname' },
  { name: '最近一次开门时间', value: 'latestopendoortime' },
  { name: '在住人员', value: 'personnels' },
  { name: '分派人', value: 'fppolicename' },
  { name: '分派时间', value: 'fptime' }
]

const cutoutInfoType = type => {
  let info: Recordable[] = []
  switch (type) {
    case '1':
      info = lockLongNotuse
      break
    case '2':
      info = keyLongNotuse
      break
    case '3':
      info = unknowKey
      break
    case '4':
      info = newUser
      break
    case '5':
      info = newUser
      break
    case '6':
      info = newUser
      break
    case '7':
      info = newUser
      break
    case '8':
      info = leaveUser
      break
    case '9':
      info = houseMoreUser
      break
    case '10':
      info = houseNeverUse
      break
    case '11':
      info = nightMoreUse
      break
    case '12':
      info = friendMoreCome
      break
    case '13':
      info = replaceMoreUser
      break
    case '14':
      info = userMoreHouse
      break
    case '15':
      info = nightAbnormalActivity
      break
    case '16':
      info = replaceMoreHouse
      break
    case '17':
      info = focusUser
      break
    case '18':
      info = controlUserAndGoToWorkUser
      break
    case '19':
      info = controlUserAndGoToWorkUser
      break
  }
  return info
}

export default {
  cutoutType,
  cutoutImgurl,
  cutoutPhoneShow,
  cutoutPlace,
  cutoutShowText,
  cutoutUserType,
  isOkList,
  cutoutInfoType,
  cutoutIsshow,
  cutoutText
}
