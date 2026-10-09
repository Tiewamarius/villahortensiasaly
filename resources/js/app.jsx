import '../css/app.css';
import "./i18n";
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    title: (title) => title
        ? `${title} - Résidence Hortensia saly`
        : 'Résidence Hortensia saly',

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),

    setup({ el, App, props }) {
        createRoot(el).render(
            <App {...props} />
        );
    },

    progress: {
        color: '#000000',
    },
});