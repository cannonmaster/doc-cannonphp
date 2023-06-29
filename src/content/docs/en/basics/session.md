---
title: Session
description: Manage sessions in CannonPHP.
---

## Introduction

Sessions in CannonPHP provide a way to store user-specific information across multiple requests in a stateless environment. CannonPHP offers various session backends that can be easily accessed through a unified API. Supported backends include Redis, databases, and more.

## Configuration

The session configuration for your CannonPHP application is stored in the `App/Config.php` file. Take a moment to review the available options in this file. By default, CannonPHP is configured to use the Redis session driver, which is suitable for production applications running on multiple web servers behind a load balancer.

The `session_driver` configuration option determines where session data will be stored. CannonPHP comes with several high-performance drivers out of the box:

- **database**: Sessions are stored in a relational database.
- **redis**: Sessions are stored in a Redis store, providing fast and cache-based storage.

All session configuration options can be customized in the `App/Config.php` file, allowing you to adjust settings like the session database table name or Redis host.

## Driver Prerequisites

### Database

If you're using the database session driver, you'll need to create a table to store session records. Here's an example schema for the session table:

```sql
CREATE TABLE cannon_session (
  id INT NOT NULL AUTO_INCREMENT,
  session_id VARCHAR(255) NOT NULL,
  last_activity DATETIME NOT NULL,
  PRIMARY KEY (id)
);
```

### Redis

To use Redis sessions with CannonPHP, you'll need to install the PhpRedis PHP extension via PECL.

## Storing Data

Before storing any data in the session, ensure that the session has been started. By default, CannonPHP auto-starts the session. However, you can control this behavior by modifying the configuration in the `App/Config.php` file.

```php
<?php

namespace App\Controller;

use Core\BaseController;

class HomeController extends BaseController
{
    public function indexAction()
    {
        $this->session->data['666'] = 123;
        $this->session->adapter->write($this->session->getId(), $this->session->data);
    }
}
```

## Retrieving an Item

You can retrieve session data using the following code:

```php
<?php

namespace App\Controller;

use Core\BaseController;

class HomeController extends BaseController
{
    public function indexAction()
    {
        $this->session->data['666'] = 123;
        $this->session->adapter->write($this->session->getId(), $this->session->data);
    }

    public function updateAction($params)
    {
        $val = $this->session->adapter->read($this->session->getId());
        // This should return ['666' => 123]
        echo $val;
        return $params['id'];
    }
}
```

These examples demonstrate how to store and retrieve data from the session using the CannonPHP session manager. Customize the session configuration and adapt the code to fit your application's specific needs.

Feel free to explore other features and functionality offered by CannonPHP's session management system.
