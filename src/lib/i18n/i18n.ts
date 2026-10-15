import i18next from "i18next";
import INDEX_EN from '@/src/locales/en/index.json';
import INDEX_VI from '@/src/locales/vi/index.json';

const resources = {
    en: { index: INDEX_EN },
    vi: { index: INDEX_VI }
}

i18next.init({
    resources,
    fallbackLng: 'vi',
    ns:['index'],
    defaultNS: 'index',
    interpolation:{
        escapeValue: false
    }
})