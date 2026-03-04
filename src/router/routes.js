function loadPage(component) {
        // '@' is aliased to src
        return () => import( `@/pages/${component}.vue`)
}
export default [
        { path: '/', component: loadPage('Home') },
        { path: '/blog', component: loadPage('Blog') },
        { path: '/register', component: loadPage('Registration') },
        { path: '/login', component: loadPage('Login') }

]
