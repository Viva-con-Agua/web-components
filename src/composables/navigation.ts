import { useSessionStore } from '@/stores/SessionStore';
import i18n from '@/i18n';
import { RouteRecordRaw } from 'vue-router';

import 'vue-router';
declare module 'vue-router' {
    interface RouteMeta {
        permissions?: string | Array<string> | undefined;
        visible?: boolean;
        session?: boolean;
    }
}

const navigationList = (currentRoutes: readonly RouteRecordRaw[]) => {
    const { t } = i18n.global;
    const store = useSessionStore();
    return currentRoutes.filter((route) => {
        // Check for correct meta
        if (route.meta == undefined) {
            route.meta = { title: t('undefined') };
            return true;
        }

        // Check visibility
        if (route.meta.visible != undefined && !route.meta.visible) {
            return false;
        }
        // Check session
        if (route.meta.session != undefined) {
            if (
                (store?.session && route.meta.session == false) ||
                (!store?.session && route.meta.session == true)
            ) {
                return false;
            }
        }
        if (route.meta.permissions != undefined) {
            if (!store.session) {
                return false;
            }
            if (!store.hasPermission(route.meta.permissions)) {
                return false;
            }
        }
        return true;
    });
};

export { navigationList };
