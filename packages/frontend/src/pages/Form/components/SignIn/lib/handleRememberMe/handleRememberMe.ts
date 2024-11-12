import { RememberMeData } from '../../types/types.js';

export function handleRememberMe(data: RememberMeData): void {
    if (data.rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify({emailLogin: data.emailLogin}));
    } else {
        localStorage.removeItem('rememberMe');
    }
}
