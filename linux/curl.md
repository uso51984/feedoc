在Linux中curl是一个利用URL规则在命令行下工作的文件传输工具，可以说是一款很强大的http命令行工具。它支持文件的上传和下载，是综合传输工具，但按传统，习惯称url为下载工具。
```
语法 curl [option] [url]

-A/--user-agent <string>              设置用户代理发送给服务器
-b/--cookie <name=string/file>    cookie字符串或文件读取位置
-c/--cookie-jar <file>                    操作结束后把cookie写入到这个文件中
-C/--continue-at <offset>            断点续转
-D/--dump-header <file>              把header信息写入到该文件中
-e/--referer                                  来源网址
-f/--fail                                          连接失败时不显示http错误
-o/--output                                  把输出写到该文件中
-O/--remote-name                      把输出写到该文件中，保留远程文件的文件名
-r/--range <range>                      检索来自HTTP/1.1或FTP服务器字节范围
-s/--silent                                    静音模式。不输出任何东西
-T/--upload-file <file>                  上传文件
-u/--user <user[:password]>      设置服务器的用户和密码
-w/--write-out [format]                什么输出完成后
-x/--proxy <host[:port]>              在给定的端口上使用HTTP代理
-#/--progress-bar                        进度条显示当前的传送状态
-i/--include                  输出时包括protocol头信息
-I/--head                     只显示文档信息
-X/--request <command> 指定什么命令
-G/--get 以get的方式来发送数据
-H/--header <line> 自定义头信息传递给服务器
-L 重定向连接

```
1.基本用法
```
curl https://www.baidu.com
```
2.curl -I选项，只显示http头，而不显示文件内容
```
curl -I https://www.baidu.com
```
```
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: Keep-Alive
Content-Length: 277
Content-Type: text/html
Date: Mon, 24 Dec 2018 06:52:08 GMT
Etag: "575e1f8a-115"
Last-Modified: Mon, 13 Jun 2016 02:50:50 GMT
Pragma: no-cache
Server: bfe/1.0.8.18
如果想同时显示HTTP头和文件内容，使用-i选项

curl -i https://www.baidu.com
```
 3.curl -o将结果保存到文件，也可使用重定向

-o（小写的 o）：结果会被保存到命令行中提供的文件名
-O（大写的 O）：URL 中的文件名会被用作保存输出的文件名
curl -o baidu.html https://www.baidu.com
curl -O http://www.gnu.org/software/gettext/manual/gettext.html
注意：使用 -O 选项时，必须确保链接末尾包含文件名，否则 curl 无法正确保存文件。如果遇到链接中无文件名的情况，应该使用 -o 选项手动指定文件名，或使用重定向符号，例如上述文件的gettext.html

如 curl -O https://www.baidu.com 会报错
curl: Remote file name has no length!
curl: try 'curl --help' or 'curl --manual' for more information
换成 curl -O https://www.baidu.com/index.html 就能正常的获取到内容

如同时下载多个文件
curl -O https://www.baidu.com/index.html -O https://news.qq.com/a/20181224/008767.htm
或者 curl -o baidu.html https://www.baidu.com/index.html -o tengxun.html https://news.qq.com/a/20181224/008767.htm
4.使用-L跟随链接重定向

如果直接使用 curl 打开某些被重定向后的链接，这种情况下就无法获取我们想要的网页内容。例如
```
curl  https://baidu.com

<html>
<head><title>302 Found</title></head>
<body bgcolor="white">
<center><h1>302 Found</h1></center>
<hr><center>bfe/1.0.8.18</center>
</body>
</html>
而当我们通过浏览器打开该链接时，会自动跳转到 http://www.baidu.com。此时我们想要 curl 做的，就是像浏览器一样跟随链接的跳转，获取最终的网页内容。我们可以在命令中添加 -L 选项来跟随链接重定向：
curl -L  https://baidu.com
```
5.curl -A 自定义User-Agent
```
火狐浏览器
curl -A "Mozilla/5.0 (Android; Mobile; rv:35.0) Gecko/35.0 Firefox/35.0" http://www.baidu.com
chrome浏览器
curl -A 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' https://www.baidu.com
```

6.curl -H自定义header
```
curl -H "Referer: www.example.com" https://www.baidu.com
```
7.curl -c保存cookie
```
curl -c "cookie-example" https://www.baidu.com
```
8.curl -b 读取cookie
```
curl -b "cookie-example" https://www.baidu.com
```
9.curl -c断点续传

# 当文件在下载完成之前结束该进程
$ curl -O http://www.gnu.org/software/gettext/manual/gettext.html
# ############## 20.1%

# 通过添加-C选项继续对该文件进行下载，已经下载过的文件不会被重新下载
curl -C - -O http://www.gnu.org/software/gettext/manual/gettext.html
# ############### 21.1%
10.--limit-rate限速

curl --limit-rate 1000B -O http://www.gnu.org/software/gettext/manual/gettext.html
11.分块下载
```
有时候下载的东西会比较大，这个时候我们可以分段下载。使用内置option：-r

curl -r 0-100 -o dodo1_part1.JPG http://www.linux.com/dodo1.JPG
curl -r 100-200 -o dodo1_part2.JPG http://www.linux.com/dodo1.JPG
curl -r 200- -o dodo1_part3.JPG http://www.linux.com/dodo1.JPG
cat dodo1_part* > dodo1.JPG
```
12.curl -d 发送post请求
```
POST 请求，-d 用于指定发送的数据，-X 用于指定发送数据的方式：

curl -d "userName=tom&passwd=123456" -X POST http://www.example.com/login
在使用 -d 的情况下，如果省略 -X，则默认为 POST 方式：

curl -d "userName=tom&passwd=123456" http://www.example.com/login
发送数据时，不仅可以使用 POST 方式，也可以使用 GET 方式，例如：

curl -d "somedata" -X GET http://www.example.com/api
或者使用 -G 选项：

curl -d "somedata" -G http://www.example.com/api
带 Cookie 登录
当然，如果我们再次访问该网站，仍然会变成未登录的状态。我们可以用之前提到的方法保存 Cookie，在每次访问网站时都带上该 Cookie 以保持登录状态。
curl -c “cookie-login” -d “userName=tom&passwd=123456” http://www.example.com/login
再次访问该网站时，使用以下命令：

curl -b “cookie-login” http://www.example.com/login
这样，就能保持访问的是登录后的页面了。
```