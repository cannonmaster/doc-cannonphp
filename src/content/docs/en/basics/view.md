---
title: View
description: View docs.
---

## Views

### Introduction

When building web applications, it's not practical to return entire HTML document strings directly from your controllers. Views provide a convenient way to separate your controller/application logic from your presentation logic by placing HTML code in separate files.

In CannonPHP, the Twig 3.0 template engine is used by default for views. View templates are typically written using the Twig templating language. Let's take a look at a simple example of a view:

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

To render a view, you can use the static `renderTemplate` function provided by the `View` class, like this:

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

### Optimizing Views

By default, Twig automatically caches the compiled templates to improve performance. This caching mechanism avoids the need for parsing the templates on subsequent requests.

When rendering a template, Twig checks if a cached version of the template exists. If it does, Twig uses the cached version instead of re-rendering the template. If the cached version doesn't exist or is outdated, Twig recompiles and caches the template before rendering it.

The cached templates are stored in the `Cache` directory under the root directory by default.
