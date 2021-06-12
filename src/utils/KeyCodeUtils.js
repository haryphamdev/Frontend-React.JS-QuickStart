class KeyCodeUtils {

    static UP = 38;

    static DOWN = 40;

    static TAB = 9;

    static ENTER = 13;

    static E = 69;

    static ESCAPE = 27; 

    static isNavigation(e) {
        return (e >= 33 && e <= 40) || e === 9 || e === 8 || e === 46 || e === 14 || e === 13;
    }

    static isNumeric(e) {
        return (e >= 48 && e <= 57) || (e >= 96 && e <= 105);
    }
    static isAlphabetic(e) {
        return (e >= 65 && e <= 90);
    }
    static isDecimal(e) {
        return e === 190 || e === 188 || e === 108 || e === 110;
    }

    static isDash(e) {
        return e === 109 || e === 189;
    }
}

export default KeyCodeUtils;