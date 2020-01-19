#### git 常用命令
```
git branch #查看本地分支
git branch -r  #查看远程分支
git branch name  #创建本地分支
git branch -d name #删除本地分支
git branch -a #查看所有分支
git checkout -b local-branchname
git stash   #暂存修改内容
git stash apply #还原暂存内容
git stash list #查看暂存list
git cherry-pick #合并其他分支任意一次提交的代码
origin/remote-branchname #将远程分支映射到本地命名为local-branchname  的一分支。
git reabse brachName merge code
git fetch：#从远程获取最新版本到本地，不会自动merge
git fetch origin master #从远程的origin的master主分支下载最新的版本到origin/master分支上
git diff origin master #比较本地的所在分支和origin/master分支的差别
git merge origin/v1.0 #将本地分支与获取的远程分支合并
git pull # 相当于是从远程获取最新版本并merge到本地
git remote add origin git@192.168.102.17:pingtaizu/r.xcloud.cc.git #添加远程分支
git revert commitHashId #对某一个commit进行撤销操作

git staus  #查看哪些文件有修改
git add file   #加入要提交的文件
git commit -m  #"说明" 本地提交
git push   #提交代码到服务器
git pull   #更新自己服务器代码到本地
git clone git@dtxcloud.f3322.net:pingtaizu/www.xcloud.cc.git
git config --global user.name "chenjianbin"
git config --global user.email 519846538@qq.com
#全局的通过vim ~/.gitconfig来查看

git config user.name "yuanmin"
git config user.email yuanmin@xcloud.cc
局部的通过当前路径下的 .git/config文件来查看
```
**文件权限问题**
```bash
git config --add core.filemode false
git config --global core.filemode false
#忽略文件权限
```
**查看历史**
```bash
git log 查看历史信息
git log --  paths  查看某个文件或者目录的历史
git reflog 查看所有历史信息
git log -p file 查看某个文件的历史
```

**合并commit信息**
1. git rebase -i commitId
2. 编辑信息
pick 的意思是要会执行这个 commit
squash 的意思是这个 commit 会被合并到前一个commit
3. 写入新的commit信息

**回退版本**
```bash
reset命令有3种方式：
git reset –-mixed：此为默认方式，不带任何参数的git reset，即时这种方式，它回退到某个版本，只保留源码，回退commit和index信息
git reset –-soft：回退到某个版本，只回退了commit的信息，不会恢复到index file一级。如果还要提交，直接commit即可
git reset –-hard：彻底回退到某个版本，本地的源码也会变为上一个版本的内容
```
**列出标签**
```bash
$ git tag # 在控制台打印出当前仓库的所有标签
$ git tag -l ‘v0.1.*’ # 搜索符合模式的标签
```
**打标签**
git标签分为两种类型：轻量标签和附注标签。轻量标签是指向提交对象的引用，附注标签则是仓库中的一个独立对象。建议使用附注标签。
**创建轻量标签**
`$ git tag v0.1.2-light`

**创建附注标签**
`$ git tag -a v0.1.2 -m “0.1.2版本”`

创建轻量标签不需要传递参数，直接指定标签名称即可。
创建附注标签时，参数a即annotated的缩写，指定标签类型，后附标签名。参数m指定标签说明，说明信息会保存在标签对象中。
切换到标签
与切换分支命令相同，用git checkout [tagname]
查看标签信息
用git show命令可以查看标签的版本信息：
$ `git show v0.1.2`
删除标签
误打或需要修改标签时，需要先将标签删除，再打新标签。
$ `git tag -d v0.1.2` # 删除标签

参数d即delete的缩写，意为删除其后指定的标签。

给指定的commit打标签
打标签不必要在head之上，也可在之前的版本上打，这需要你知道某个提交对象的校验和（通过git log获取）。
**补打标签**
`$ git tag -a v0.1.1 9fbc3d0`

标签发布
通常的git push不会将标签对象提交到git服务器，我们需要进行显式的操作：
`$ git push origin v0.1.2` # 将v0.1.2标签提交到git服务器
`$ git push origin –tags` # 将本地所有标签一次性提交到git服务器

注意：如果想看之前某个标签状态下的文件，可以这样操作

1.`git tag`  查看当前分支下的标签
2.`git  checkout v0.21`   此时会指向打v0.21标签时的代码状态，（但现在处于一个空的分支上）
```