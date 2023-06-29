---
title: Response
description: response docs.
---

## Creating Responses

All Controllers should return a response to be sent back to the user's browser. The most basic response is returning a string from a controller. The framework will automatically convert the string into a full HTTP response.

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

In addition to returning strings from your routes and controllers, you may also return arrays. The framework will automatically convert the array into a JSON response.

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

## Attaching Headers to Responses

You may use the `addHeader` method to add a series of headers to the response before sending it back to the user.

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

Furthermore, for the convenience of adding response headers, you can consider defining common headers within the `App/Config` class located in the `App` directory. By adding headers to the `header` array in this configuration class, those headers will be automatically included in the response sent back to the user. This approach allows for a more streamlined and centralized management of response headers.

Implementing this approach involves updating the `header` array in the `App/Config` class with the desired headers. These headers will then be included in the response without the need to manually add them each time. This saves time and effort while ensuring consistent header inclusion across the application.

Here's an example of how the `header` array in the `App/Config` class could be updated:

```php
<?php

namespace App;

class Config
{
    // other config variables ...

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

By defining headers within the `$header` array in the `App/Config` class, they will be automatically included in the response sent back to the user. This centralized approach provides a convenient way to manage and include common headers in the application's responses.

## Redirects

Sometimes you may wish to redirect the user to their previous location, such as when a submitted form is invalid.

Here is an example:

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

## JSON Response

The json method will automatically set the Content-Type header to application/json and convert the given array to JSON using the json_encode PHP function.

Here is an example:

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

The json method in the response object will automatically set the Content-Type header to application/json and convert the given array to JSON using the json_encode PHP function. This is useful when you want to return JSON responses from your controllers.

By using the json method, you can ensure that the response sent back to the user is properly formatted as JSON and includes the appropriate headers.
