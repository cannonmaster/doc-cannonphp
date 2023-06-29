---
title: 控制器
description: controller docs.
---

## 控制器

控制器可以将相关的请求处理逻辑组合到一个类中。例如，`UserController` 类可以处理与用户相关的所有传入请求，包括显示、创建、更新和删除用户。默认情况下，控制器存储在 `App/Controller` 目录中。

## 编写控制器

### 控制器示例

让我们来看一个基本控制器的示例。一个控制器可以拥有任意数量的公共方法，用于响应传入的 HTTP 请求：

```php
<?php

namespace App\Controller;

use App\Model\Post;
use App\Model\User;
use App\Model\Profile;
use Core\BaseController;
use Core\View;

class Home extends BaseController
{
    public function indexAction($params)
    {
        $name = 'John H';

        // 你也可以使用 $this->route_params 来访问路由参数

        try {
            $user = User::find(2);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
        return View::renderTemplate('Home/index.html', ['name' => $name]);
    }

    public function makeJuiceAction()
    {
        echo htmlspecialchars(print_r($this->route_params, true));
        echo 'made a juice plz';
    }
}
```

一旦编写了控制器类和方法，可以定义一个路由到控制器方法，如下所示：

```php
// App/Routes.php
$router->add('foo/bar', ['controller' => 'Home', 'action' => 'index']);
```

当传入的请求与指定的路由 URI 匹配时，例如 `https://example.com/foo/bar`，将调用 `App\Controller\HomeController` 类的 `index` 方法，并将路由参数传递给该方法。

所有控制器都继承自 `BaseController`，因此可以访问方便的功能，例如钩子。

## 控制器钩子

CannonPHP 中的钩子方便地存储在 `App/Hook` 目录中。当你在这个目录下定义钩子时，CannonPHP 会自动加载该目录下的所有文件并为你注册这些钩子。

CannonPHP 的钩子可以分为三种类型：

1. **beforeController 钩子**：顾名思义，这种类型的钩子在每个控制器的动作执行之前运行。它允许你在执行动作之前执行一些需要完成的任务或检查。

2. **CustomController 钩子**：这种钩子类型提供更大的灵活性，因为它可以应用于你选择的特定路由。你可以自由决定该钩子在控制器动作执行之前或之后运行。

3. **afterController 钩子**：类似于 beforeController 钩子，这种钩子类型在每个控制器的动作执行后运行。它允许你在动作完成后执行任何必要的任务或清理操作。

需要注意的是，这些钩子被调用的顺序遵循特定的顺序：beforeController 钩子 -> CustomController 钩子 -> 控制器动作执行 -> CustomController 钩子 -> afterController 钩子。

此外，CannonPHP 不仅允许你控制钩子的顺序，还可以控制每个钩子运行的条件。你可以指定哪些请求触发特定的钩子，从而精确控制它们的执行。此外，你还可以为钩子分配优先级，确保它们按照所需的顺序运行，以满足特定的要求。

借助 CannonPHP 的全面钩子系统，你可以灵活地将预处理和后处理任务无缝集成到应用程序的工作流程中。

以下是钩子的示例：

```php
<?php
/**
 * 添加在控制器之前执行的钩子。
 *
 * @param string $hookName 钩子的名称。
 * @param callable $callback 要执行的回调函数。
 * @param array $options 钩子的其他选项。
 *                        可用选项：
 *                        - priority: 钩子的优先级（默认为 10）。
 * @return void
 */
$hook::addHook('beforeController', function () {
    // echo 'before 1';
});

/**
 * 添加在 "apples/index" 动作之前或之后执行的自定义钩子。
 *
 * @param string $hookName 钩子的名称。
 * @param callable $callback 要执行的回调函数。
 * @param array $options 钩子的其他选项。
 *                        可用选项：
 *                        - runwhen: 指定钩子应该在何时运行（"before" 或 "after"）。
 * @return void
 */
$hook::addCustomHook('apples/index', function () {
    // echo 'apples index abc';
}, array('runwhen' => 'before'));

$hook::addCustomHook('apples/index', function () {
    // echo 'apples index 321';
}, array('runwhen' => 'after'));

/**
 * 添加在控制器之后执行的钩子。
 *
 * @param string $hookName 钩子的名称。
 * @param callable $callback 要执行的回调函数。
 * @param array $options 钩子的其他选项。
 *                        可用选项：
 *                        - priority: 钩子的优先级（默认为 10）。
 * @return void
 */
$hook::addHook('afterController', function () {
    // echo 'after 1';
}, array('priority' => 0));
```

事实上，钩子的优先级在确定多个相同类型的钩子执行顺序时起着关键作用。

为了保持钩子的良好组织结构，建议使用单独的文件夹存储不同类型的钩子。这种方法有助于提高代码的可读性，并简化 CannonPHP 应用程序中钩子的管理。

通过根据钩子类型将钩子组织到不同的文件夹中，例如 `BeforeControllerHook`、`CustomControllerHook` 和 `AfterControllerHook`，你可以轻松定位和修改所需的钩子。这种逻辑分离确保你的钩子被逻辑分组，更方便理解和维护应用程序的钩子系统。

通过遵循这种推荐的结构并优先考虑钩子的安排，你可以有效地管理它们的执行顺序，并维护一个结构良好的 CannonPHP 应用程序。
