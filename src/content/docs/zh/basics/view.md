---
title: 视图
description: view docs.
---

## 视图

### 简介

在构建 Web 应用程序时，直接从控制器返回完整的 HTML 文档字符串是不实际的。视图提供了一种方便的方法，通过将 HTML 代码放置在单独的文件中，将控制器/应用程序逻辑与呈现逻辑分离。

在 CannonPHP 中，默认使用 Twig 3.0 模板引擎来处理视图。视图模板通常使用 Twig 模板语言编写。让我们看一个简单的视图示例：

```twig
<!-- App/View/default/base.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    <nav>
        <a href="/">Home</a> |
        <a href="/apples/index">Posts</a>
    </nav>

    {% block body %}
    {% endblock %}
</body>
</html>

<!-- App/View/default/Home/index.html -->
{% extends "base.html" %}

{% block title %}abc{% endblock %}

{% block body %}
    <h1>{{ name }}</h1>
{% endblock %}
```

要渲染视图，可以使用 `View` 类提供的静态 `renderTemplate` 函数，像这样：

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;

class Home extends BaseController
{
    public function indexAction()
    {
        $name = 123;

        return View::renderTemplate('Home/index.html', ['name' => $name]);
    }
}
```

### 优化视图

默认情况下，Twig 会自动缓存编译后的模板以提高性能。这种缓存机制避免了在后续请求中对模板进行解析的需要。

在渲染模板时，Twig 会检查是否存在模板的缓存版本。如果存在，Twig 将使用缓存版本而不是重新渲染模板。如果缓存版本不存在或已过期，Twig 将重新编译并缓存模板，然后再进行渲染。

默认情况下，缓存的模板存储在根目录下的 `Cache` 目录中。
