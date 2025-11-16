// ✅ Données initiales alignées avec le backend
export const initialData = {
  user_id: "",        
  template_id: "",    
  title: "",          
  personal_info: {
    first_name: "",
    last_name: "",
    birthdate: "",
    gender: "",
    email: "",
    phone: "",
    nationality: "",
    job_title: "",
    description: "",
    link: ""
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: []
};

// ✅ Templates pour ajouter des éléments aux sections
export const emptyExperience = {
  position: "",
  company: "",
  description: "",
  start_date: "",
  end_date: ""
};

export const emptyEducation = {
  degree_name: "",
  institution: "",
  start_date: "",
  end_date: ""
};

export const emptyProject = {
  name: "",
  description: "",
  start_date: "",
  end_date: ""
};

export const emptyLanguage = {
  name: "",
  level: "beginner"  
};

export const emptySkill = {
  name: ""
};

export const emptyCertification = {
  title: "",
  organization: "",
  date_obtained: "",
  url: ""
};
