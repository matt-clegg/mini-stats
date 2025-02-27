declare module "#auth-utils" {
  interface User {
    id: number;
    name: string;
    login: string;
    avatarUrl?: string;
    createdAt: Date;
  }
}

export {};
