const doc = document;
let cache = {};

export default {
  // 保存滚动条位置
  save(path) {
    cache[path] = doc.documentElement.scrollTop || doc.body.scrollTop;
  },
  // 重置滚动条位置
  get() {
    const path = this.$route.path;
    this.$nextTick(function() {
      doc.documentElement.scrollTop = doc.body.scrollTop = cache[path] || 0;
    });
  },
  // 设置滚动条到顶部
  goTop() {
    this.$nextTick(function() {
      doc.documentElement.scrollTop = doc.body.scrollTop = 0;
    });
  },
};
