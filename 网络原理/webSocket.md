<div class="title"> WebSocket</div>

WebSocket可以实现客户端与服务器间双向、基于消息的文本或二进制数据传输。
* 连接协商和同源策略；
* 与既有HTTP基础设施的互操作；
* 基于消息的通信和高效消息分帧；
* 子协议协商及可扩展能力

## 1. WS与WSS
WebSocket资源URL采用了自定义模式：ws表示纯文本通信（如ws://example.com/socket），wss表示使用加密信道通信（TCP+TLS）。

## 2. 接收文本和二进制数据
WebSocket通信只涉及消息，应用代码无需担心缓冲、解析、重建接收到的数据。比如，服务器发来了一个1 MB的净荷，应用的onmessage回调只会在客户端接收到全部数据时才会被调用。浏览器接收到新消息后，如果是文本数据，会自动将其转换成DOMString对象，如果是二进制数据或Blob对象，会直接将其转交给应用。唯一可以（作为性能暗示和优化措施）多余设置的，就是告诉浏览器把接收到的二进制数据转换成Array-Buffer而非Blob：

## 3. 发送文本和二进制数据
建立了WebSocket连接后，客户端就可以随时发送或接收UTF-8或二进制消息。WebSocket提供的是一条双向通信的信道，也就是说，在同一个TCP连接上，可以双向传输数据：
1. 发送UTF-8编码的文本消息
2. 发送UTF-8编码的JSON净荷
3. 发送二进制ArrayBuffer
4. 发送二进制ArrayBufferView
5. 发送二进制Blob