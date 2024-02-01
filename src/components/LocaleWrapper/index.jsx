import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Russian from '../../languages/ru-RU.json';
import English from '../../languages/en-EN.json';
import German from '../../languages/de-DE.json';
import Italy from '../../languages/it-IT.json';
import Roman from '../../languages/ro-RO.json';

export const availableLanguages = {
  'en-US': English,
  'ru-RU': Russian,
  'de-DE': German,
  'it-IT': Italy,
  'ro-RO': Roman
};

const defaultLang = { locale: 'en-US', messages: English };

function defineLocale() {
  const locale = navigator.language;

  return Object.keys(availableLanguages).includes(locale)
    ? locale
    : defaultLang.locale;
}

function defineMessages(locale) {
  return availableLanguages[locale] || defaultLang.messages;
}

export const LocaleContext = React.createContext(null);

const presetLocale = defineLocale();
const presetMessages = defineMessages(presetLocale);

const LocaleWrapper = (props) => {
  const [locale, setLocale] = useState(presetLocale);
  const [messages, setMessages] = useState(presetMessages);

  function selectLang(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);

    const newMessages = defineMessages(newLocale);
    setMessages(newMessages);
  }

  return (
    <LocaleContext.Provider value={{ locale, selectLang }}>
      <IntlProvider locale={locale} messages={messages}>
        {props.children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocaleWrapper;
