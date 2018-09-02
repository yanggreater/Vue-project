const common = {
    getFilterArray(array) {//数组排重
        let res = [];
        let josn = {};
        for(let i=0;i<array.length;i++){
            const self = array[i];
            if(!josn[self]){
                res.push(self);
                josn[self] = 1;
            }
        }
        return res;
    }
}
export default common;