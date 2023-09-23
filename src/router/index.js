import {createWebHistory, createRouter} from "vue-router";
import routes from './routes';
import appConfig from "../../app.config";
import store from "@/state/store";
import {defaultMiddlewares} from "@/router/middlewares";

const router = createRouter({
    history: createWebHistory(process.env.VUE_APP_BASE_ROUTE),
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'history',
    // Simulate native-like scroll behavior when navigating to a new
    // route and using back/forward buttons.
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {top: 0, left: 0};
        }
    },
});

function middlewarePipeline(context, middleware, index) {
    const nextMiddleware = middleware[index]

    if (!nextMiddleware) {
        return context.next
    }

    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )

        nextMiddleware({...context, next: nextPipeline})

    }
}

router.beforeEach((to, from, next) => {

    let middleware = to.meta.middleware;

    if (!middleware) {
        middleware = defaultMiddlewares
    }

    if (middleware.length === 0) {
        return next()
    }

    const context = {
        to,
        from,
        next,
        store,
    }

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
    // Create a `beforeResolve` hook, which fires whenever
    // `beforeRouteEnter` and `beforeRouteUpdate` would. This
    // allows us to ensure data is fetched even when params change,
    // but the resolved route does not. We put it in `meta` to
    // indicate that it's a hook we created, rather than part of
    // Vue Router (yet?).
    try {
        // For each matched route...
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        // If the user chose to redirect...
                        if (args.length) {
                            // If redirecting to the same route we're coming from...
                            // Complete the redirect.
                            next(...args);
                            reject(new Error('Redirected'));
                        } else {
                            resolve();
                        }
                    });
                } else {
                    // Otherwise, continue resolving the route.
                    resolve();
                }
            });
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return;
    }
    document.title = routeTo.meta.title + ' | ' + appConfig.title;
    // If we reach this point, continue resolving the route.
    next();
});

export default router;
