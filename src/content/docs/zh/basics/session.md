---
title: 会话
description: 在CannonPHP中管理会话。
---

## 简介

在 CannonPHP 中，会话提供了一种在无状态环境中跨多个请求存储用户特定信息的方法。CannonPHP 提供了多种会话后端，可以通过统一的 API 轻松访问。支持的后端包括 Redis、数据库等。

## 配置

你的 CannonPHP 应用程序的会话配置文件存储在`App/Config.php`文件中。请仔细查看此文件中可用的选项。默认情况下，CannonPHP 配置为使用 Redis 会话驱动程序，适用于在负载均衡的多个 Web 服务器上运行的生产应用程序。

`session_driver`配置选项确定会话数据存储位置。CannonPHP 默认提供了几个高性能的驱动程序：

- **database**：会话存储在关系型数据库中。
- **redis**：会话存储在 Redis 存储中，提供快速且基于缓存的存储。

所有会话配置选项都可以在`App/Config.php`文件中进行自定义，你可以根据需要调整会话数据库表名、Redis 主机等设置。

## 驱动程序先决条件

### 数据库

如果使用数据库会话驱动程序，需要创建一个表来存储会话记录。下面是会话表的示例模式：

```sql
CREATE TABLE cannon_session (
  id INT NOT NULL AUTO_INCREMENT,
  session_id VARCHAR(255) NOT NULL,
  last_activity DATETIME NOT NULL,
  PRIMARY KEY (id)
);
```

### Redis

要在 CannonPHP 中使用 Redis 会话，需要通过 PECL 安装 PhpRedis PHP 扩展。

## 存储数据

在存储任何数据之前，请确保会话已经启动。默认情况下，CannonPHP 会自动启动会话。但是，你可以通过修改`App/Config.php`文件中的配置来控制此行为。

```php
<?php

namespace App\Controller;

use Core\BaseController;

class HomeController extends BaseController
{
    public function indexAction()
    {
        $this->session->data['666'] = 123;
        $this->session->adapter->write($this->session->getId(), $this->session->data);
    }
}
```

## 检索项目

你可以使用以下代码检索会话数据：

```php
<?php

namespace App\Controller;

use Core\BaseController;

class HomeController extends BaseController
{
    public function indexAction()
    {
        $this->session->data['666'] = 123;
        $this->session->adapter->write($this->session->getId(), $this->session->data);
    }

    public function updateAction($params)
    {
        $val = $this->session->adapter->read($this->session->getId());
        // 这应该返回 ['666' => 123]
        echo $val;
        return $params['id'];
    }
}
```

这些示例演示了如何使用 CannonPHP 会话管理器存储和检索会话数据。根据你的应用程序特定需求，自
