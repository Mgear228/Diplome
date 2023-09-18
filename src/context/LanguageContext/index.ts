import React, { useContext, useState } from "react"

type AvailableLanguages = 'en' | 'ru' | 'es';

type LanguageContextValueType = {
    language: AvailableLanguages;
    changeLanguage: (language: AvailableLanguages) => void;
};

const defaultContextTypeValue: LanguageContextValueType = {
    language: 'en',
    changeLanguage: () => {},
};

export const useInitLanguageContext = () => {
    const [language, setLanguage] = useState<AvailableLanguages>('en');
    const changeLanguage = (newLanguage: AvailableLanguages) => {
        setLanguage(() => newLanguage);
    };
    return {
        language,
        changeLanguage,
    };
};

export const LanguageContext = React.createContext<LanguageContextValueType>(
    defaultContextTypeValue
);

export const useLanguageContext = () => {
    const useLangContext = useContext(LanguageContext);
    return useLangContext;
};