import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import hu from './config/locales/hu';
import en from './config/locales/en';

i18n.fallbacks = true;
i18n.translations = { hu, en };
i18n.locale = Localization.locale;

export default i18n;