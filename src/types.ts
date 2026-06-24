export interface ServiceInfo {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
}

export interface DemoProject {
  id: number;
  title: string;
  category: string;
  description: string;
  bannerGradient: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
  quote: string;
  description?: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}
