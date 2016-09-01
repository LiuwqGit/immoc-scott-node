// 引入 mongoose 这个模块

var mongoose = require('mongoose');

// 连接对应的数据库：mongodb://localhost/test

mongoose.connect('mongodb://127.0.0.1:27017/cnblogs');

// 创建了一个名为 Cat 的 model，mongoose 会将名词变为复数，
// 在这里，collection 的名字会是 `cats`。

// model定义: 有一个 String 类型的 name

var Cat = mongoose.model('Cat', {name: String});

var kitty = new Cat({ name: 'zhermao'});

// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。

kitty.save(function (err) {

  if (err) {

    console.log(err);

  } else {

    console.log('mao');

  }

});