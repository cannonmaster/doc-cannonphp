---
title: Routing
description: rotuing docs.
---

In CannonPHP, routing refers to defining the routes that your application responds to. Routes define the entry points to your application and determine which controller should handle the incoming request. CannonPHP provides a simple and expressive syntax for defining routes.

## Route Definition

Routes in CannonPHP are defined in the `App/Routes.php` file. This file contains the route declarations for your application's web interface.

Here's an example of a basic route definition:

```php
$rotuer->add('{controller}/{action}')
```

In this example, we define a route that responds to any url like `http://example.com/user/update` or `http://example.com/post/delete`. When a user visits `http://example.com/user/update` , the `updateAction` method in the `user` controller class will be invoked to handle the request.

## Regular Expression Route

You may constrain the format of your route parameters using regular expression.

Here's an example of a regular expression route definition:

```php
$rotuer->add('{controller}/id:\d+/{action}')
```

In this example, we define a regular expression route that responds to any url like `http://example.com/user/1/update` or `http://example.com/post/2/delete`. When a user visits `http://example.com/user/1/update` , the `updateAction` method in the `user` controller class will be invoked to handle the request, and also the router parameters including the id `1` will be the first parameter of the `updateAction`. Here's an example of the usage:

```php
<?php

namespace App\Controller;

use Core\BaseController;

class Home extends  BaseController
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

## Route prefix

You may need to add a prefix for a route.

Here's an example of a regular expression route definition:

```php
$rotuer->add('admin/{controller}/{action}', ['namespace'=>'admin'])
```

In this example, we define a route prefix that responds to any url like `http://example.com/admin/user/update` . When a user visits `http://example.com/admin/user/update` , the `updateAction` method in the `user` controller class `under the folder App/Controller/Admin` will be invoked to handle the request.

## Fixed route

You may need to add a fixed route.

Here's an example of a regular expression route definition:

```php
$rotuer->add('user/index', ['controller'=>'User', 'action'=>'index'])
$router->add('', ['controller' => 'home', 'action' => 'index']);
```

In this example, we define a route prefix that responds to a fixed url like `http://example.com/user/index` and `http://example.com`. When a user visits `http://example.com/user/index` , the `indexAction` method in the `user` controller class will be invoked to handle the request. Similary, When a user visits `http://example.com` , the `indexAction` method in the `home` controller class will be invoked to handle the request.

## The Controller and Action keywords

The `controller` and `action` are essential keywords utilized by the routing system to accurately determine the appropriate method to invoke. It is crucial to adhere to these specific keywords while defining the controller and action in the routes file, rather than using alternative terms. This adherence ensures consistency and compatibility within the routing system, allowing for seamless navigation and method invocation.

## Conclusion

This guide covered the basics of routing in CannonPHP. You can define routes in the routes.php file, and handle different HTTP url, define route parameters, assign namespace to routes, and define fixed route with common attributes. By leveraging CannonPHP's routing capabilities, you can build powerful and flexible applications.
