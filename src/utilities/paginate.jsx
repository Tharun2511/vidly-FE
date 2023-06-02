import _ from "lodash";

export function Paginate (movies,currPage,pageSize) {
    const startIndex = (currPage - 1) * pageSize;
    return _(movies).slice(startIndex).take(pageSize).value();
    

}