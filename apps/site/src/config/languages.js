export const SUPPORTED_LOCALES = ['pt-BR', 'en']
export const DEFAULT_LOCALE = 'pt-BR'

export function isSupportedLocale(locale) {
    return SUPPORTED_LOCALES.includes(locale)
}
