---
title: Controller
description: controller docs.
---

## Controller

Controllers can group related request handling logic into a single class. For example, a `UserController` class might handle all incoming requests related to users, including showing, creating, updating, and deleting users. By default, controllers are stored in the `App/Controller `directory.

## Writing Controller

### Controller Example

Let's take a look at an example of a basic controller. A controller may have any number of public methods which will respond to incoming HTTP requests:

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

        // you also could use $this->route_params to access the route params

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
        echo 'made a juice';
    }
}
```

Once you have written a controller class and method, you may define a route to the controller method like so:

```php
// App/Routes.php
$rotuer->add('foo/bar', ['controller'=>'Home', 'action'=>'index']);
```

When an incoming request matches the specified route URI such as https://example.com/foo/bar, the index method on the App\Controller\HomeController class will be invoked and the route parameters will be passed to the method.

All controllers extends basecontroller, it will have access to convenient features such as the hooks.

## Controller Hooks

The hooks in CannonPHP are conveniently stored in the `App/Hook` directory. When you define hooks there, CannonPHP will automatically load all the files under this directory and register the hooks for you.

Hooks in CannonPHP can be classified into three types:

1. **beforeControllerHook**: As the name suggests, this type of hook runs before every controller's action is executed. It allows you to perform certain tasks or checks that need to be done before the action is carried out.

2. **CustomControllerHook**: This hook type provides more flexibility, as it can be applied to specific routes of your choice. You have the freedom to decide when this hook should run, whether it's before or after the controller's action is executed.

3. **AfterControllerHook**: Similar to the beforeControllerHook, this type of hook runs after the execution of every controller's action. It enables you to perform any necessary tasks or clean-up operations after the action has been completed.

It's important to note that the order in which these hooks are invoked follows a specific sequence: beforeControllerHook -> CustomControllerHook -> controller action execution -> CustomControllerHook -> afterControllerHook.

Furthermore, CannonPHP allows you not only to control the order but also the conditions under which each hook runs. You can specify which requests trigger certain hooks, giving you granular control over their execution. Additionally, you can assign priorities to the hooks, ensuring that they run in the desired order to meet your specific requirements.

With CannonPHP's comprehensive hook system, you have the flexibility and control to seamlessly integrate pre- and post-action tasks into your application's workflow.

Here's an example of the hooks:

```php
<?php
/**
 * Adds a hook to be executed before the controller.
 *
 * @param string $hookName The name of the hook.
 * @param callable $callback The callback function to be executed.
 * @param array $options Additional options for the hook.
 *                        Available options:
 *                        - priority: The priority of the hook (default: 10).
 * @return void
 */
$hook::addHook('beforeController', function () {
    // echo 'before 1';
});

/**
 * Adds a custom hook to be executed before or after the "apples/index" action.
 *
 * @param string $hookName The name of the hook.
 * @param callable $callback The callback function to be executed.
 * @param array $options Additional options for the hook.
 *                        Available options:
 *                        - runwhen: Specifies when the hook should run ("before" or "after").
 * @return void
 */
$hook::addCustomHook('apples/index', function () {
    // echo 'apples index abc';
}, array('runwhen' => 'before'));

$hook::addCustomHook('apples/index', function () {
    // echo 'apples index 321';
}, array('runwhen' => 'after'));

/**
 * Adds a hook to be executed after the controller.
 *
 * @param string $hookName The name of the hook.
 * @param callable $callback The callback function to be executed.
 * @param array $options Additional options for the hook.
 *                        Available options:
 *                        - priority: The priority of the hook (default: 10).
 * @return void
 */
$hook::addHook('afterController', function () {
    // echo 'after 1';
}, array('priority' => 0));
```

Indeed, the priority of hooks plays a crucial role in determining their execution order when multiple hooks of the same type are present.

To maintain a well-organized structure for your hooks, it is advisable to utilize separate folders to store different types of hooks. This approach helps in enhancing code readability and simplifying the management of hooks within your CannonPHP application.

By categorizing your hooks into distinct folders based on their types, such as `BeforeControllerHook`, `CustomControllerHook`, and `AfterControllerHook`, you can easily locate and modify the desired hooks as needed. This logical separation ensures that your hooks are logically grouped, making it more convenient to understand and maintain the application's hook system.

Furthermore, organizing hooks in this manner aligns with best practices for code organization and promotes a clean and modular architecture. It enables developers to quickly identify and update specific hooks without the need to search through a cluttered codebase.

By adhering to this recommended structure and prioritizing the arrangement of your hooks, you can effectively manage their execution order and maintain a well-structured CannonPHP application.
