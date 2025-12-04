export const questions = [
  {
    question: {
      text: "该叫声可能出现的场景是？",
      video: "",
      audio: "",
    },
    options: [
      {
        label: "A",
        text: "除草检定篇教吉伊小八除草技巧时",
        image: null,
      },
      {
        label: "B",
        text: "除草检定篇展示 3 级证书调侃伙伴时",
        image: null,
      },
      {
        label: "C",
        text: "成功通过除草 5 级测试后",
        image: null,
      },
    ],
    answer: {
      correct: "B", // 正确答案
      // 以下字段为答对后需要播放/显示的内容（三选一或组合使用）
      audio: null, // 答对后播放的音频文件路径
      video: "/videos/1.mp4", // 答对后播放的视频文件路径
      image: null, // 答对后显示的图片文件路径
    },
  },
];
