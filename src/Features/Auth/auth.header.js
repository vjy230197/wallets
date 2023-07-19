export default function authHeader() {
    const user = localStorage.getItem('token');
    console.log('authHeader', user);
    if (user) {
        return user
    } else {
        return {};
    }
}