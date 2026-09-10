export interface Project {
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  url: string;
  github?: string;
  status?: 'active' | 'archived' | 'experimental';
  icon: string;
  featured?: boolean;
}

export interface ProjectCategory {
  id: string;
  name: string;
  nameEn?: string;
  projects: Project[];
}

// 添加分类：复制一个分类对象，填写唯一 id、分类名和 projects。
// 添加项目：在所属分类的 projects 中填写 icon、name、description 和 url。
// icon 使用 UnoCSS 图标类（如 i-lucide-terminal），url 支持站内路径和外部链接。
// 分类和项目按这里的顺序展示；空分类暂不显示。
export const projectCategories: ProjectCategory[] = [
  {
    id: 'experiments',
    name: '小实验',
    nameEn: 'Experiments',
    projects: [
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
    ],
  },
  {
    id: 'experiments',
    name: '小实验',
    nameEn: 'Experiments',
    projects: [
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
    ],
  },
];

// 供图标 safelist 等需要完整项目集合的地方使用。
export const projects = projectCategories.flatMap(
  (category) => category.projects,
);
