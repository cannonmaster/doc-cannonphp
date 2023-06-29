---
title: 路由
description: 路由文档
---

在 CannonPHP 中，路由指的是定义应用程序响应的路由。路由定义了应用程序的入口点，并确定哪个控制器应处理传入的请求。CannonPHP 提供了一种简单而表达力强的语法来定义路由。

## 路由定义

在 CannonPHP 中，路由定义在 `App/Routes.php` 文件中。该文件包含了您的应用程序 Web 接口的路由声明。

以下是一个基本路由定义的示例：

```php
$router->add('{controller}/{action}');
```

在这个示例中，我们定义了一个路由，用于响应任意 URL，如 `http://example.com/user/update` 或 `http://example.com/post/delete`。当用户访问 `http://example.com/user/update` 时，将调用 `user` 控制器类中的 `updateAction` 方法来处理请求。

## 正则表达式路由

您可以使用正则表达式来限制路由参数的格式。

以下是一个正则表达式路由定义的示例：

```php
$router->add('{controller}/id:\d+/{action}');
```

在这个示例中，我们定义了一个正则表达式路由，用于响应任意 URL，如 `http://example.com/user/1/update` 或 `http://example.com/post/2/delete`。当用户访问 `http://example.com/user/1/update` 时，将调用 `user` 控制器类中的 `updateAction` 方法来处理请求，并且路由参数中的 id 值 `1` 将作为 `updateAction` 的第一个参数。以下是用法示例：

```php
<?php

namespace App\Controller;

use Core\BaseController;

class Home extends BaseController
{
    public function indexAction()
    {
        return 'home/index';
    }

    public function updateAction($params)
    {
        return $params['id'];
    }
}
```

## 路由前缀

您可能需要为路由添加前缀。
以下是一个路由前缀的示例： `php $router->add('admin/{controller}/{action}', ['namespace' => 'admin']); ` 在这个示例中，我们定义了一个路由前缀，用于响应任意 URL，如 `http://example.com/admin/user/update`。当用户访问 `http://example.com/admin/user/update` 时，将调用 `admin` 文件夹下的 `user` 控制器类中的 `updateAction` 方法来处理请求。

## 固定路由

您可能需要添加一个固定的路由。

以下是一个固定路由的示例：

```php
$router->add('user/index', ['controller' => 'User', 'action' => 'index']);
$router->add('', ['controller' => 'home', 'action' => 'index']);
```

在这个示例中，我们定义了一个固定路由，分别响应固定的 URL `http://example.com/user/index` 和 `http://example.com`。当用户访问 `http://example.com/user/index` 时，将调用 `user` 控制器类中的 indexAction 方法来处理请求。类似地，当用户访问 http://example.com 时，将调用 home 控制器类的 indexAction 方法来处理请求。

## controller 和 action 关键字

controller 和 action 是路由系统中的关键字，用于准确确定要调用的适当方法。在路由文件中定义控制器和操作时，使用这些特定关键字而不是其他术语非常重要。遵循这些关键字的使用确保了路由系统内的一致性和兼容性，从而实现无缝的导航和方法调用。

结论
本指南介绍了 CannonPHP 中路由的基础知识。您可以在 routes.php 文件中定义路由，并处理不同的 HTTP URL、定义路由参数、为路由分配命名空间以及定义具有公共属性的固定路由。通过利用 CannonPHP 的路由功能，您可以构建功能强大而灵活的应用程序。
