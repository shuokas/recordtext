---
title: docker容器启动后，端口变更的方法
date: 2022-04-11
tags:
 - Docker
categories:
 - Docker
---

在docker运行中我们又遇到了更换端口映射的需求，那该怎么处理？于是熟练的打开www.**.com一顿查找，结果大致如下：

### 一、修改配置文件，更改映射端口

1. 首先：停止docker（否则更改不生效）
```systemctl stop docker```

2. 查看当前容器 CONTAINER ID
```docker ps -a```
<img :src="$withBase('/logo.png')" alt="mixureSecure">
<!-- ![](~@base/home_bg.png) -->
3. 上图，我的ID为 360f31a218b3，则进入容器目录修改对应配置文件
``` cd /var/lib/docker/containers/360f31a218b3* ```

4. 修改hostconfig.json中的PortBindings字段
```"PortBindings":{"5700/tcp":[{"HostIp":"0.0.0.0","HostPort":"5781"}]} ```
![](i/d8469a90-2ffe-4315-978f-c59cf09073d0.jpg)

5. 重启docker
```systemctl restart docker ``` 
 
下面是我在网上摘抄的，如有侵权，联系删除

### 二、删除原有容器，重新建新容器

这个解决方案最为简单，把原来的容器删掉，重新建一个。当然这次不要忘记加上端口映射。优点是简单快捷，在测试环境使用较多。缺点是如果是数据库镜像，那重新建一个又要重新配置一次，就比较麻烦了。

### 三、利用docker commit新构镜像

docker commit：把一个容器的文件改动和配置信息commit到一个新的镜像。这个在测试的时候会非常有用，把容器所有的文件改动和配置信息导入成一个新的docker镜像，然后用这个新的镜像重起一个容器，这对之前的容器不会有任何影响。

#### 1、停止docker容器

```docker stop container01```

#### 2、commit该docker容器

```docker commit container01 new_image:tag ```
#### 3、用前一步新生成的镜像重新起一个容器

```docker run --name container02 -p 80:80 new_image:tag ```
这种方式的优点是不会影响统一宿主机上的其他容器，缺点是管理起来显得比较乱。