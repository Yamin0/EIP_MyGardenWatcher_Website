enum ESortType {
    NAME_ASC,
    NAME_DESC,
    TYPE_ASC,
    TYPE_DESC,
    MIN_TEMP_ASC,
    MIN_TEMP_DESC,
    MAX_TEMP_ASC,
    MAX_TEMP_DESC,
    HUM_ASC,
    HUM_DESC,
    SUN_ASC,
    SUN_DESC,
}

export const getSortAttrName = (sort: ESortType) => {
    switch (sort) {
        case ESortType.NAME_ASC:
        case ESortType.NAME_DESC: return "name";
        case ESortType.TYPE_ASC:
        case ESortType.TYPE_DESC: return "type";
        case ESortType.MIN_TEMP_ASC:
        case ESortType.MIN_TEMP_DESC: return "minTemp";
        case ESortType.MAX_TEMP_ASC:
        case ESortType.MAX_TEMP_DESC: return "maxTemp";
        case ESortType.HUM_ASC:
        case ESortType.HUM_DESC: return "humidity";
        case ESortType.SUN_ASC:
        case ESortType.SUN_DESC: return "light";
        default: return "";
    }
}

export default ESortType;
