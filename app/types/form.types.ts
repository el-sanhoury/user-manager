import { PersonalInfoType } from "@/app/components/form/schemas/personal.schema";

export type PreferencesType = {
  category: string;
  interests: string[]; 
  avatar?: File | null;
};

export type FormDataType = PersonalInfoType & PreferencesType;
