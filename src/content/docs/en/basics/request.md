---
title: Request
description: request docs.
---

## Introduction

CannonPHP's Engine\Request class offers an object-oriented approach to seamlessly interact with the ongoing HTTP request within your application. It provides convenient methods for accessing and manipulating the superglobal variables associated with the request, namely `$_GET`, `$_POST`, `$_FILES`, `$_SERVER`, and `$_COOKIE`.

In addition to providing convenient methods for accessing the superglobal variables, CannonPHP's Request class also takes care of clearing and sanitizing these variables to mitigate potential security risks.

With the Request class, you can effortlessly retrieve data from the `$_GET` superglobal variable, which contains the query parameters and their values sent in the URL. This allows you to access and process information passed through the request's URL parameters.

Similarly, the `$_POST` superglobal variable holds data submitted through POST requests. By leveraging the Request class, you can effortlessly retrieve and handle this data, enabling seamless form processing and data manipulation.

In scenarios where file uploads are involved, the `$_FILES` superglobal variable contains information about uploaded files. The Request class provides convenient methods to access and manage these files, making it easier to handle file uploads within your application.

Furthermore, the Request class allows you to access the `$_SERVER` superglobal variable, which contains various details related to the server and the current request. You can retrieve information such as request headers, server configurations, and other environment variables associated with the request.

Additionally, the Request class facilitates interaction with the `$_COOKIE` superglobal variable. This allows you to retrieve and manipulate cookies associated with the current request, providing a seamless way to handle cookie-based operations.

By utilizing the object-oriented capabilities of the Request class in CannonPHP, you can effortlessly interact with the current HTTP request and access the various superglobal variables, enabling streamlined request handling and efficient data retrieval within your application.

## Accessing The Rqeust

To access the instance of the current HTTP request via dependency injection container, here's an example to access the `$_GET` super global variable:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;

class Home extends BaseController
{
    public function indexAction()
    {
      // http://localhost:8888/home/index?abc=2, the following return "2"
      $get = $this->request->get['abc'];

      $name = 'Hi, ';
      return View::renderTemplate('Home/index.html', ['name' => $name]);
    }
}
```

In addition to retrieving values from the `$_GET` superglobal variable, you can use a similar approach to access values from other superglobal variables like `$_GET`, `$_POST`, `$_FILES`, `$_SERVER`.
