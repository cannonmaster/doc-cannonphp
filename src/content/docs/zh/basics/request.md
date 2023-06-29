---
title: 请求
description: request文档。
---

## 简介

CannonPHP 的 Engine\Request 类提供了一种面向对象的方法，可以无缝地与应用程序中的当前 HTTP 请求进行交互。它提供了方便的方法来访问和操作与请求相关的超全局变量，包括`$_GET`、`$_POST`、`$_FILES`、`$_SERVER`和`$_COOKIE`。

除了提供方便的方法来访问超全局变量外，CannonPHP 的 Request 类还负责清理和净化这些变量，以减轻潜在的安全风险。

使用 Request 类，你可以轻松地从`$_GET`超全局变量中检索数据，该变量包含在 URL 中发送的查询参数及其值。这使得你可以访问和处理通过请求的 URL 参数传递的信息。

类似地，`$_POST`超全局变量保存通过 POST 请求提交的数据。通过利用 Request 类，你可以轻松地检索和处理这些数据，实现无缝的表单处理和数据操作。

在涉及文件上传的情况下，`$_FILES`超全局变量包含有关上传文件的信息。Request 类提供了方便的方法来访问和管理这些文件，使得在应用程序中处理文件上传变得更加容易。

此外，Request 类允许你访问`$_SERVER`超全局变量，其中包含与服务器和当前请求相关的各种详细信息。你可以检索诸如请求头、服务器配置和与请求相关的其他环境变量等信息。

此外，Request 类还便于与`$_COOKIE`超全局变量进行交互。这使得你可以检索和操作与当前请求相关的 Cookie，提供了一种无缝处理基于 Cookie 的操作的方式。

通过利用 CannonPHP 中 Request 类的面向对象功能，你可以轻松地与当前的 HTTP 请求进行交互，并访问各种超全局变量，实现流畅的请求处理和高效的数据检索。

## 访问请求

要通过依赖注入容器访问当前 HTTP 请求的实例，以下是一个示例，演示如何访问`$_GET`超全局变量：

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;

class HomeController extends BaseController
{
    public function indexAction()
    {
      // http://localhost:8888/home/index?abc=2，下面的代码将返回"2"
      $get = $this->request->get['abc'];

      $name = 'Hi, ';
      return View::renderTemplate('Home/index.html', ['name' => $name]);
    }
}
```

除了从`$_GET`超全局变量中检索值，你可以使用类似的方法访问其他超全局变量，如`$_POST`、`$_FILES`、`$_SERVER`。

利用 CannonPHP 中 Request 类的功能，可以轻松地与当前的 HTTP 请求进行交互，
