/*
 * 换图只需要修改这里的 images 数组，或把图片文件替换成相同文件名。
 * 每个颜色放 9 张图片；不足 9 张时，页面会显示彩色占位卡片。
 */
window.COLOR_CHALLENGE_DATA = {
  pairs: [
    { id: "black-white", label: "黑 / 白", left: { id: "black", name: "黑", hex: "#171717" }, right: { id: "white", name: "白", hex: "#f7f4ed" } },
    { id: "red-green", label: "红 / 绿", left: { id: "red", name: "红", hex: "#f04e3e" }, right: { id: "green", name: "绿", hex: "#35a66f" } },
    { id: "blue-yellow", label: "蓝 / 黄", left: { id: "blue", name: "蓝", hex: "#3d73e8" }, right: { id: "yellow", name: "黄", hex: "#f7c843" } }
  ],
  photographers: {
    black: ["康祉祺（基模后训练组）", "金啸天（NLP机器人部门）"],
    white: ["张凌宇（基金产运组）", "赵春翔（客户端产品运营部）"],
    red: ["王浩杨（手机客户端开发）", "郑名杰（nlp机器人部门）"],
    green: ["闫家溯（资讯部门）", "彭奥鹏（数据抓取组）"],
    blue: ["徐威（AIGC算法部）", "李震乾（基金产运组）"],
    yellow: ["黄梓钧（语音部门）", "王卓然（B2C部门）"]
  },
  images: {
    black: [
      "data/黑/黑1.jpg", "data/黑/黑2.jpg", "data/黑/黑3.jpg", "data/黑/黑4.jpg", "data/黑/黑5.jpg", "data/黑/黑6.jpg", "data/黑/黑7.jpg", "data/黑/黑8.jpg", "data/黑/黑9.jpg"
    ],
    white: [
      "data/白/白1.jpg", "data/白/白2.jpg", "data/白/白3.jpg", "data/白/白4.jpg", "data/白/白5.jpg", "data/白/白6.jpg", "data/白/白7.jpg", "data/白/白8.jpg", "data/白/白9.jpg"
    ],
    red: [
      "data/红/红1.jpg", "data/红/红2.jpg", "data/红/红3.jpg", "data/红/红4.jpg", "data/红/红5.jpg", "data/红/红6.jpg", "data/红/红7.jpg", "data/红/红8.jpg", "data/红/红9.jpg"
    ],
    green: [
      "data/绿/绿1.jpg", "data/绿/绿2.jpg", "data/绿/绿3.jpg", "data/绿/绿4.jpg", "data/绿/绿5.jpg", "data/绿/绿6.jpg", "data/绿/绿7.jpg", "data/绿/绿8.jpg", "data/绿/绿9.jpg"
    ],
    blue: [
      "data/蓝/蓝1.jpg", "data/蓝/蓝2.jpg", "data/蓝/蓝3.jpg", "data/蓝/蓝4.jpg", "data/蓝/蓝5.jpg", "data/蓝/蓝6.jpg", "data/蓝/蓝7.jpg", "data/蓝/蓝8.jpg", "data/蓝/蓝9.jpg"
    ],
    yellow: [
      "data/黄/黄1.jpg", "data/黄/黄2.jpg", "data/黄/黄3.jpg", "data/黄/黄4.jpg", "data/黄/黄5.jpg", "data/黄/黄6.jpg", "data/黄/黄7.jpg", "data/黄/黄8.jpg", "data/黄/黄9.jpg"
    ]
  }
};
