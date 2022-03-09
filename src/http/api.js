// 接口
import api from "./config";
const allApi = {
  snow:{
    /**
     * 获取邀请二维码
     */
    produceInviteCode:(params) =>{
      return api.get('wechat/miniapp/shareCode.jpg',params)
    },

    /**
     * 开通邀请
    */
    openInviteCode:() =>{
      return api.post('app/user/enableInvite')
    },
    /*
    * 查询消息列表
    */
    getMessageList:() =>{
      return api.get('app/message/list')
    },
    
    /*
    * 更新消息阅读状态
    */
    changeMessage:(id) => {
      return api.post(`app/message/hasRead/${id}`)
    },
    /*
    * 分享代金券列表
    */
    shareVoucherList:(city) => {
      return api.get(`app/column/sharevoucher/${city}`)
    },
    /*
    * 提现
    */
    withdrawal:(params) => {
      return api.post('app/user/addCashout/',params)
    },
    /*
    * 上架申请
    */
    enableShop:(id) => {
      return api.post(`app/shop/enableShop/${id}`)
    },
  },
  /**
   * 用户授权登录
   */
  getUserMsg: (params) => {
    return api.post(`wechat/miniapp/login`, params);
  },
  //用户手机号登录
  getPhoneLogin: (params) => {
    return api.post(`app/loginBySmsCode`, params);
  },
  //手机获取验证码登录
  getPhoneCode: (params) => {
    return api.post(`app/sendSmsCode`, params);
  },
  /**
   * 获取用户个人信息
   */
  getUserOrl: (params) => {
    return api.post(`wechat/miniapp/info`, params);
  },
  /**
   * 根据城市查询栏目列表
   */
  getCityOrderList: (params) => {
    return api.get(`app/column/info/${params.code}`, params);
  },
  /**
   * 根据城市获取超惠券列表
   */
  getChqList: (params) => {
    return api.get(`app/column/maxvoucher/${params.code}`, params);
  },
  /**
   * 根据城市获取刚需特惠列表
   */
  getGxthList: (params) => {
    return api.get(`app/column/needvoucher/${params.code}`, params);
  },
  /**
   * 根据城市获取最新发布的10条优惠券列表
   */
  getNewShopList: (params) => {
    return api.get(`app/column/topten/${params.code}`, params);
  },
  /**
   * 根据城市获取最新发布的10条优惠券列表
   */
  getLanmuList: (params) => {
    return api.get(`app/column/info/${params.code}`, params);
  },
  /**
   * 获取用户代金券列表
   */
  getMineOrList: (params) => {
    return api.get(`app/column/uservoucher`, params);
  },
  /**
   * 获取用户代金券列表
   */
  addShops: (params) => {
    return api.post(`app/shop/addShop`, params);
  },
  /**
   * 获取当前附近商铺
   */
  getNearList: (params) => {
    return api.post(`app/column/nearly/${params.code}`, params);
  },
  /**
   * 查询商铺详情
   */
  getShopDetail: (params) => {
    return api.get(`app/shop/${params.id}`, params);
  },
  /**
   * 查询商家信息列表
   */
  getIndexShare: (params) => {
    return api.get(`app/column/sharevoucher/${params.code}`, params);
  },
  /**
   * 查询代金券详情
   */
  getMoneyDetail: (params) => {
    return api.get(`app/shop/voucher/info?id=${params.id}`, params);
  },
  /**
   * 商铺修改代金券信息
   */
  changeDaijin: (params) => {
    return api.post(`app/shop/voucher/edit`, params);
  },
  /**
   * 商铺删除代金券信息
   */
  deleteDaijin: (params) => {
    return api.post(`app/shop/voucher/remove/${params.id}`, params);
  },
  /**
   * 新增商铺菜品
   */
  addShopCaipin: (params) => {
    return api.post(`app/shop/goods/add`, params);
  },
  /**
   * 修改商铺菜品
   */
  changeShopCai: (params) => {
    return api.post(`app/shop/goods/edit`, params);
  },
  /**
   * 删除商铺菜品
   */
  deleteShopCai: (params) => {
    return api.post(`app/shop/goods/remove/${params.id}`, params);
  },
  /**
   * 获取商家美颜服务列表
   */
  getFuList: (params) => {
    return api.get(`app/shop/service/list?categoryId=${params.type}`, params);
  },
  /**
   * 生成商家美颜服务订单
   */
  setFuList: (params) => {
    return api.post(`app/shop/serviceorder/add`, params);
  },
  /**
   * 商家服务订单微信支付  */
  payShopList: (params) => {
    return api.post(`app/shop/serviceorder/pay?id=${params.id}&payType=${params.payType}`, params);
  },
  /**
   * 完成商家服务订单  */
  successShopList: (params) => {
    return api.post(`app/shop/serviceorder/finish`, params);
  },
  /**
   * 根据核销码查询详情  */
   getQuanCodeMsg: (params) => {
    return api.get(`app/order/getByVoucherCode?voucherCode=${params.code}&shopId=${params.shopId}`, params);
  },
  /**
   * 商户核销代金券码 */
   successShopList: (params) => {
    return api.post(`app/order/order/useCoupon`, params);
  },
  
  /**
   * 生成订单
   */
  setShopList: (params) => {
    return api.post(`app/order/add`, params);
  },
  /**
   * 微信支付  */
  payOrderList: (params) => {
    return api.post(`app/order/pay`, params);
  },
  /**
   * 搜索当前可绑定的商铺  */
  postSouList: (params) => {
    return api.post(`app/shop/unBindList`, params);
  },
  /**
   * 用户绑定商铺  */
  userBangDing: (params) => {
    return api.post(`app/shop/shopApprove`, params);
  },
  /**
   * 点赞收藏商铺  */
  userLikeShop: (params) => {
    return api.put(`app/column/shop/addlike`, params);
  },
  /**
   * 评论商铺  */
  pinglunShop: (params) => {
    return api.post(`app/column/shop/addComment`, params);
  },
  /**
   * 商务合作  */
  shangwuGoutong: (params) => {
    return api.post(`app/shop/cooperate`, params);
  },
  /**
   * 城市代理  */
  cityGoutong: (params) => {
    return api.post(`app/user/cityAgent`, params);
  },
  /**
   * 获取店铺下的评论  */
  getComentList: (params) => {
    return api.get(`app/column/shop/showComment/${params.shopId}`, params);
  },

  /**
   * 修改用户个人信息
   */
  setUserMsg: (params) => {
    return api.post(`app/user/edit`, params);
  },
  /**
   * 查询服务类目列表
   */
  getServieList: (params) => {
    return api.get(`app/category/alldata`, params);
  },
  /**
   * 查询标签列表根据分类
   */
  getTagsList: (params) => {
    return api.get(`app/category/sublist/${params.id}`, params);
  },
  /**
   * 更改商铺信息
   */
  changeShopMsg: (params) => {
    return api.post(`app/shop/update`, params);
  },
  /**
   * 获取字典类型值
   */
  getZidianStatus: (params) => {
    return api.get(`app/common/getDictList?dictType=${params.ids}`, params);
  },
  /**
   * 商户新增代金券
   */
  shopAddQuan: (params) => {
    return api.post(`app/shop/voucher/add`, params);
  },

  /**
   * 查询服务报价详情
   */
  getMoneyList: (params) => {
    return api.get(`app/category/attrlist?categoryId=${params.id}`, params);
  },
  /**
   * 查询服务报价详情
   */
  getMoneyNuList: (params) => {
    return api.get(
      `app/category/mini/attrlist?categoryId=${params.id}`,
      params
    );
  },
  /**
   * 查询分类详情
   */
  getDetailList: (params) => {
    return api.get(`app/category/attr/${params.id}`, params);
  },
  getDetailNuList: (params) => {
    return api.get(`app/category/mini/attr/${params.id}`, params);
  },
  /**
   * 查询我的地址列表
   */
  getAddressList: (params) => {
    return api.get(`app/address/list`, params);
  },
  /**
   * 新增地址
   */
  setAddress: (params) => {
    return api.post(`app/address/add`, params);
  },
  /**
   * 删除地址
   */
  removeAddress: (params) => {
    return api.post(`app/address/remove/${params.ids}`, params);
  },
  /**
   * 更改地址
   */
  editAddress: (params) => {
    return api.post(`app/address/edit`, params);
  },
  /**
   * 生成订单
   */
  setShopList: (params) => {
    return api.post(`app/order/add`, params);
  },
  /**
   * 微信支付  */
  payOrderList: (params) => {
    return api.post(`app/order/pay`, params);
  },
  /**
   * 未支付订单  */
  payNullOrder: (params) => {
    return api.get(
      `app/order/paylist?status=${params.status}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   * 获取天天兼职报价列表  */
  getPartTimeList: (params) => {
    return api.get(`app/category/ttjz/list`, params);
  },
  /**
   * 提交议价单  */
  sunmitYijiaOrder: (params) => {
    return api.post(`app/order/addPay`, params);
  },
  /**
   * 增加服务次数  */
  surePayOrder: (params) => {
    return api.post(`app/order/addItem`, params);
  },

  /**
   * 获取精选作品列表  */
  getProductList: (params) => {
    return api.get(`app/userproduct/list`, params);
  },
  /**
   * 获取精选作品列表  */
  getProductNuList: (params) => {
    return api.get(`app/userproduct/mini/list`, params);
  },
  /**
   * 根据id查询作品信息  */
  getProductId: (params) => {
    return api.get(`app/userproduct/${params.id}`, params);
  },
  /**
   * 上传作品  */
  upLoadWorks: (params) => {
    return api.post(`app/userproduct/add`, params);
  },
  /**
   * 点赞喜欢文章  */
  likeWorks: (params) => {
    return api.post(
      `app/category/likeArticle/${params.id}?type=${params.type}`,
      params
    );
  },
  /**
   * 点赞喜欢作品 */
  likeWorkNum: (params) => {
    return api.post(
      `app/user/addProductVote?productId=${params.productId}&type=${params.type}`,
      params
    );
  },
  /**
   * 查看用户消息列表 */
  userMsgList: (params) => {
    return api.get(`app/message/list`, params);
  },
  /**
   * 改变消息已读 */
  messageOn: (params) => {
    return api.post(`app/message/hasRead/${params.id}`, params);
  },
  /**
   * 生活助手列表获取 */
  atticList: (params) => {
    return api.get(
      `app/category/articleList?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   * 根据Id查询文章的详情 */
  getWorkDetail: (params) => {
    return api.get(`app/category/article/${params.id}`, params);
  },
  /**
   * 获取当前用户的作品 */
  getUserWorks: (params) => {
    return api.get(
      `app/userproduct/mylist?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   * 根据当前ID查询作品详情 */
  getIdWorks: (params) => {
    return api.get(`app/userproduct/${params.id}`, params);
  },
  /**
   * 用户订单列表 */
  getOrderList: (params) => {
    return api.get(
      `app/order/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   * 用户订单列表分类 */
  getOrderLists: (params) => {
    return api.get(
      `app/order/list?status=${params.num}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   * 根据Id获取订单详情 */
  getOrderDetail: (params) => {
    return api.get(`app/order/${params.id}`, params);
  },
  /**
   * 取消订单 */
  cancelOrder: (params) => {
    return api.post(`app/order/cancel/${params.id}`, params);
  },
  /**
   * 订单评论 */
  orderComment: (params) => {
    return api.post(`app/order/comment/add`, params);
  },
  /**
   * 待抢单列表 */
  fastOrderList: (params) => {
    return api.get(
      `app/order/receive/readyForReceiveList?x=${params.x}&y=${params.y}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   * 抢单 */
  iWantFast: (params) => {
    return api.post(
      `app/order/receive/submitReceive?orderId=${params.orderId}`,
      params
    );
  },
  /**
   * 用户认证 */
  iWantAdd: (params) => {
    return api.post(`app/user/submitUser`, params);
  },
  /**
   * 企业认证 */
  iWantComyAdd: (params) => {
    return api.post(`app/user/submitCompany`, params);
  },
  /**
   * 用户资料获取 */
  userUpLoad: (params) => {
    return api.get(`app/user/certlist`, params);
  },
  /**
   * 获取用户信息 */
  userMsg: (params) => {
    return api.get(`app/user/${params.userId}`, params);
  },
  /**
   * 上传证书 */
  upLoadShu: (params) => {
    return api.post(`app/cert/add`, params);
  },
  /**
   * 修改证书 */
  editShu: (params) => {
    return api.post(`app/cert/edit`, params);
  },
  /**
   * 我的任务列表 */
  getRenwuLists: (params) => {
    return api.get(
      `app/order/receive/list?status=${params.num}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  getRenwuList: (params) => {
    return api.get(
      `app/order/receive/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   * 检查完成 */
  changeSuccess: (params) => {
    return api.post(`app/order/receive/startService`, params);
  },
  /**
   * 检查完成 */
  changeOrderTime: (params) => {
    return api.post(
      `app/order/changeOrderTime?orderId=${params.orderId}&orderTime=${params.time}`,
      params
    );
  },
  /**
   * 完成订单 */
  successOrder: (params) => {
    return api.post(`app/order/receive/finishService`, params);
  },
  /**
   *
   * 查询接单信息 */
  getOrderDetal: (params) => {
    return api.get(`app/order/receive/${params.orderId}`, params);
  },
  /**
   *
   * 查看当前订单评论列表 */
  getOrderComent: (params) => {
    return api.get(`app/order/comment/list/${params.orderId}`, params);
  },
  /**
   *
   * 收藏 */
  collentOrder: (params) => {
    return api.post(
      `app/user/addAttrFav?attrId=${params.attrId}&type=${params.type}`,
      params
    );
  },
  /**
   *
   * 获取收藏列表 */
  collentList: (params) => {
    return api.get(
      `app/user/shop/likelist?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   *
   * 获取收入支出明细 */
  getMoneyOrder: (params) => {
    return api.get(
      `app/user/feelist?sreachMonth=${params.date}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },

  /**
   *
   * 绑定银行卡 */
  addBankId: (params) => {
    return api.post(`app/bankcard/add`, params);
  },
  /**
   *
   * 获取绑定银行卡的列表 */
  getBankList: (params) => {
    return api.get(`app/bankcard/list`, params);
  },
  /**
   *
   * 提现 */
  tixianMoney: (params) => {
    return api.post(`app/user/addCashout`, params);
  },
  /**
   *
   * 更改银行卡 */
  editBankId: (params) => {
    return api.post(`app/bankcard/edit`, params);
  },
  /**
   *
   * 解绑银行卡 */
  jieBankId: (params) => {
    return api.post(`app/bankcard/delete/${params.id}`, params);
  },
  /**
   *
   * 查询可领取优惠券 */
  getCouponList: (params) => {
    return api.get(
      `app/coupon/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   *
   * 领取优惠券 */
  lingCoupon: (params) => {
    return api.post(`app/coupon/addCoupon?couponId=${params.id}`, params);
  },
  /**
   *
   * 我的优惠券 */
  myCoupon: (params) => {
    return api.get(`app/coupon/mylist?type=${params.type}`, params);
  },
  /**
   *
   * 查询当前可用优惠券 */
  keyongCoupon: (params) => {
    return api.get(
      `app/coupon/available?cateType=${params.cateType}&limitItemId=${params.limitItemId}`,
      params
    );
  },
  /**
   *
   * 精选作品搜索 */
  searchWorks: (params) => {
    return api.get(`app/userproduct/list`, params);
  },

  /**
   *
   * 首页搜索 */
  searchIndex: (params) => {
    return api.get(`app/category/attrlist?tags=${params.searchValue}`, params);
  },

  /**
   *
   * 意见反馈 */
  messageBack: (params) => {
    return api.post(`app/user/feedback`, params);
  },
  /**
   *
   * 作品搜索 */
  worksSearch: (params) => {
    return api.get(
      `app/userproduct/list?searchValue=${params.searchValue}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   *
   * 开通邀请码 */
  openShareId: (params) => {
    return api.post(`app/user/enableInvite`, params);
  },
  /**
   *
   * 热门服务 */
  hotServieList: (params) => {
    return api.get(`app/category/attr/hotlist`, params);
  },
  /**
   *
   * 热门服务 */
  shareUserCode: (params) => {
    return api.post(`app/user/addInviteCode?code=${params.code}`, params);
  },
  /**
   * 开发票订单 */
  getFapiaoList: (params) => {
    return api.get(
      `app/order/list?status=${params.status}&pageNum=${params.pageNum}&pageSize=${params.pageSize}&hasInvoice=${params.hasInvoice}`,
      params
    );
  },
  /**
   *
   * 添加发票 */
  setFapiaoList: (params) => {
    return api.post(`app/invoice/add`, params);
  },
  /**
   *
   * 查询对服务者的评价 */
  getPingList: (params) => {
    return api.get(
      `app/user/commentList?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   *
   * 查询对服务者的评价 */
  removeWorks: (params) => {
    return api.post(`app/userproduct/delete/${params.id}`, params);
  },
  /**
   *
   * 查询对服务者的评价 */
  getIndexList: (params) => {
    return api.get(`app/ad/index`, params);
  },
  /**
   *
   * 获取个人推广小程序二维码 */
  getProgramCode: (params) => {
    return api.get(`miniapp/shareCode.jpg?userId=${params.id}`, params);
  },
  /**
   *
   * 获取券包详细信息 */
  getQuanList: (params) => {
    return api.get(`app/coupon/package`, params);
  },
  /**
   *
   * 领取新人礼包 */
  getNewList: (params) => {
    return api.post(`app/coupon/package/add?id=${params.id}`, params);
  },
  /**
   *
   * 获取推广用户、订单数量 */
  getTuiguangMsg: (params) => {
    return api.get(`app/user/inviteCount`, params);
  },
  /**
   *
   * 获取推广任务状态列表 */
  getInviteTaskList: (params) => {
    return api.get(`app/user/visitCount`, params);
  },
  /**
   *
   * 获取推广任务状态列表 */
  getFee: (params) => {
    return api.post(`app/user/enableInviteFee/${params}`);
  },
  /**
   *
   * 获取该商品下可领取的优惠券 */
  getSureMouon: (params) => {
    return api.get(
      `app/coupon/readyForGetList?cateType=${params.id}&limitItemId=${params.limitId}`
    );
  },
  /**
   *
   * 根据优惠券信息查询符合条件的服务报价列表 */
  getShopMounList: (params) => {
    return api.get(
      `app/category/availableAttrList?cateType=${params.id}&limitItems=${params.limits}`
    );
  },

  /**
   *
   * 分享领取优惠券 */
  shareGetCoupon: (params) => {
    return api.post(`app/coupon/share`, params);
  },
  /**
   *
   * 签到 */
  signinUser: (params) => {
    return api.get(`app/userSignin/info`, params);
  },
  /**
   *
   * 签到 */
  signinGoUser: (params) => {
    return api.get(`app/userSignin/signin`, params);
  },
  /**
   *
   * 查询活动列表 */
  getHuodongList: (params) => {
    return api.get(`app/activity/list`, params);
  },
  /**
   *
   * 领取活动奖励 */
  getHuodongMoney: (params) => {
    return api.post(`app/activity/getActFee?id=${params.id}`, params);
  },
  /**
   *
   * 判断当前是否已经领取 */
  isGetCouPon: (params) => {
    return api.post(`app/coupon/isnull`, params);
  },
  /**
   *
   * 签到记录 */
  signinJilu: (params) => {
    return api.get(
      `app/userSignin/date?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
      params
    );
  },
  /**
   *
   * 判断当前是否可以展示 */
  isShowLog: (params) => {
    return api.get(`app/common/config/wallet.enable`, params);
  },
  /**
   *
   * 判断当前H5优惠券是否可以展示 */
  isH5Youhui: (params) => {
    return api.get(`app/coupon/checkCoupon?couponId=${params.id}`, params);
  },
  /**
   *
   * 获取签到页面活动内容 */
  getIsignList: (params) => {
    return api.get(`app/commodity/commodityList`, params);
  },
  /**
   *
   * 签到页面积分兑换现金 */
  jifenHuMoney: (params) => {
    return api.put(`app/commodity/integralToFee/${params.id}`, params);
  },
  /**
   *
   * 签到页面积分兑换商品 */
  jifenHuShop: (params) => {
    return api.put(`app/commodity/exchange`, params);
  },
};
export default allApi;
