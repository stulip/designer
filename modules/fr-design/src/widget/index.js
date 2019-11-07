/**
 *
 * @author tangzehua
 * @sine 2019-11-07 13:48
 */

export default {
    get App() {
        return import ('./mobile');
    },

    get Web() {
        return import ('./mobile');
    }
}
