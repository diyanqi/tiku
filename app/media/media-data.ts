export type MediaItem = {
  id: string
  title: string
  type: string
  duration: string
  description?: string
}

export const mediaItems: MediaItem[] = [
  {
    id: "audio-001",
    title: "听力对话 · 第1段",
    type: "音频",
    duration: "3分20秒",
    description: "适合课堂听力训练与同步练习。",
  },
  {
    id: "video-014",
    title: "实验演示 · 光合作用",
    type: "视频",
    duration: "5分10秒",
    description: "生物课实验演示素材，可搭配题目使用。",
  },
  {
    id: "image-008",
    title: "地理地图 · 中国地形",
    type: "图片",
    duration: "-",
    description: "用于地理识图与定位题。",
  },
]
