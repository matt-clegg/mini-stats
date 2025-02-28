declare module "#auth-utils" {
  interface User {
    id: number;
    name: string;
    login: string;
    avatarUrl: string | null;
    createdAt: Date;
  }
}

export {};
