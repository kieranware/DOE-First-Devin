import React, { createContext, useContext, useReducer, useEffect } from 'react';
import i18n from '../i18n/i18n';

type Language = 'en' | 'ga';

interface LanguageState {
  language: Language;
}

type LanguageAction = { type: 'SET_LANGUAGE'; payload: Language };

const initialState: LanguageState = {
  language: (localStorage.getItem('language') as Language) || 
    ((import.meta.env?.VITE_DEFAULT_LANGUAGE || 'en') as Language)
};

const languageReducer = (state: LanguageState, action: LanguageAction): LanguageState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      i18n.changeLanguage(action.payload);
      document.documentElement.lang = action.payload;
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
};

interface LanguageContextType {
  state: LanguageState;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  useEffect(() => {
    i18n.changeLanguage(state.language);
    document.documentElement.lang = state.language;
  }, []);

  const setLanguage = (lang: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  return (
    <LanguageContext.Provider value={{ state, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
