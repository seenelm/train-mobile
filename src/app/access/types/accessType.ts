export interface FormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword?: string;
    setConfirmPassword?: React.Dispatch<React.SetStateAction<string>>;
  }