import { Theme } from "./theme.model";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended"
}

export interface UserBase {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  status: UserStatus;
}

export interface UserSettings {
  theme: Theme;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  language: string;
  timezone: string;
}

export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export type User = UserBase & UserProfile & UserSettings;

export type UserCredentials = {
  email: string;
  password: string;
};
