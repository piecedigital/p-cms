import { getThemeContent, getAdminContent } from "./modules/helpers";

export const HandlebarsHandler = function (url: string) {
    if (url.match(/^\/pc_admin/)) {
        return getAdminContent(url);
    } else {
        return getThemeContent(url);
    }
}