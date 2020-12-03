import defaultSetting from "@/setting";

const title = defaultSetting.title ? defaultSetting.title : "小罗快修";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-${title}`;
  }
  return title;
}
