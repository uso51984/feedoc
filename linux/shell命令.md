### 快捷键
* `ctrl+a:`光标移到行首。
* `ctrl+d:`退出当前 Shell。
* `ctrl+e:`光标移到行尾。
* `ctrl+k:`清除光标后至行尾的内容。
* `ctrl+l:`清屏，相当于clear。
* `ctrl+r:`搜索之前打过的命令。会有一个提示，根据你输入的关键字进行搜索bash的history
* `ctrl+u:` 清除光标前至行首间的所有内容。
* `ctrl+w:` 移除光标前的一个单词
* `ctrl+t:` 交换光标位置前的两个字符
* `ctrl+y:` 粘贴或者恢复上次的删除
* `ctrl+d:` 删除光标所在字母;注意和backspace以及ctrl+h的区别，这2个是删除光标前的字符
* `ctrl+z `: 把当前进程转到后台运行，使用’ fg ‘命令恢复。比如top -d1 然后ctrl+z ，到后台，然后fg,重新恢复

### mac 命令
```
 lsof -i tcp:port #查看端口号对应进程
```
### linux 常用命令
```bash
find . -name *.js | xargs rm # 找到当前目录所有后缀名为*.js文件 然后删除
export http_proxy=ipaddress #设置代理
export https_proxy=ipaddress  #设置代理
netstat -aptlen # 常用比较全面的信息
netstat -lntp # 查看所有监听端口
type node #查看命令来源
which [命令名词] #显示系统命令所在目录
scp -P 端口  /home/d.mp3  root@192.168.1.1:/home   #远程拷贝
ls  -ald [文件或者目录]  -a（显示所有文件）-l（显示详细信息）-d （查看目录属性）
pwd #查看当前路径
touch [文件名] #创建文件
mkdir [目录名] #创建目录
cp -R [源文件或者目录] [目的目录]  -R  #复制目录
mv [源文件或者目录] [目的目录]  #功能移动或者更名
rm　-rf［文件或者目录］ #-r删除目录 -f 不用询问直接删除
ln -s [源文件] [目标文件]
# 不加s创建硬链接，-s创建软链接(
#第一，ln命令会保持每一处链接文件的同步性，也就是说，不论你改动了哪一处，其它的文件都会发生相同的变化；
#第二，ln的链接又 软链接和硬链接两种，软链接就是ln –s ，它只会在你选定的位置上生成一个文件的镜像，不会占用磁盘空间，硬链接ln ** **，没有参数-s， 它会在你选定的位置上生成一个和源文件大小相同的文件，无论是软链接还是硬链接，文件都保持同步变化。
#如果你用ls察看一个目录时，发现有的文件后面有一个@的符号，那就是一个用ln命令生成的文件，用ls –l命令去察看，就可以看到显示的link的路径了。)
dpkg -i .deb    #安装.deb文
tar -zxvf xxx.tar.gz 解压缩 xxx.tar.gz
tar -jxvf xxx.tar.bz2 解压缩 xxx.tar.bz2
tar -zcvf xxx.tar.gz aaa bbb 压缩aaa bbb目录为xxx.tar.gz
tar -jcvf xxx.tar.bz2 aaa bbb压缩aaa bbb目录为xxx.tar.bz2
sudo apt-get install zip unzip
sudo ln -f /usr/bin/zip /usr/bin/unzip
unzip x aaaa.zip #解压
egrep -r "sso.alwaha.com" * #查找当前目录含有sso.alwaha.com字符的所有文件
head -num [文件名] #查看文件的前几行  head -20 /etc/services
tail -num [文件名] #显示文件后几行 -f动态显示
tail -f catalina.out  #动态显示当前文件最近信息
tail -n 20 #查看文档末尾20行内容
dd if=/HOME/debian.iso of=/dev/sdb 制作U盘的启动盘
diff  1.html 2.html #比较两个文件内容不一样的地方
who #查看有哪些人登录
whoami #查看自己以什么用户登录
free -m # 查看内存使用量和交换区使用量
du -sh <目录名> # 查看指定目录的大小
grep MemTotal /proc/meminfo # 查看内存总量
grep MemFree /proc/meminfo # 查看空闲内存量
uptime # 查看系统运行时间、用户数、负载
cat /proc/loadavg # 查看系统负载
mount | column -t # 查看挂接的分区状态
fdisk -l # 查看所有分区
df -hl #查看磁盘空间
```


### 文件权限
#### 3种身份
* u：自己（user），即文件的拥有者
* g：和自己同一组的人（group）
* o：其它人（other）
* a：代表所有人
#### 4种权限
* r：读   4
* w：写  2
* x：执行  1
* s：特殊权限简称：sst
eg：
chomd 755  test.sh
chmod +x test.sh   “+x”表示给3种身份加上执行权限
chmod u+x test.sh   给自己加上执行权限
chmod o+x test.sh  给其它人加上执行权限
chmod o-x test.sh 给其它人减去 执行权限