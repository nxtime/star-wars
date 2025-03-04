export interface ModalState {
  isOpen: boolean;
  modal: string | null;
}

export interface ModalConfig {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageColor?: string;
  content: Record<string, any>;
}

