import type { ThemeConfig } from "./theme/types/theme-config";
import { tokenize } from "./theme/search";
import emailSVGString from "./theme/svgs/email";
import { giscus, withBaseURL } from "./config.utils";

export default {
  outline: {
    level: "deep",
    label: "目录"
  },
  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
  // editLink: {
  //   pattern: "https://github.com/weedsx/weedsx.github.io/edit/main/:path",
  // },
  footer: {
    // message: 'All original contents are licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.',
    message: '所有原创内容均在 <a href="http://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> 下获得许可',
    copyright: `© 2024-${new Date().getFullYear()} <a href="https://github.com/weedsx">Howard Liu</a>`,
  },
  // lastUpdated: {
  //   formatOptions: {
  //     dateStyle: "medium",
  //     timeStyle: "short",
  //   },
  // },
  nav: [
    {
      text: "POSTS",
      link: "/posts",
    },
    {
      text: "Github Resource",
      link: "https://github.com/weedsx/weedsx.github.io",
    },
    {
      text: "语雀",
      link: "https://www.yuque.com/weedsx",
    }
    // {
    //   text: "SORTS",
    //   link: "/sorts",
    // },
    // {
    //   text: "TAGS",
    //   link: "/tags",
    // },
    // {
    //   text: "VISIONS",
    //   link: "/pages/visions",
    // },
    // {
    //   text: "MORE",
    //   items: [
    //     {
    //       text: "Acknowledgments",
    //       link: "/acknowledgments",
    //     },
    //     {
    //       text: "Blogmarks",
    //       link: "/blogmarks",
    //     },
    //     {
    //       text: "Atom Feed",
    //       link: withBaseURL("/atom.xml"),
    //       target: "_blank",
    //     }
    //   ]
    // }
  ],
  search: {
    provider: "local",
    options: {
      detailedView: true,
      miniSearch: {
        // https://lucaong.github.io/minisearch/modules/MiniSearch.html
        options: {
          tokenize
        },
        searchOptions: {
          combineWith: "AND",
          fuzzy: 0.1,
          prefix: true,
          boost: {
            title: 4,
            text: 2,
          },
        }
      },
    },
  },
  socialLinks: [
    { icon: "github", link: "https://github.com/weedsx" },
    // { icon: "mastodon", link: "https://mastodon.online/@cyberwarmth" },
    {
      icon: {
        svg: emailSVGString,
      },
      link: "mailto:fyisgod@126.com",
    },
  ],
  // Extended configs
  avatar: withBaseURL("/avatar.png"),
  nickname: "HowardLiu",
  firstHalfBio: "长安城里的一切已经结束",
  secondHalfBio: "一切都在无可挽回地走向庸俗",
  // location: "Shenzhen, China",
  timezone: "Asia/Shanghai",
  pageSize: 10,
  mdfilePatterns: ["posts/**/*.md"],
  giscus
} satisfies ThemeConfig;
