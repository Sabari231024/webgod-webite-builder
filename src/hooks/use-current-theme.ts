//if specified the theme is light or dark it works fine but if we don't know what theme as in case of system theme then we need something like this
import {useTheme} from 'next-themes';

export const useCurrentTheme = () => {
    const {theme, systemTheme} = useTheme();
    if (theme === 'dark' || theme === 'light') return theme;
    return systemTheme;
}
