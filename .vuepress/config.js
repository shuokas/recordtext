const path = require('path');
module.exports = {
  title: "拾页",
  description: "青春须早为 岂能长少年",
  dest: "public",
  head: [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  theme: "reco",
  themeConfig: {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-message",
        "items": [
          // {
          //   "text": "vuepress-reco",
          //   "link": "/docs/theme-reco/"
          // },
          {
            "text": "MySQL",
            "link": "/docs/mysql/mysql_base.md"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/shuokas",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ],
      "/docs/mysql/": [
        "mysql_base",
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "shuoka",
    authorAvatar: "/avatar.png",
    record: "京ICP备2021015695号",
    startYear: "2015",
    codeTheme: "okaidia",
    huawei: true,
    subSidebar: 'auto'
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ["vuepress-plugin-code-copy", 
      {
        align: 'top',
        successText: '复制成功',
        backgroundColor: '#E0FFFF',
        color: '#FFFFFF',
      }
    ]
  ],
}