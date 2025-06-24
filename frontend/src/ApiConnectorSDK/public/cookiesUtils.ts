export function getCookie<T>(name: string): T | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();

        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length).trim() as T;
        }
    }

    return null;
}
