import Vue from "vue"
//导入一个可以将时间对象进行格式化的库
import fecha from "fecha"

Vue.filter('dateFormat',function(value){
    value = value || "1970-01-01 00:00:00";
    return fecha.format(new Date(value), 'YYYY-MM-DD hh:mm:ss')
})