/**
 *　　　　　　　　┏┓　　　┏┓+ +
 *　　　　　　　┏┛┻━━━┛┻┓ + +
 *　　　　　　　┃　　　　　　　┃
 *　　　　　　　┃　　　━　　　┃ ++ + + +
 *　　　　　　 ████━████ ┃+
 *　　　　　　　┃　　　　　　　┃ +
 *　　　　　　　┃　　　┻　　　┃
 *　　　　　　　┃　　　　　　　┃ + +
 *　　　　　　　┗━┓　　　┏━┛
 *　　　　　　　　　┃　　　┃
 *　　　　　　　　　┃　　　┃ + + + +
 *　　　　　　　　　┃　　　┃　　　　 
 *　　　　　　　　　┃　　　┃ + 　　　　神兽保佑,代码无bug
 *　　　　　　　　　┃　　　┃
 *　　　　　　　　　┃　　　┃　　+
 *　　　　　　　　　┃　 　　┗━━━┓ + +
 *　　　　　　　　　┃ 　　　　　　　┣┓
 *　　　　　　　　　┃ 　　　　　　　┏┛
 *　　　　　　　　　┗┓┓┏━┳┓┏┛ + + + +
 *　　　　　　　　　　┃┫┫　┃┫┫
 *　　　　　　　　　　┗┻┛　┗┻┛+ + + +
 */
var async = require('async');
var crypto = require('crypto');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
const readline = require('readline')
var print = console.log;
var alert = console.log;
var https = require("https");
const log4js = require('log4js');
var exec = require('child_process');
Date.prototype.format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.dateDiff = function (interval, objDate2) {
    var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
    i['y'] = objDate2.getFullYear() - d.getFullYear();
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
    i['ms'] = objDate2.getTime() - d.getTime();
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
    return i[interval];
}
 
//Number类型，原型增加进位函数
Number.prototype.carry = function (num) {
    var num = arguments[0] ? arguments[0] : 4;
    var number = this + "";
    return number.replace(eval('/\\d{1,' + num + '}(?=(\\d{' + num + '})+(\\.\\d*)?$)/g'), '$&,');
}
// var f = [[{
//   idx: 3,
//   log_datetime: '2018-06-07 14:03:17',
//   server_id: '3',
//   player_id: '0xDJDAKK123',
//   role_id: '0xde0b6b3a7640000',
//   shop_id: 4,
//   excel_id: 4,
//   item_type: 4,
//   num_i: 4,
//   item_id: '4',
//   money_type: 4
// }, {
//   idx: 4,
//   log_datetime: '2018-06-07 09:05:46',
//   server_id: '3',
//   player_id: '0xDJDAKK123',
//   role_id: '0xDJDAKK123',
//   shop_id: 4,
//   excel_id: 4,
//   item_type: 4,
//   num_i: 4,
//   item_id: '4',
//   money_type: 5
// }],
// [{ desc: '时间', row: 'log_datetime' },
// { desc: '商店ID', row: 'shop_id' },
// { desc: '道具excelid', row: 'excel_id' },
// { desc: '道具类型', row: 'item_type' },
// { desc: '购买数量', row: 'num_i' },
// { desc: '道具ID', row: 'item_id' },
// { desc: '货币类型', row: 'money_type' }]]

// // for (var i = 0; i < f[1].length; i++) {
// //   console.log(f[1][i].desc)
// // }
// for (var t = 0; t < f[0].length; t++) {
//   for (var i = 0; i < f[1].length; i++) {
//     console.log(f[0][t][f[1][i].row])
//   }
// }
 
// var vercode = "";
// for (var i = 0; i < 4; i++) {
//   vercode += Math.floor(Math.random() * 10); //输出1～10之间的随机整数
// }
// if (vercode < 1000) {  //解决非4位数的验证码
//   vercode = Number(vercode) + 1000;
// }
// console.log(vercode)


// //执行cmd命令
// function execute(callback) {
//     var cmd = 'node';
//     var args = ['index.js'];
//     var executeCmd = exec.spawn(cmd,args);
//     executeCmd.stdout.on('data', function (data) {
//             console.log('stdout: ' + data);
//         //    callback(null,'ok');
//       });
//       executeCmd.stderr.on('data', function (data) {
//         console.log('stdout: ' + data);
//        callback(null,'ok');
//   });
//       executeCmd.on('close', function (code) {
//         console.log('child process exited with code ' + code);
//         callback(null,'ok');
//       });
// };
// execute(function(){
//     console.log(1)
//     process.exit();
//     console.log(2)
// })
// var matrix3x3x3 = [];
//  for(var i=0;i<3;i++){
//     matrix3x3x3[i] = [];
//     for(var j=0;j<3;j++){
//         matrix3x3x3[i][j] = [];
//         for(var z=0;z<3;z++){
//             matrix3x3x3[i][j][z]= i+j+z
//         }
//     }
//  }
//  console.log(matrix3x3x3);


//  for(var i = 0;i<matrix3x3x3.length;i++){
//      for(var j=0;j<matrix3x3x3[i].length;j++){
//          for(var z=0;z<matrix3x3x3[i][j].length;z++){
//              console.log(matrix3x3x3[i][j][z])
//          }
//      }
//  }

// var bigdecimal = require("bigdecimal");
// var i = new bigdecimal.BigInteger("1234567890abcdefghijklmn", 24);
// console.log("i is " + i); 

// var g = new bigdecimal.BigInteger("100000000000000007")
// //  var resuleId = num.toString(16)
// // console.log(resuleId);
// console.log(g);

// var JSONbig = require('json-bigint');
// var f = "今天是个好日子";
// var g = f.split("");
// console.log(parseInt(Math.random()*g.length))

// console.log(f[parseInt(Math.random()*g.length)]);
// const readline = require('readline');  
// const rl = readline.createInterface({  
//     input: process.stdin,  
//     output: process.stdout  
// });  
// rl.on('line', function (input) {  
//    if(input="zhangsan"){
//        rl.question("this is your real name?",function(answer){
//            if(answer == "yes"){
               
//                execute(function(){
//                 console.log(answer)
//                })
//            }else{
//                rl.question("plz enter your real name:",function(name){
//                    console.log(name);
//                    rl.close();
//                })
//            }
//        })
//    }

// });  

// rl.on('close', function() {  
//     console.log('程序结束');  
//     process.exit(0);  
// });  

// var addsql = "insert into table (a,b,c,d) values ";
// var f = [{ a: 1, b: 2, c: 3, d: 8 }, { a: 4, b: 5, c: 6, d: 7 }];

// for (var i = 0; i < f.length; i++) {
//     addsql += '("'+f[i].a + '","'+f[i].b + '","' + f[i].c+'","'+ f[i].d + '"),'
//     // addsql += `("${f[i].a}","${f[i].b}","${f[i].c}","${f[i].d}"),`
// }
// var g = addsql.substring(addsql.length-1,0)
// console.log(g)
// console.log(Math.pow(2,4)*2500)
// console.log(Math.pow(2,5)*2500)

// function getGold(num,base){
//     return Math.pow(2,num-1)*base
// }
// console.log(getGold(30,1000));



// var f = [{a:10,b:30},{a:20,b:30},{a:30,b:30},{a:40,b:30},{a:50,b:30},{a:60,b:30},{a:70,b:30},{a:80,b:30},{a:90,b:30}]
// var h = 'insert into a(a,b) values '
// for(var i = 0;i<f.length;i +=3){
//     if (i == 0)
// 			h += `('` +f[i].a+`','`+f[i].b+ `)`;
// 		else
// 			h += `,('` +f[i].a+`','`+f[i].b+ `)`;
// }
// console.log(h)

// var nowDtae = new Date();
// var beginDate = new Date('2018-06-02');
// console.log(nowDtae)
// console.log(beginDate)
// async.whilst(function () {
//     return beginDate < nowDtae
// }, function (callback) {
//     beginDate.setDate(beginDate.getDate() + 1);
//     // console.log(nowDtae)
//     console.log(new Date(beginDate).format('yyyy-MM-dd'))
//     callback();
// }, function (err) { 
//     console.log(err);
// })

// function a(callback) {

//     callback(null, 12)
// }

// function b(param, callback) {
//     console.log('bbbbbbbb:', param);
//     callback(null, 13,14,15)

// }
// function c(param,param1,param2, callback) {
//     console.log('cccc：', param,param1,param2)
//     callback(null,456)
// }
// async.waterfall([
//     a,
//     b,
//     c
// ], function (err,result) {
//  console.log(err)
//  console.log(result)
// })


// var TYPE = ["", "金币", "礼券", "钻石","筹码"];
// console.log(TYPE[1])
// var type = {0:"",1:"金币",2:"礼券",3:"钻石",4:"筹码"}
// console.log(type[1])

// const hash = crypto.createHash('sha256');
// const hash1 = crypto.createHash('MD5');

// console.log(hash.update("132456789786465464654641").digest('hex'))
// console.log(hash1.update("1321456").digest('hex'))

// var filename = __filename
// if(filename.indexOf('redis')>0){
//     console.log(filename.indexOf('redis'))
// }else{
//     console.log(2)
// }

// var array = [132,4568456,1654,641,561,321,34,65814,321,32156,415,132,48451,516,4123,5,8,4,9,1231,32156,14351,561,78,66];
// var f = Array.from(new Set(array))
// f.sort(function(a,b){
//     return a-b
// });
// console.log(f)
// var m = new Map();
// var o = {p: "Hello World"};
// console.log(m)
// console.log(o)
// m.set(o, "content")
// console.log('------------------------')
// console.log(m)
// console.log(o)
// m.get(o) // "content"
// console.log(m.get(o))


// var f = new Map();
// var j = {a:'keyString'};
// f.set(j,'a string');
// console.log(f)
// console.log(f.get(j))

// var m = new Map();
// m.set("edition", 6)        // 键是字符串
// m.set(262, "standard")     // 键是数值
// m.set(undefined, "nah")    // 键是undefined
// console.log(m.get('edition'))


// var f =   {'edition':6,262:'standard',undefined:'nah'} 

// var h = {
//     "a":{
//         l:123
//     },
//    "b":{
// n:456
//     }
// }
// console.log(h["a"].l)

// var myMap = new Map();
// myMap.set(0, "zero");
// myMap.set(1, "one");
// console.log(myMap)
// for (var key of myMap.values()) {
//   console.log(key);
// }
// myMap.forEach(function(value,key){
//     console.log(value)
// },myMap)

// var dict = {};
// dict['a'] = {"name":"zhansagn","age":16,type:{1:"aaa",2:'333','there':"1132132",4:9999},type_number:4};
// dict['b'] = {"name":"lisi","age":18,type:{1:"aaa",2:'333','3':"1132132",4:9999},type_number:3};

// // console.log(dict["a"].type[dict.a.type_number])
// // console.log(dict["a"].type[dict['a']['type_number']])
// for(var key in dict){
//     if(key == 'a'){
//         continue;
//     }
//     console.log(key)
//     console.log(dict[key]['type'][dict[key].type_number])
//     console.log(dict[key].type[dict[key].type_number])
// }
//  var f = [['a',{"a_a1":456}],['b','456'],['c','789']];
//  var map = new Map(f);
//  console.log(map.get('a').a_a1);
// var arr=[[{a:123,b:465},{a:789,b:987}],[{a:1233,b:4655},{a:7899,b:9877}],[{a:12333,b:46555},{a:78999,b:98777}]];

// for(var i =0 ;i<arr.length;i++){
//     var f = arr[i];
//     for(var j = 0;j<f.length;j++){
//         console.log(arr[i][j].a)
//     }
// }

// var f = [132,4564,748,4531,4,84,56];
// var g = {a:132,b:456,c:789}
// for (const key in f) {
//     console.log(f[key])
// }
// for(var key1 in g){
//     console.log(key1)
// }
//  var f = '2018-07-12 00:58:00';
//  var g =f.replace(/-| |:/g,'')
//  console.log(g)

// var f = [];
// for (var i = 0; i < 10000; i++) {
//     if (i == 460 || i == 200 || i == 600) {
//         continue;
//     }
//     f.push(i)
// };
// var g = _.shuffle(f);
// //快速排序
// function quickSort(arr) {
//     console.time("用时:")
//     // 交换
//     function swap(arr, a, b) {
//         var temp = arr[a];
//         arr[a] = arr[b];
//         arr[b] = temp;
//     }

//     // 分区
//     function partition(arr, left, right) {
//         /**
//          * 开始时不知最终pivot的存放位置，可以先将pivot交换到后面去
//          * 这里直接定义最右边的元素为基准
//          */
//         var pivot = arr[right];
//         /**
//          * 存放小于pivot的元素时，是紧挨着上一元素的，否则空隙里存放的可能是大于pivot的元素，
//          * 故声明一个storeIndex变量，并初始化为left来依次紧挨着存放小于pivot的元素。
//          */
//         var storeIndex = left;
//         for (var i = left; i < right; i++) {
//             if (arr[i] < pivot) {
//                 /**
//                  * 遍历数组，找到小于的pivot的元素，（大于pivot的元素会跳过）
//                  * 将循环i次时得到的元素，通过swap交换放到storeIndex处，
//                  * 并对storeIndex递增1，表示下一个可能要交换的位置
//                  */
//                 swap(arr, storeIndex, i);
//                 storeIndex++;
//             }
//         }
//         // 最后： 将pivot交换到storeIndex处，基准元素放置到最终正确位置上
//         swap(arr, right, storeIndex);
//         return storeIndex;
//     }

//     function sort(arr, left, right) {
//         if (left > right) return;

//         var storeIndex = partition(arr, left, right);
//         sort(arr, left, storeIndex - 1);
//         sort(arr, storeIndex + 1, right);
//     }

//     sort(arr, 0, arr.length - 1);
//     console.timeEnd("用时:")
//     return arr;
// }
// quickSort(g)



// function getLostNum(array){
//     console.time('用时：')
//     array.sort(function(a,b){
//         return a-b
//     });
//     console.timeEnd('用时：')
//     var loseArray = [];
//     for(var j = 0;j<array.length;j++){
//         if(loseArray.length == 3){
//             break;
//         }
//         if((array[j+1] - array[j]) ==2){
//             loseArray.push(array[j]+1);
//         }
//     }
//     // console.timeEnd('用时：')
//     return loseArray
// }

// console.log(getLostNum(g));
// var sql = "values"
// for(var i = 0;i<5;i++){
//     if(i == 0){
//         sql += ' ()'
//     }else{
//         sql+=',()'
//     }
// }
// console.log(sql)


// fs.readFile("pet_list.txt",{encoding:"utf-8"}, function (err, fr) {
//     //readFile回调函数
//     if (err) {
//       console.log(err);
//      }else {
//         console.log(fr);


//      }
//  });


//  function getType(path){
//     const r1 = readline.createInterface({
//         input: fs.createReadStream(path)
//     });

//     var i = 1;
//     var obj = {};
//     r1.on('line', (line) => {
//         var d = line;
//         var h = d.replace(/	/g,',');
//         var k = h.split(',')
//         obj[k[0]] = k[1]
//     });
//     r1.on('close',function(dtaa){
//         console.log(obj);
//         return obj;
//     })
//  }
// console.log(getType('item_list_cmn.txt'))

// function testA(param, callback) {
//     setTimeout(function () {
//         callback(null, null)
//     }, 3000)
// }

// function testB(num, callback) {
//     if (num == 23) {
//         testA(num, function (err, data) {
//             if (err) {
//                 callback(err)
//             } else {
//                 num = 25
//                 callback(null, num)
//             }
//         })
//     } else {
//         callback(null, num)
//     }
// }
// testB(29, function (err, num) {
//     console.log(num)
// })


// async.series({
//     one: function(callback){
//         setTimeout(function(){
//             callback(null, 1);
//         },3000)

//     },
//     two: function(callback){
//         callback(null, 2);
//     }
// },function(err, results) {
//     console.log("series:",results);
// });
// var g = 1314520
// console.log(g.toString(2))

// function a(callback) {
//     var first = 0, second = 0, count = 0;
//     var f = {};
//     for (var i = 0; i < 9999; i++) {
//         first = Math.random().toString(16);
//         second = Math.random().toString(16);
//         if (first == second) {
//             count++
//             f[first] = second
//         }
//     }
//     if (count == 0) {
//         callback(null)
//     } else {
//         callback({ count: count, f: f });
//     }

// }
// var counts = 0
// async.whilst(function () {
//     return counts <= 99999;
// }, function (callback) {
//     if (counts % 500 == 0) {
//         console.log("运行累了,暂停5秒.....")
//         setTimeout(function () {
//             console.log("暂停结束,继续执行...")
//             a(function (result) {
//                 if (result) {
//                     console.log(result);
//                 }
//                 counts++;
//                 callback()
//             })
//         }, 5000)
//     } else {
//         a(function (result) {
//             if (result) {
//                 console.log(result);
//             }
//             counts++;
//             callback()
//         })
//     }
// }, function (err, result) {
//     console.log("程序执行完毕,循环执行了"+counts+"次")
//  })


// // 并发连接数的计数器
// var concurrencyCount = 0;
// var count =0;
// var fetchUrl = function (url, callback) {
//   // delay 的值在 2000 以内，是个随机的整数
//   var delay = parseInt((Math.random() * 10000000) % 2000, 10);
//   concurrencyCount++;
//   console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
//   setTimeout(function () {
//     concurrencyCount--;
//     callback(null, url + ' html content');
//   }, delay);
// };
// var urls = [];
// for(var i = 0; i < 300; i++) {
//   urls.push('http://datasource_' + i);
// }
// async.eachLimit(urls, 10, function (url, callback) {
//     count++
//     fetchUrl(url, function(err,url){
//         callback(err)
//     });

//   }, function (err, result) {
//     if(err){
//         console.log(err)
//     }
//     console.log(count);
//   });
// function isArrayLike(value) {
//     return value &&
//         typeof value.length === 'number' &&
//         value.length >= 0 &&
//         value.length % 1 === 0;
// }
// console.log(isArrayLike({a:132}))


// var obj = {
//     a:function(callback){setTimeout(function(){callback(null,12)},3000)},
//     b:function(callback){callback(null,14)},
//     c:["a",function(results,callback){console.log(results.a+results.b);callback(null,results.a+results.b)}]
// }
// async.auto(obj,function(err,result){
//     console.log(err)
//     console.log(result)
// })
//字符串格式化
// var util = require("util")
// var txt = "select * from `test` where pid = %d and create_time bettwen '%s 00:00:00' and '%s 23:59:59' and uid = %d"
// var format_txt = util.format(txt, 20, '2018-07-10', '2018-09-10', 10)
// console.log(format_txt)

// //验证在node里面，调用异步函数，返回方式会return、cb和es6的promise的不同之处
// var csvparse = require('node-csv').createParser();
// var iconv = require('iconv-lite');
// var fs = require('fs');
// //es6的promise返回
// function _parseCsv(filename) {
//     return new Promise((resolve) => {
//         var obj = {};
//         let buffer = fs.readFileSync(filename);
//         var content = iconv.decode(buffer, 'GBK');
//         csvparse.parse(content, function (err, data) {
//             if (err) {
//                 resolve("err")
//                 return
//             }
//             for (var i = 0; i < data.length; i++) {
//                 obj[data[i][0]] = data[i][1]
//             };
//             resolve(obj)
//         });
//     })
// }
// //函数有异步操作的时候，千万不能用return来返回value
// function _parseCsv_re(filename) {
//     var obj = {};
//     let buffer = fs.readFileSync(filename);
//     var content = iconv.decode(buffer, 'GBK');
//     csvparse.parse(content, function (err, data) {
//         if (err) {
//             return err
//         }
//         for (var i = 0; i < data.length; i++) {
//             obj[data[i][0]] = data[i][1]
//         };
//         return obj
//     });
// }
// //用cb的方式返回
// function _parseCsv_cb(filename, cb) {
//     var obj = {};
//     let buffer = fs.readFileSync(filename);
//     var content = iconv.decode(buffer, 'GBK');
//     csvparse.parse(content, function (err, data) {
//         if (err) {
//             cb(err)
//             return
//         }
//         for (var i = 0; i < data.length; i++) {
//             obj[data[i][0]] = data[i][1]
//         };
//         cb(null, obj)
//     });
// }

// async function a() {
//     console.log(123)
//     var g = await _parseCsv('item_list.csv');
//     console.log(g["190057"])
//     for (var i = 0; i < 10; i++) {
//         console.log(i)
//     }
// }
// a();

// function b() {
//     console.log(123)
//     _parseCsv_cb('item_list.csv', function (err, res) {
//         console.log(err)
//         console.log(res["190057"]);
//         for (var i = 0; i < 10; i++) {
//             console.log(i)
//         }
//     });
// }
// b()
// var querystring = require("querystring")
// var url = 'https://docs.qq.com/desktop/?ADUIN=646126265&ADSESSION=1536630725&ADTAG=CLIENT.QQ.5581_.0&ADPUBNO=脏死了&autoclear=1'
// //把url链接转换为json对象
// var parese_url = querystring.parse(url)
// console.log(parese_url)
// //把json对象转换为url链接
// var f = { a: 10, b: 20, count: 10 }
// var string_url = querystring.stringify(f)
// console.log(decodeURIComponent(string_url))
// const { URL } = require('url');
// const myURL =
//     new URL('https://example.org/foo');
// console.log(myURL.href)
// myURL.href = 'https://example.com:8088/bar';
// console.log(myURL.href)
// console.log(myURL.host)
// console.log(myURL.port)
// const exec = require('child_process');
// var cmd = "python";
// var args = ['D:/test_proj/py/file.py']
// const bat = exec.spawn(cmd,args,{cwd:"D:/test_proj/py/txt"});

// bat.stdout.on('data', (data) => {
//     console.log('ok:',data.toString());

//   });

//   bat.stderr.on('data', (data) => {
//     console.log('err：',data.toString());

//   });

//   bat.on('exit', (code) => {
//     console.log(`子进程退出码：${code}`);
//   });

// https.get("https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2392444121.jpg", function (res) {
//     var html ="";
//     res.setEncoding("binary")
//     res.on("data", function (d) {
//         html += d;
//     })
//     res.on("end", function () {
//         fs.writeFile(__dirname + "/page/page_1.jpg", html,"binary", function (err, data) {
//         })
//     })
// })
//只能用于服务器返回json格式的数据
// function sendHTTP(URL, count,callback) {
//     var html = "";
//     https.get(URL, function (res) {
//         console.log("url链接成功");
//         res.on("data", function (d) {
//             html += d.toString();
//         });
//         res.on("end", function () {
//             if(html.indexOf("rate") < 0){
//                 console.log(count+1,"页没有数据");
//                 process.exit();
//             }
//             fs.writeFile(__dirname + "/page/page_" + (count+1) + ".json", html, function (err, data) {
//                 console.log("获取第"+(count+1)+"页数据成功")
//                 callback("ok")
//             })
//         })
//     })
// }
// var count = 0;
// async.whilst(function () {
//     return count < 100
// }, function (callback) {
//     console.log("开始获取第"+(count+1)+"页数据")
//     var url = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E5%8F%AF%E6%92%AD%E6%94%BE&sort=recommend&page_limit=20&page_start=' + count*20
//     if (count == 0) {
//         sendHTTP(url, count,function(mess){
//             count++
//             callback()
//         })        
//     } else {
//         setTimeout(function () {
//             sendHTTP(url, count,function(mess){
//                 count++
//                 callback()
//             })
//         }, 3000)
//     }

// }, function () {
//     process.exit()
// })
// var cheerio = require("cheerio");
// var htmls = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Document</title>
// </head>
// <body>
// <ul class="u1">
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加ssss<a href="#" class="a1">li下面的超链接</a></li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
//         <li>测试文本追加</li>
// </ul>    
// <a href="#" id="a2">sdsdasss</a>
// </body>
// </html>
// `
// var $ = cheerio.load(htmls)
// $("a").each(function(){
//     console.log($(this).text())
// })
// $(".a1").addClass("gh").html()
// console.log($(".gh").text())

// $("a").each(function(){
//     $(this).addClass("test_a")
// })
// console.log($(".a1").text())
// console.log("-------")
// console.log($(".test_a").text())
// console.log("-----------")
// $(".a1").parent().attr("id","u1")
// console.log($("#u1").text())
// var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// var iseven = function (x) {
//     console.log(x)
//     return (x % 2 == 0) ? true : false
// }
// //遇到返回false就停止
// console.log(numbers.every(iseven))
// //遇到返回true就停止
// console.log(numbers.some(iseven))
// //返回新数组，元素为bool值
// var map_numbers = numbers.map(iseven)
// console.log(map_numbers)
// //对数组的每个元素进行计算
// console.log(numbers.reduce(function (previous, current, index) {
//     return previous * current
// }))
// console.log(numbers.toString())

// function stack() {
//     var items = []
//     this.push = function (elem) {
//         items.push(elem)
//     };
//     this.print = function () {
//         console.log(items.join(""))
//     };
//     this.pop = function () {
//         return items.pop();
//     }
//     this.isEmpty = function () {
//         return items.length == 0;
//     }
// };

// var remStack = new stack();

// decNumber = 6
// binaryString = ''
// while (decNumber > 0) { //{1}
//     rem = Math.floor(decNumber % 2); //{2}
//     remStack.push(rem); //{3}
//     decNumber = Math.floor(decNumber / 2); //{4}
// }
// while (!remStack.isEmpty()) { //{5}

//     binaryString += remStack.pop().toString();
// }
// console.log(binaryString)


// console.log("------------------------")
// function getlicheng(money, cb) {
//     cb(null, money / 20);
// }
// getlicheng(151, function (lichen) {
//     console.log(parseInt(lichen))
// })

// var cfg = {
//     "a": {
//         desc: 20,
//         way: {
//             "wayname": "zidingyia"
//         }
//     },
//     "b": {
//         desc: 30,
//         way: {
//             "wayname": "zidingyib"
//         }
//     },
//     "c": {
//         desc: 40,
//         way: {
//             "wayname": "zidingyic"
//         }
//     }
// }

// var json = {}
// for (var i in cfg) {
//     // json[i] = function (callback) {console.log(i); getlicheng(cfg[i].desc, callback); }
//     (function (i) {
//         json[i] = function (callback) { console.log(i); getlicheng(cfg[i].desc, callback); }
//     })(i)
// }
// async.parallel(json, function (err, result) {
//     console.log(err)
//     console.log(result)
// })
// console.log("------------------------")
// var cfg_array = [
//     {
//         name: "a",
//         desc: 20,
//         way: {
//             "wayname": "zidingyia"
//         }
//     },
//     {
//         name: "b",
//         desc: 30,
//         way: {
//             "wayname": "zidingyib"
//         }
//     },
//     {
//         name: "c",
//         desc: 40,
//         way: {
//             "wayname": "zidingyic"
//         }
//     }, {
//         name: "d",
//         desc: 50,
//         way: {
//             "wayname": "zidingyid"
//         }
//     }
// ]

// var json = {}

// for (var i = 0; i < cfg_array.length; i++) {
//     (function (i) {
//         json[cfg_array[i].name] = function (callback) { getlicheng(cfg_array[i].desc, callback); }
//     })(i)
// }
// async.eachLimit(cfg_array,3,function(item,callback){
//     json[item.name] =function(callback){getlicheng(item.desc,callback);}
//     callback(null)
// },function(err,result){
//     console.log(json)
// })
// for (var i = 0; i < cfg_array.length; i++) {
//     let j = cfg_array[i];
//     json[j.name] = function (callback) { getlicheng(j.desc, callback); }
// }
// async.parallel(json, function (err, result) {
//     console.log(err)
//     console.log(result)
// })
// console.log("--------------------------------------------")

// function Set() {
//     var items = {};
//     var size = 0;
//     this.has = function (value) {
//         return items.hasOwnProperty(value)
//     };
//     this.add = function (value) {
//         //true:表示已添加，false:表示已经存在，无需再添加
//         if (!items[value]) {
//             items[value] = value;
//             size++
//             return true;
//         }
//         return false
//     }
//     this.remove = function (value) {
//         if (this.has(value)) {
//             delete items[value]
//             return true;
//         }
//         return false
//     }
//     this.values = function () {
//         return Object.keys(items);
//     }
//     this.clear = function () {
//         items = {};
//     }
//     this.size = function () {
//         return size
//     }
//     this.union = function (otherset) {
//         var unionset = new Set();
//         var values = this.values();
//         for (var i = 0; i < values.length; i++) {
//             unionset.add(values[i])
//         };
//         values = otherset.values();
//         for (var i = 0; i < values.length; i++) {
//             unionset.add(values[i])
//         }
//         return unionset
//     }
//     this.intersection = function (otherset) {
//         var intersectionset = new Set();
//         var values = this.values();
//         for (var i = 0; i < values.length; i++) {
//             if (otherset.has(values[i])) {

//                 intersectionset.add(values[i])
//             }
//         }
//         return intersectionset;
//     }
//     this.Difference = function (otherset) {
//         var Differenceset = new Set();
//         var values = this.values();
//         for (var i = 0; i < values.length; i++) {
//             if (!otherset.has(values[i])) {

//                 Differenceset.add(values[i])
//             }
//         }
//         return Differenceset;
//     }
//     this.subset = function (otherset) {
//         console.log("this：", this)
//         if (this.size() > otherset.size()) {
//             return false
//         }
//         var values = this.values();
//         for (var i = 0; i < values.length; i++) {
//             if (!otherset.has(values[i])) {
//                 return false
//             }
//         }
//         return true;
//     }
// }

// var uniona = new Set();
// uniona.add(1)
// uniona.add(2)
// uniona.add(3)
// var unionb = new Set();
// unionb.add(3)
// unionb.add(4)
// unionb.add(5)
// var unionc = new Set();
// unionc.add(3)
// unionc.add(4)
// //并集
// var unionab = uniona.union(unionb)
// console.log(unionab.values())
// //交集
// var intersectionab = uniona.intersection(unionb)
// console.log(intersectionab.values())
// //差集
// var Differenceab = uniona.Difference(unionb)
// console.log(Differenceab.values())
// //子集
// var subsetab = unionc.subset(unionb)
// console.log(subsetab)
// console.log("---------------------------")

// function array_list() {
//     var array = [];
//     this.insert = function (item) {
//         array.push(item);
//     }
//     this.value = function () {
//         return array
//     }
// }

// var a_list = new array_list();
// a_list.insert(12);
// a_list.insert(11)
// a_list.insert(15)
// a_list.insert(19)
// a_list.insert(17)
// a_list.insert(14)
// a_list.insert(8)

// var aa_list = []
/*一万条随机数*/
// for (var n = 0; n < 100; n++) {
//     aa_list.push(Math.round(Math.random() * 10));

// }

// console.log(aa_list.sort(function(a,b){return a-b}))
// console.time("sort用时")
// aa_list.sort(function (a, b) { return a - b })
// console.timeEnd("sort用时")
// console.time("冒泡用时")
// for (var i = 0; i < aa_list.length; i++) {
//     for (var j = 0; j < aa_list.length - 1 - i; j++) {
//         //冒泡从小到大排序
//         if (aa_list[j] > aa_list[j + 1]) {
//             let temp = aa_list[j + 1];
//             aa_list[j + 1] = aa_list[j]
//             aa_list[j] = temp
//         }
//         //冒泡从大到小排序
//         // if(aa_list[j+1]>aa_list[j]){
//         //     let temp = aa_list[j]
//         //     aa_list[j] = aa_list[j+1]
//         //     aa_list[j+1] = temp
//         // }
//     }
// }
// console.timeEnd("冒泡用时")
// console.log(aa_list)
// console.time("插入用时")
// var length = aa_list.length;

// for (var i = 1; i < length; i++) {
//     j = i;
//     var temp = aa_list[i];
//     while (j > 0 && aa_list[j - 1] > temp) {
//         aa_list[j] = aa_list[j - 1];
//         j--;
//     }
//     aa_list[j] = temp;
// }
// console.timeEnd("插入用时")

// function quick_sort_array() {
//     this.qucksort = function (array) {
//         quick(array, 0, array.length - 1)
//     }
//     var quick = function (array, left, right) {
//         var index;
//         if (array.length > 1) {
//             index = partition(array, left, right);
//             if (left < index - 1) {
//                 quick(array, left, index - 1);
//             }
//             if (index < right) {
//                 quick(array, index, right);
//             }
//         }
//         return array
//     };
//     var partition = function (array, left, right) {
//         var pivot = array[Math.floor((right + left) / 2)],
//             i = left,
//             j = right;
//         while (i <= j) {
//             while (array[i] < pivot) {
//                 i++;
//             }
//             while (array[j] > pivot) {
//                 j--;
//             }
//             if (i <= j) {
//                 swapQuickStort(array, i, j);
//                 i++;
//                 j--;
//             }
//         }
//         return i;
//     }
//     var swapQuickStort = function (array, index1, index2) {
//         var aux = array[index1];
//         array[index1] = array[index2];
//         array[index2] = aux;
//     };
// }
// var q = new quick_sort_array();
// console.time("快速用时")
// q.qucksort(aa_list)
// console.timeEnd("快速用时")

// function binarysearch(array, item) {
//     var low = 0,
//         high = aa_list.length - 1,
//         mid, element;
//     while (low <= high) {
//         mid = Math.floor((low + high) / 2);
//         element = array[mid];
//         if (element < item) { low = mid + 1; }
//         else if (element > item) {
//             high = mid - 1;
//         } else {
//             return mid;
//         }
//     }
//     return -1;
// }
// console.log(binarysearch(aa_list, 50))
// //获取每个英文字母在字母表中的位置
// function alphabet_position(string, callback) {

//     var num_array = string
//         .split("")
//         .filter(f => f.toLowerCase() != f.toUpperCase())
//         .map(m => m.toLowerCase().charCodeAt(0) - 96)
//     callback(null, num_array)
// }
// var count = 0;
// var sum_num = 0
// var ji_num = 1
// var store_i=1
// var store = ['Marry','Marry jhon', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily','Marry', 'Jhon', 'Tom', 'Lily'];
// async.whilst(function () {
//     return count < store.length;
// }, function (callback) {
//     alphabet_position(store[count], function (err, zimu_addr_num) {
//         console.log(zimu_addr_num)
//         console.log(eval(zimu_addr_num.join("+")))
//         console.log(store_i)
//         console.log(store_i*eval(zimu_addr_num.join("+")))
//         ji_num =store_i*eval(zimu_addr_num.join("+"))
//         sum_num += ji_num
//         store_i++
//         count++;
//         callback(err)
//     })
// }, function (err) {

//     console.log("async:", sum_num)
// })
// var age = 10
// function getage(age) {
//     return age < 18 && age > 0 ? "未成年" : age >= 18 && age < 30 ? "青年" : age >= 30 && age < 40 ? "中年" : age >= 40 ? "老年" : "无效年龄"
// }

// console.log(getage(age))

// const dns = require("dns")
// dns.lookup("example.com", function (err, address, family) {
//     console.log(err, address, family)
// })
// dns.resolve4("example.com", function (err, address) {
//     console.log(err, address)
// })


// var data = [{
//     'province': '浙江',
//     'city': '温州',
//     'code': '10010'
// }, {
//     'province': '浙江',
//     'city': '杭州',
//     'code': '10011'
// }, {
//     'province': '安徽',
//     'city': '合肥',
//     'code': '10012'
// }, {
//     'province': '安徽',
//     'city': '马鞍山',
//     'code': '10013'
// }, {
//     'province': '浙江',
//     'city': '宁波',
//     'code': '10014'
// }];

// var province_arr = [];
// var hash = {}
//  for (var i = 0; i < data.length; i++) {
//     if (!hash[data[i].province]) {
//         hash[data[i].province] = {
//             province: data[i].province
//         }
//         hash[data[i].province]['city'] = [{
//             name: data[i].city,
//             code: data[i].code
//         }]
//         province_arr.push(hash[data[i].province])
//     } else if (hash[data[i].province].province == data[i].province) {
//         hash[data[i].province]['city'].push({
//             name: data[i].city,
//             code: data[i].code
//         })
//     }
// }


// console.log(JSON.stringify(province_arr[1]))

var nums = [3, 30, 34, 5, 9];
var nums_sort = nums.sort(function (a, b) { return a - b })
var zero_array = [];
var num_array = []
for (var i = 0; i < nums_sort.length; i++) {
    if (nums_sort[i] == 0) {
        zero_array.push(0)
    } else {
        num_array.push(nums_sort[i])
    }
}
// console.log(nums_sort)
// console.log(zero_array)
// var f = num_array.concat(zero_array)
// console.log(f)
// var new_num = [];
// for(var i=0;i<nums.length;i++){

// }
// console.log(nums)
function getMaxRightNum(src_array, cb) {
    var nums2 = src_array;
    var con = 0;
    var new_nums = [];
    while (con < nums2.length) {
        var nums_param = nums2[con]
        var num = 0;
        for (var i = con + 1; i < nums2.length; i++) {
            if (nums_param > nums2[i]) {
                num++
            }
        }
        new_nums.push(num);
        con++
    }
    cb(new_nums)
}
getMaxRightNum([5, 2, 6, 3,1], function (right_array) {
    console.log(right_array)
})



// function zuheArray(num){
//     var num = num;
//     if(num.split("")[0] <2 || num.split("")[1]<2){
//         return "数字无效"
//     }
//     var obj = [['a', 'b', 'c'], ['d', 'e', 'f'],['g','h','i'],['j','k','l'],['m','n','o'],['p','q','r','s'],['t','u','v'],['w','x','y','z']]
//     var obj1 = obj[num.split("")[0] - 2]
//     var obj2 = obj[num.split("")[1] - 2]
//     var d = [];
//     for (var i = 0; i < obj1.length; i++) {
//         for (var j = 0; j < obj2.length; j++) {
//             d.push(obj1[i] + obj2[j])
//         }
//     }
//     return d;
// }

// console.log(zuheArray("89"))
// function cach_err(err){
//     var log = new Buffer(new Date().format('yyyy-MM-dd hh:mm:ss') + ": " + err + '\r\n');
//     var date = new Date().format('yyyy-MM-dd');
//     var filename = date + '.txt';
//     fs.appendFile('D:/v3_log/cache_log/'+filename,log,function(err){
//         console.log(err)
//     })

// }
// cach_err("异常测试")