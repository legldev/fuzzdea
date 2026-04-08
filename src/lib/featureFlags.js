function parseFlag(value, fallback = false) {
  if (value === undefined) {
    return fallback
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase())
}

export const featureFlags = {
  enableLabsPlatform: parseFlag(import.meta.env.VITE_ENABLE_LABS_PLATFORM, false),
  showLabsPromoOnMainSite: parseFlag(
    import.meta.env.VITE_SHOW_LABS_PROMO_ON_MAIN_SITE,
    false,
  ),
}
