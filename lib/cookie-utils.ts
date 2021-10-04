import Cookies from 'js-cookie'

export const getTargetingCookies = () =>  Object.keys(Cookies.get()).filter(cookie => cookie.startsWith('builder.userAttributes'));
