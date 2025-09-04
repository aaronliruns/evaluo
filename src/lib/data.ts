// In-memory data store for Vercel deployment
import { TestData } from '@/types'

export const testData: TestData = {
  id: 1,
  name: "基础 DevOps 测试",
  description: "检测简单云后台及Docker操作",
  questions: [
    {
      id: 1,
      text: "实验：请要求监考官协助你登陆到腾讯云后台。由考生基于一个已有实例创建一个自定义镜像，再基于该镜像创建一个新实例。由监考官回答以下问题：",
      type: "SINGLE_CHOICE",
      order: 1,
      score: 5,
      options: [
        { id: 1, text: "完成正确", isCorrect: true, order: 1 },
        { id: 2, text: "未完成/完成不正确", isCorrect: false, order: 2 }
      ]
    },
    {
      id: 2,
      text: "什么是Docker？",
      type: "SINGLE_CHOICE",
      order: 2,
      score: 1,
      options: [
        { id: 3, text: "一个虚拟机管理工具", isCorrect: false, order: 1 },
        { id: 4, text: "一个容器化平台", isCorrect: true, order: 2 },
        { id: 5, text: "一个代码版本控制系统", isCorrect: false, order: 3 },
        { id: 6, text: "一个数据库管理系统", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 3,
      text: "以下哪些是Docker的核心概念？（多选）",
      type: "MULTIPLE_CHOICE",
      order: 3,
      score: 1,
      options: [
        { id: 7, text: "镜像 (Image)", isCorrect: true, order: 1 },
        { id: 8, text: "容器 (Container)", isCorrect: true, order: 2 },
        { id: 9, text: "仓库 (Repository)", isCorrect: true, order: 3 },
        { id: 10, text: "虚拟机 (Virtual Machine)", isCorrect: false, order: 4 },
        { id: 11, text: "Dockerfile", isCorrect: true, order: 5 }
      ]
    },
    {
      id: 4,
      text: "运行Docker容器的基本命令是什么？",
      type: "SINGLE_CHOICE",
      order: 4,
      score: 1,
      options: [
        { id: 12, text: "docker start", isCorrect: false, order: 1 },
        { id: 13, text: "docker run", isCorrect: true, order: 2 },
        { id: 14, text: "docker create", isCorrect: false, order: 3 },
        { id: 15, text: "docker exec", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 5,
      text: "以下哪些Docker命令用于管理镜像？（多选）",
      type: "MULTIPLE_CHOICE",
      order: 5,
      score: 1,
      options: [
        { id: 16, text: "docker pull", isCorrect: true, order: 1 },
        { id: 17, text: "docker build", isCorrect: true, order: 2 },
        { id: 18, text: "docker images", isCorrect: true, order: 3 },
        { id: 19, text: "docker ps", isCorrect: false, order: 4 },
        { id: 20, text: "docker rmi", isCorrect: true, order: 5 }
      ]
    },
    {
      id: 6,
      text: "Dockerfile中的FROM指令的作用是什么？",
      type: "SINGLE_CHOICE",
      order: 6,
      score: 1,
      options: [
        { id: 21, text: "指定工作目录", isCorrect: false, order: 1 },
        { id: 22, text: "指定基础镜像", isCorrect: true, order: 2 },
        { id: 23, text: "复制文件", isCorrect: false, order: 3 },
        { id: 24, text: "设置环境变量", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 7,
      text: "以下哪些是Dockerfile中的有效指令？（多选）",
      type: "MULTIPLE_CHOICE",
      order: 7,
      score: 1,
      options: [
        { id: 25, text: "RUN", isCorrect: true, order: 1 },
        { id: 26, text: "COPY", isCorrect: true, order: 2 },
        { id: 27, text: "EXPOSE", isCorrect: true, order: 3 },
        { id: 28, text: "INSTALL", isCorrect: false, order: 4 },
        { id: 29, text: "WORKDIR", isCorrect: true, order: 5 }
      ]
    },
    {
      id: 8,
      text: "Docker容器和虚拟机的主要区别是什么？",
      type: "SINGLE_CHOICE",
      order: 8,
      score: 1,
      options: [
        { id: 30, text: "容器共享主机操作系统内核，虚拟机有独立的操作系统", isCorrect: true, order: 1 },
        { id: 31, text: "容器比虚拟机占用更多资源", isCorrect: false, order: 2 },
        { id: 32, text: "虚拟机启动更快", isCorrect: false, order: 3 },
        { id: 33, text: "容器不能运行在Linux上", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 9,
      text: "什么是Docker Compose？",
      type: "SINGLE_CHOICE",
      order: 9,
      score: 1,
      options: [
        { id: 34, text: "Docker的图形界面工具", isCorrect: false, order: 1 },
        { id: 35, text: "用于定义和运行多容器Docker应用的工具", isCorrect: true, order: 2 },
        { id: 36, text: "Docker的网络管理工具", isCorrect: false, order: 3 },
        { id: 37, text: "Docker的存储管理工具", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 10,
      text: "Docker Compose的配置文件通常使用什么格式？",
      type: "SINGLE_CHOICE",
      order: 10,
      score: 1,
      options: [
        { id: 38, text: "JSON", isCorrect: false, order: 1 },
        { id: 39, text: "XML", isCorrect: false, order: 2 },
        { id: 40, text: "YAML", isCorrect: true, order: 3 },
        { id: 41, text: "INI", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 11,
      text: "以下哪些是Docker Compose的常用命令？（多选）",
      type: "MULTIPLE_CHOICE",
      order: 11,
      score: 1,
      options: [
        { id: 42, text: "docker-compose up", isCorrect: true, order: 1 },
        { id: 43, text: "docker-compose down", isCorrect: true, order: 2 },
        { id: 44, text: "docker-compose build", isCorrect: true, order: 3 },
        { id: 45, text: "docker-compose install", isCorrect: false, order: 4 },
        { id: 46, text: "docker-compose logs", isCorrect: true, order: 5 }
      ]
    },
    {
      id: 12,
      text: "在docker-compose.yml文件中，services部分的作用是什么？",
      type: "SINGLE_CHOICE",
      order: 12,
      score: 1,
      options: [
        { id: 47, text: "定义网络配置", isCorrect: false, order: 1 },
        { id: 48, text: "定义存储卷配置", isCorrect: false, order: 2 },
        { id: 49, text: "定义各个容器服务", isCorrect: true, order: 3 },
        { id: 50, text: "定义环境变量", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 13,
      text: "Docker数据持久化可以通过以下哪些方式实现？（多选）",
      type: "MULTIPLE_CHOICE",
      order: 13,
      score: 1,
      options: [
        { id: 51, text: "数据卷 (Volumes)", isCorrect: true, order: 1 },
        { id: 52, text: "绑定挂载 (Bind Mounts)", isCorrect: true, order: 2 },
        { id: 53, text: "tmpfs挂载", isCorrect: true, order: 3 },
        { id: 54, text: "容器内存储", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 14,
      text: "以下哪个命令可以查看正在运行的Docker容器？",
      type: "SINGLE_CHOICE",
      order: 14,
      score: 1,
      options: [
        { id: 55, text: "docker images", isCorrect: false, order: 1 },
        { id: 56, text: "docker ps", isCorrect: true, order: 2 },
        { id: 57, text: "docker ls", isCorrect: false, order: 3 },
        { id: 58, text: "docker list", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 15,
      text: "Docker网络的默认类型是什么？",
      type: "SINGLE_CHOICE",
      order: 15,
      score: 1,
      options: [
        { id: 59, text: "host", isCorrect: false, order: 1 },
        { id: 60, text: "bridge", isCorrect: true, order: 2 },
        { id: 61, text: "none", isCorrect: false, order: 3 },
        { id: 62, text: "overlay", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 16,
      text: "在Docker Compose中，如何指定服务之间的依赖关系？",
      type: "SINGLE_CHOICE",
      order: 16,
      score: 1,
      options: [
        { id: 63, text: "使用links", isCorrect: false, order: 1 },
        { id: 64, text: "使用depends_on", isCorrect: true, order: 2 },
        { id: 65, text: "使用networks", isCorrect: false, order: 3 },
        { id: 66, text: "使用volumes", isCorrect: false, order: 4 }
      ]
    }
  ]
}
