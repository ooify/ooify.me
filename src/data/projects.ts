export interface Project {
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  url?: string;
  github?: string;
  status?: 'active' | 'archived' | 'experimental';
  icon: string;
  featured?: boolean;
}

// 在这里添加真实项目；没有链接的项目只展示信息，不生成占位链接。
export const projects: Project[] = [
  {
    name: 'Hello World',
    description: '从一句问候开始。这个个人网站的第一个小项目。',
    descriptionEn:
      'A small beginning: the first project on this personal website.',
    url: '/projects/hello-world/',
    status: 'active',
    icon: 'i-lucide-terminal',
    featured: true,
  },
];
