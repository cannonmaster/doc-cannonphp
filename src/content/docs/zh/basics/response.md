---
title: 响应
description: response docs.
---

## 创建响应

所有控制器都应返回响应以发送回用户的浏览器。最基本的响应是从控制器返回一个字符串。框架会自动将字符串转换为完整的 HTTP 响应。

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;

class Home extends BaseController
{
    public function indexAction()
    {
        return 'basic string value';
    }
}
```

除了从路由和控制器返回字符串之外，还可以返回数组。框架会自动将数组转换为 JSON 响应。

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;

class Home extends BaseController
{
    public function indexAction()
    {
        $value = [
            'test' => 'abc'
        ];
        return $value;
    }
}
```

## 添加响应头

可以使用 `addHeader` 方法在发送响应之前向响应中添加一系列头信息。

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;

class Home extends BaseController
{
    public function indexAction()
    {
        $this->response->addHeader('X-Test: custom-response-header');
        return $value;
    }
}
```

此外，为了方便添加响应头，可以考虑在位于 `App` 目录下的 `App/Config` 类中定义常见的头信息。通过将这些头信息添加到配置类的头信息数组中，这些头信息将自动包含在发送给用户的响应中。这种方法可以更加简化和集中管理响应头。

实现此方法需要更新 `App/Config` 类中的头信息数组，添加所需的头信息。这样，这些头信息将在响应中自动包含，无需每次手动添加。这样可以节省时间和精力，同时确保应用程序中的响应头一致。

以下是如何更新 `App/Config` 类中的头信息数组的示例：

```php
<?php

namespace App;

class Config
{
    // 其他配置变量...

    const header = [
        'Access-Control-Allow-Origin: *',
        'Access-Control-Allow-Credentials: true',
        'Access-Control-Max-Age: 1000',
        'Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding',
        'Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE',
        'Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
        'Pragma: no-cache'
    ];
}
```

通过在 `App/Config` 类的 `$header` 数组中定义头信息，这些头信息将自动包含在发送给用户的响应中。这种集中的方法提供了一种方便的方式来管理和包含应用程序响应中的常见头信息。

## 重定向

有时，您可能希望将用户重定向到其之前的位置，例如当提交的表单无效时。

下面是一个示例：

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;

class Home extends BaseController
{
    public function indexAction()
    {
        return $this->response->redirect('http://localhost:8888/home/2/update');
    }

    public function updateAction($params)
    {
        return $params['id'];
    }
}
```

## JSON 响应

`response` 对象的 `json` 方法会自动将 `Content-Type` 头设置为 `application/json`，并使用 `json_encode` PHP 函数将给定的数组转换为 JSON。这在您希望从控制器返回 JSON 响应时非常有用。

以下是一个示例：

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;

class Home extends  BaseController
{
    public function indexAction()
    {
      return $this->response->json([
            'message' => 'Success',
            'data' => [
                'id' => 1,
                'name' => 'Alex',
                'email' => 'alex@example.com'
            ]
        ]);
    }
}
```
