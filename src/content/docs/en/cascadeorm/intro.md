---
title: Cascade ORM
description: intro
---

### Introduction

CannonPHP includes CascadeORM, an object-relational mapper (ORM) that provides a convenient way to interact with your database. CascadeORM allows you to perform various operations such as retrieving, inserting, updating, and deleting records from your database tables. This guide will walk you through the basic usage of CascadeORM.

> **Note:** Before you begin, make sure to configure your database connection in the `App/Config.php` file. Refer to the database configuration documentation for detailed instructions.

### Generating Model Classes

To work with CascadeORM, you need to create model classes that correspond to your database tables. These model classes should be placed in the `App/Model` directory. Here's an example of a basic model class:

```php
<?php
namespace App\Model;

/**
 * Class User
 *
 * Represents a User model.
 *
 * @package App\Model
 */
class User extends \App\DB\ORM\Model
{
    /**
     * The database table associated with the model.
     *
     * @var string
     */
    protected $table = 'User';
}
```

In this example, the `User` class extends the `Model` class provided by CascadeORM. By inheriting from the `Model` class, you establish the necessary structure for interacting with the corresponding database table. The `$table` property specifies the name of the database table associated with the model.

By following these conventions, CascadeORM seamlessly connects your object-oriented model with the underlying database, allowing you to manipulate and retrieve data efficiently.

### Primary Keys

By default, CascadeORM assumes that each model's corresponding database table includes a primary key column named "id." However, if your database design uses a different column as the primary key, you can easily customize this behavior.

To specify a different column as the primary key for your model, you can define a protected `$primary_key` property within your model class. This allows you to explicitly indicate the desired column to serve as the primary key, ensuring accurate data retrieval and manipulation.

Here's an example of using a different column as the primary key:

```php
<?php
namespace App\Model;

/**
 * Class User
 *
 * Represents a User model.
 *
 * @package App\Model
 */
class User extends \App\DB\ORM\Model
{
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primary_key = 'user_id';
}
```

Additionally, CascadeORM assumes that the primary key is an incrementing integer value. Therefore, it automatically casts the primary key to an integer. If you want to use a non-incrementing or non-numeric primary key, you can define a public `$incrementing` property and set it to `false` in your model:

```php
<?php
namespace App\Model;

/**
 * Class User
 *
 * Represents a User model.
 *
 * @package App\Model
 */
class User extends \App\DB\ORM\Model
{
    /**
     * The database table associated with the model.
     *
     * @var string
     */
    protected $table = 'User';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    protected $incrementing = false;
}
```

If your model's primary key is not an integer, you should also define a protected `$keyType` property with a value of `'string'`. This tells CascadeORM that the primary key is of string type.

Using these customization options, CascadeORM allows you to adapt to different primary key configurations in your database schema.

### Retrieving Models

Once you have created a model and its associated database table, you can start retrieving data from the database. CascadeORM models provide a convenient query builder interface to fetch records from the associated table. The `all()` method retrieves all records from the table:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;
use App\Model\User;

class Home extends  BaseController
{
    public function indexAction()
    {
        $users = User::all();

        foreach ($users as $user) {
            echo $user->name;
        }

        return 'done';
    }
}
```

In the above example, the `all()` method is called on the `User` model to fetch all records from the `User` table. The retrieved records are then iterated over in a `foreach` loop.

### Building Queries

CascadeORM models act as query builders, allowing you to add additional constraints to your queries and retrieve specific records. You can chain methods to build complex queries. Here's an example:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;
use App\Model\User;
use App\Model\Post;

class Home extends  BaseController
{
    public function indexAction()
    {
        $users = User::where('phone', '=', 10000)
            ->orderBy('name')
            ->limit(10)
            ->get();

        foreach ($users as $user) {
            echo $user->name;
        }

        return 'done';
    }
}
```

In the above example, the `where()`, `orderBy()`, and `limit()` methods are used to add constraints to the query. Finally, the `get()` method is called to retrieve the results.

Review the available methods in CascadeORM's query builder documentation for more options to refine your queries.

### Retrieving Single Models / Aggregates

In addition to retrieving multiple records, you can also retrieve single models or aggregate results using methods like find(), first(), count(), and max(). Here's an example:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;
use App\Model\User;

class Home extends  BaseController
{
    public function indexAction()
    {
        // Retrieve a model by its primary key
        $user = User::find(1);

        // Retrieve the first model matching the query constraints
        $user = User::where('id', '=', 2)->first();

        // Count the number of models matching the query constraints
        $count = User::where('phone', '=', 10000)->count();

        // Retrieve the maximum value of a column for the models matching the query constraints
        $maxId = User::where('phone', '=', 10000)->max('id');
        return 'done';
    }
}
```

In the above example, the `find()` method retrieves a user model by its primary key. The `first()` method retrieves the first user model that matches the query constraints. The `count()` method returns the count of user models that match the query constraints. The `max()` method retrieves the maximum value of the 'id' column for user models that match the query constraints.

## Inserting and Updating Models

CascadeORM provides convenient methods for inserting and updating models.

### Inserts

To insert a new record into the database, you can instantiate a new model instance, set the desired attributes, and then call the `save()` method. Here's an example:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;
use App\Model\User;

class Home extends  BaseController
{
    public function indexAction()
    {
     $user = new User;
     $user->name = 'Ali';
     $user->random = 'abc';
     $id = $user->save();


      return 'done';
    }
}
```

In the above example, a new User model instance is created, and the name and random attributes are set. Calling the save() method inserts the record into the database.

By default, CascadeORM assumes that the primary key is an incrementing integer value, and it automatically casts the primary key to an integer. If you want to use a non-incrementing or non-numeric primary key, you can define a public $incrementing property in your model and set it to false. Here's an example:

```php
<?php
namespace App\Model;

/**
 * Class User
 *
 * Represents a User model.
 *
 * @package App\Model
 */
class User extends \App\DB\ORM\Model
{
    /**
     * The database table associated with the model.
     *
     * @var string
     */
    protected $table = 'User';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    protected $incrementing = false;

}

```

In the above example, the $incrementing property is set to false to indicate that the primary key is not auto-incrementing.

If your model's primary key is not an integer, you should define a protected $keyType property and set the incrementing variable to false on your model. The $keyType property should have a value of 'string':

```php
<?php
namespace App\Model;

/**
 * Class User
 *
 * Represents a User model.
 *
 * @package App\Model
 */
class User extends \App\DB\ORM\Model
{
    /**
     * The database table associated with the model.
     *
     * @var string
     */
    protected $table = 'User';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    protected $incrementing = false;

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

}

```

Using this way, the Cascade assumes the primary key of the table is a UUID key column.

### Updates

To update an existing model in the database, you can retrieve the model, set the desired attributes, and then call the save() method. Here's an example:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;
use App\Model\User;

class Home extends  BaseController
{
    public function indexAction()
    {

        $user = User::find(1);
        $user->name = 'Ali';
        $id = $user->save();
    }
}
```

In the above example, the find() method retrieves the user model with a primary key of 1. The name attribute is then updated, and calling the save() method updates the corresponding record in the database.

#### Massive Updates

CascadeORM also supports mass updates, where you can update multiple models that match a given query. Here's an example:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;
use App\Model\User;

class Home extends  BaseController
{
    public function indexAction()
    {

        User::where('phone', '=', 10000)->update(['phone' =>  20000]);
    }
}
```

In the above example, all user models with a phone value of 10000 are updated to have a phone value of 20000.

### Deleting Models

To delete a model from the database, you can use the delete() method. Here's an example:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use Core\View;
use App\Model\User;

class Home extends  BaseController
{
    public function indexAction()
    {
        $user = User::find(1);
        $user->delete();

        return 'done';
    }
}
```

In the example above, the find() method retrieves the user model with the primary key of 1. Then, the delete() method is called to delete that record from the database.

## UUID Keys

By default, CascadeORM assumes that the primary key of a model is an auto-incrementing integer. However, you can use UUIDs (Universally Unique Identifiers) as the primary key if desired. To do so, you need to set the $incrementing property to false and the $keyType property to 'string' in your model. Here's an example:

> **Tip:** Of course, you should ensure that the model has a UUID type equivalent primary key column.

```php
<?php
namespace App\Model;

/**
 * Class User
 *
 * Represents a User model.
 *
 * @package App\Model
 */
class User extends \App\DB\ORM\Model
{
    /**
     * The database table associated with the model.
     *
     * @var string
     */
    protected $table = 'User';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    protected $incrementing = false;

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';
}

```

In the above example, the $incrementing property is set to false to indicate that the primary key is not auto-incrementing, and the $keyType property is set to 'string' to specify that the primary key is a string.

When using UUID keys, CascadeORM will generate UUIDs for new model instances automatically. UUIDs are universally unique alphanumeric identifiers that are 36 characters long. You need to ensure that your database table has enough storage size to accommodate the UUID key.

## Command Builder

CascadeORM provides a MySQL command builder by default, but you can define your own command builder to meet your specific requirements. To use your own command builder, you can create a PHP file for your command builder in the App/DB/ORM folder. You can use the default MySQL command builder provided by CascadeORM as a reference to create your own.

Once you have created your custom command builder, you can update the CommandBuilderInterface configuration in the App/Config.php file to use your custom command builder instead of the default one.

By customizing the command builder, you have more control over the SQL queries executed by CascadeORM, allowing you to tailor the database interactions according to your specific needs.
