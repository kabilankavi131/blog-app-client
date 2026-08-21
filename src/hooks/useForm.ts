import { useState } from "react";
import { UserProfile } from "../interfaces/interface";

export const useForm = (initialState: UserProfile) => {
  const [formData, setFormData] = useState<UserProfile>(initialState);

  const handleInputChange =
    (field: keyof UserProfile) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  return { formData, handleInputChange };
};
