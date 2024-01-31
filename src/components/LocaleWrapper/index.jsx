import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Russian from '../../languages/ru-RU.json';
import English from '../../languages/en-US.json';

export const LocaleContext = React.createContext(null);

// const local = navigator.language;
// const local = 'ru-RU';
const local = 'en-US';

let lang;
if (local === 'ru-RU') {
  lang = Russian;
} else {
  lang = English;
}

const LocaleWrapper = (props) => {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);

  function selectLang(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);

    switch (newLocale) {
      case 'ru-RU':
        return setMessages(Russian);
      default:
        return setMessages(English);
    }
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
