import en from "./en";
import es from "./es";
import none from "./none";
import __ from "roddeh-i18n";
import Vue from "vue";
import global from "@/modules";

const locales = { en, es, none };

class i18n {
  static install(VueClass, locales) {
    i18n.configure(locales);
    VueClass.prototype.__ = function(message, lang = null) {
      if (!lang) {
        lang = this.$store.getters[global.types.getters.lang];
      }
      return __(`${lang}.${message}`);
    };
    VueClass.prototype.$locales = locales;
  }

  static configure(locales) {
    Object.keys(locales).forEach(localeName => {
      Object.keys(locales[localeName]).forEach(category => {
        const dictionary = { values: {}, contexts: [] };
        Object.keys(locales[localeName][category]).forEach(subcategory => {
          Object.keys(locales[localeName][category][subcategory] || {}).forEach(
            key => {
              dictionary[subcategory][`${localeName}.${category}.${key}`] =
                locales[localeName][category][subcategory][key];
            }
          );
        });
        __.translator.add(dictionary);
      });
    });
  }
}

Vue.use(i18n, locales);

export default locales;
