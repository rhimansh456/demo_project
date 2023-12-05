const isAuthenticated = () => {
    const token = sessionStorage.getItem('token') || document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    return !!token;
};

export default isAuthenticated;