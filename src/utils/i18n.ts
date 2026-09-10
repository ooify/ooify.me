export type Locale = 'zh' | 'en';
export const messages = {
  zh: {
    home: '首页',
    nav: '主导航',
    blog: '博客',
    projects: '项目',
    skip: '跳转到正文',
    github: 'GitHub（新窗口打开）',
    githubPending: 'GitHub 链接待补充',
    rss: '订阅 RSS',
    description: 'JonSan 的个人空间，记录想法、分享文章与个人项目。',
    blogDescription: '记录想法、学习过程与开发笔记。',
    blogIntro: '一些想法，一些记录。',
    noPosts: '还没有发布的文章',
    noPostsHint: '新的想法，会慢慢写在这里。',
    projectsDescription: '个人项目与小工具。',
    projectsIntro: '把想法变成可以使用的东西。',
    noProjects: '项目还在整理中',
    noProjectsHint: '做好的东西，会陆续放到这里。',
    active: '进行中',
    archived: '已归档',
    experimental: '实验中',
    visit: '访问项目',
    toc: '目录',
    tocLabel: '文章目录',
    allPosts: '全部文章',
    updated: '更新于',
    findMe: '也可以在这里找到我',
    closing: '慢慢记录，持续探索。',
    notFound: '这个页面不存在，或已经搬走了。',
    backHome: '回到首页',
  },
  en: {
    home: 'Home',
    nav: 'Main navigation',
    blog: 'Blog',
    projects: 'Projects',
    skip: 'Skip to content',
    github: 'GitHub (opens in a new tab)',
    githubPending: 'GitHub link not configured',
    rss: 'Subscribe via RSS',
    description: 'JonSan’s personal space for thoughts, writing, and projects.',
    blogDescription: 'Thoughts, learning, and development notes.',
    blogIntro: 'Thoughts and notes along the way.',
    noPosts: 'No posts yet',
    noPostsHint: 'New ideas will find their way here.',
    projectsDescription: 'Personal projects and small tools.',
    projectsIntro: 'Turning ideas into things you can use.',
    noProjects: 'Projects are on their way',
    noProjectsHint: 'A place for the things I make, one at a time.',
    active: 'Active',
    archived: 'Archived',
    experimental: 'Experimental',
    visit: 'Visit project',
    toc: 'On this page',
    tocLabel: 'Table of contents',
    allPosts: 'All posts',
    updated: 'Updated',
    findMe: 'Find me on',
    closing: 'Keep writing. Keep exploring.',
    notFound: 'This page does not exist, or has moved.',
    backHome: 'Back to home',
  },
} as const;

export function localPath(path: string, lang: Locale) {
  return lang === 'zh' ? `/zh${path}` : path;
}

// Static pages have an exact counterpart. Articles supply their published translation explicitly.
export function switchPath(path: string, lang: Locale) {
  const base = path.replace(/^\/(?:en|zh)(?=\/)/, '');
  const target = lang === 'zh' ? 'en' : 'zh';
  return localPath(
    ['/', '/posts/', '/projects/'].includes(base) ? base : '/posts/',
    target,
  );
}
