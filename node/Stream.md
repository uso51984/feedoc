# Stream

## 概念
`”数据流“（stream）`: 是处理系统缓存的一种方式。操作系统采用数据块（chunk）的方式读取数据，每收到一次数据，就存入缓存。Node应用程序有两种缓存的处理方式，第一种是等到所有数据接收完毕，一次性从缓存读取，这就是传统的读取文件的方式；第二种是采用“数据流”的方式，收到一块数据，就读取一块，即在数据还没有接收完成时，就开始处理它。

第一种方式先将数据全部读入内存，然后处理，优点是符合直觉，流程非常自然，缺点是如果遇到大文件，要花很长时间，才能进入数据处理的步骤。第二种方式每次只读入数据的一小块，像“流水”一样，每当系统读入了一小块数据，就会触发一个事件，发出“新数据块”的信号。应用程序只要监听这个事件，就能掌握数据读取的进展，做出相应处理，这样就提高了程序的性能。

数据流接口最大特点就是通过事件通信，具有`readable、writable、drain、data、end、close`等事件，既可以读取数据，也可以写入数据。读写数据时，每读入（或写入）一段数据，就会触发一次`data`事件，全部读取（或写入）完毕，触发end事件。如果发生错误，则触发`error`事件。

## 流的类型
Node.js 中有四种基本的流类型：

1. `Writable` - 可写入数据的流（例如 fs.createWriteStream()）。
1. `Readable` - 可读取数据的流（例如 fs.createReadStream()）。
1. `Duplex` - 可读又可写的流（例如 net.Socket）。
1. `Transform` - 在读写过程中可以修改或转换数据的 Duplex 流（例如 zlib.createDeflate()）。
此外，该模块还包括实用函数 `stream.pipeline()、stream.finished()` 和 `stream.Readable.from()`。

## pipe()
pipe方法是自动传送数据的机制，就像管道一样。它从“可读数据流”读出所有数据，将其写出指定的目的地。整个过程是自动的。

pipe方法必须在可读数据流上调用，它的参数必须是可写数据流。

```js
var fs = require('fs');
var readableStream = fs.createReadStream('file1.txt');
var writableStream = fs.createWriteStream('file2.txt');
```
readableStream.pipe(writableStream);
上面代码使用pipe方法，将file1的内容写入file2。整个过程由pipe方法管理，不用手动干预，所以可以将传送数据写得很简洁。

pipe方法返回目的地的数据流，因此可以使用链式写法，将多个数据流操作连在一起。
```js
a.pipe(b).pipe(c).pipe(d)
// 等同于
a.pipe(b);
b.pipe(c);
c.pipe(d);
```
下面是一个例子。
```js
var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('output.txt'));
```
上面代码采用链式写法，先读取文件，然后进行压缩，最后输出。

下面的写法模拟了Unix系统的cat命令，将标准输出写入标准输入。
```js
process.stdin.pipe(process.stdout);
```
当来源地的数据流读取完成，默认会调用目的地的end方法，就不再能够写入。对pipe方法传入第二个参数{ end: false }，可以让目的地的数据流保持打开。
```js
reader.pipe(writer, { end: false });
reader.on('end', function() {
  writer.end('Goodbye\n');
});
```
上面代码中，目的地数据流默认不会调用end方法，只能手动调用，因此“Goodbye”会被写入。

> https://javascript.ruanyifeng.com/nodejs/stream.html#toc10
> http://nodejs.cn/api/stream.html#stream_organization_of_this_document