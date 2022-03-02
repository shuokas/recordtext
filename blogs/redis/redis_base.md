---
title: redis 安装使用教程
date: 2020-6-06
type: docs
tags:
 - Redis
categories:
 - Redis
---

redis 安装使用教程

```
yum update -y
```


Linux安装redis分为两种：源码手动安装和yum安装

1. 下载Redis安装包

##### 可以进入官网查看最新版本，根据需要选择对应版本下载。

- 官网：https://redis.io/
- 中文网：http://www.redis.cn/

下载、解压、编译Redis

下载
```
wget http://download.redis.io/releases/redis-6.0.6.tar.gz
```

解压
```
tar xzf redis-6.0.6.tar.gz
```

进入解压后的文件夹
```
cd /usr/local/redis-6.0.6
```

进入到解压后的目录后**编译**
```
make install  #默认安装
make install PREFIX=/usr/local/redis #指定目录安装
```

TIPS：如果make install 报错 如下
![](i/error.png)
CentOS7安装有默认GCC环境，默认4.8.5版本！编译 redis-6.x，要求 C5.3以上 编译器，否则会遇到大量的错误。主要原因是从 redis-6.x 开始的多线程代码依赖C标准库中的新增类型 _Atomic 。但是注意 gcc 从 4.9 版本才开始正式和完整地支持 stdatomic（gcc-4.8.5 部分支持）。centos7默认的 gcc 版本为：4.8.5 < 5.3 无法编译

解决方案：
　　　　虽然此次编译出错，但是仍有一些文件已经编译生成，所以建议清除已经编译的文件。（如果没有编译出错，忽略不计）（make命令必须在Redis程序目录下执行）

```
# 当Redis编译出错时，使用命令清除已编译生成的文件（不执行也可以：不推荐）
make  distclean
####升级GCC环境为9版本
yum  -y  install  centos-release-scl
yum  -y  install  devtoolset-9-gcc  devtoolset-9-gcc-c++  devtoolset-9-binutils

-------环境设置----------
#临时有效，退出 shell 或重启会恢复原 gcc 版本
scl enable devtoolset-9 bash

#长期有效
echo "source /opt/rh/devtoolset-9/enable" >>/etc/profile
```

然后通过如下命令启动Redis:

```
./redis-server
```

![](i/8439cca0-4b29-49a8-9788-85fe4e80fea6.jpg)


注意：这里直接执行Redis-server 启动的Redis服务，是在前台直接运行的(效果如上图)，也就是说，执行完该命令后，如果Lunix关闭当前会话，则Redis服务也随即关闭。正常情况下，启动Redis服务需要从后台启动，并且指定启动配置文

进入内置的客户端与Redis进行交互:

```
./redis-cli

redis> ping
pong
redis> quit
退出
```


如果需要远程连接的话修改一些配置文件
```
# 打开redis配置文件
vi redis.conf

# 找到 bind 127.0.0.1 将其注释

# 找到 protected-mode yes 将其改为 # 允许远程连接

protected-mode no
```

启动、关闭
```
# 配置更改完成之后可以实现后台启动+使用配置文件启动
./redis-server redis.conf
```

命令方式关闭redis

```
./redis-cli # 进入后执行shutdown
shutdown
```

比较习惯cd到目录里面启动
如果没有配置密码，远程连接会报错
先设置密码
```
./redis-cli 
set password 
```
Redis报错 : (error) NOAUTH Authentication required.
```
# 这个错误是因为没有用密码登陆认证，可以先输入密码试试。

*> auth "yourpassword"
# 例如密码是‘123456’,当出现认证问题时候，输入 auth "123456" 就可以了.

*> set name "hello"
# (error) NOAUTH Authentication required.
*> (error) NOAUTH Authentication required.
(error) ERR unknown command '(error)'
*> auth "root"
```
