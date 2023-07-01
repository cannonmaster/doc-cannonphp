---
title: 简介
description: 简介
---

### 引言

CannonPHP 包含了 CascadeORM，这是一个对象关系映射（ORM）工具，提供了一种方便的方式与数据库进行交互。CascadeORM 允许您执行各种操作，如从数据库表中检索、插入、更新和删除记录。本指南将介绍 CascadeORM 的基本用法。

> **注意：** 在开始之前，请确保在 `App/Config.php` 文件中配置了数据库连接。详细的配置说明请参考数据库配置文档。

### 生成模型类

要使用 CascadeORM，您需要创建与数据库表对应的模型类。这些模型类应该放置在 `App/Model` 目录中。以下是一个基本模型类的示例：

```php
<?php
namespace App\Model;

/**
 * Class User
 *
 * 表示一个用户模型。
 *
 * @package App\Model
 */
class User extends \App\DB\ORM\Model
{
    /**
     * 与模型关联的数据库表。
     *
     * @var string
     */
    protected $table = 'User';
}
```

在这个示例中，`User` 类继承了 CascadeORM 提供的 `Model` 类。通过继承 `Model` 类，您建立了与相应数据库表进行交互所需的结构。`$table` 属性指定了与模型关联的数据库表的名称。

遵循这些约定，CascadeORM 可以无缝连接您的面向对象模型与底层数据库，使您能够高效地操作和检索数据。

### 主键

默认情况下，CascadeORM 假定每个模型对应的数据库表都包含一个名为 `id` 的主键列。但是，如果您的数据库设计使用了不同的列作为主键，您可以轻松地自定义此行为。

要指定一个不同的列作为模型的主键，您可以在模型类中定义一个 `protected` 的 `$primary_key` 属性。这样，您可以明确指示要用作主键的列，确保准确地检索和操作数据。

以下是使用不同列作为主键的示例：

```php
<?php
namespace App\Model;

/**
 * Class User
 *
 * 表示一个用户模型。
 *
 * @package App\Model
 */
class User extends \App\DB\ORM\Model
{
    /**
     * 与表关联的主键。
     *
     * @var string
     */
    protected $primary_key = 'user_id';
}
```

另外，CascadeORM 假设主键是递增的整数值。因此，它会自动将主键转换为整数。如果您想使用非递增或非数字的主键，您可以在模型中定义一个`protected` 的 `$incrementing` 属性，并将其设置为 `false`：

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

如果您的模型的主键不是整数，您还应该定义一个`protected` 的$keyType 属性，并将其值设为'string'。这会告诉 CascadeORM 主键是字符串类型的。

使用这些定制选项，CascadeORM 允许您适应数据库架构中不同的主键配置。

一旦您创建了模型及其关联的数据库表，就可以开始从数据库中检索数据。CascadeORM 模型提供了一个便捷的查询构建器接口，用于从关联表中获取记录。`all()`方法检索表中的所有记录：

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

在上述示例中，`all()`方法在`User`模型上调用，以获取`User`表中的所有记录。然后使用`foreach`循环对检索到的记录进行迭代。

### 构建查询

CascadeORM 模型充当查询构建器，允许您向查询中添加额外的约束条件并检索特定记录。您可以链式调用方法以构建复杂的查询。以下是一个示例：

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

在上述示例中，使用`where()`、`orderBy()`和`limit()`方法向查询添加约束条件。最后，调用`get()`方法来检索结果。

请参阅 CascadeORM 的查询构建器文档，了解更多细化查询的选项。

### 检索单个模型/聚合结果

除了检索多个记录之外，还可以使用`find()`、`first()`、`count()`和`max()`等方法检索单个模型或聚合结果。以下是一个示例：

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
        // 通过主键检索模型
        $user = User::find(1);

        // 检索与查询约束条件匹配的第一个模型
        $user = User::where('id', '=', 2)->first();

        // 计算与查询约束条件匹配的模型数量
        $count = User::where('phone', '=', 10000)->count();

        // 检索与查询约束条件匹配的模型的'id'列的最大值
        $maxId = User::where('phone', '=', 10000)->max('id');

        return 'done';
    }
}
```

在上述示例中，`find()`方法通过主键检索用户模型。`first()`方法检索与查询约束条件匹配的第一个用户模型。`count()`方法返回与查询约束条件匹配的用户模型的数量。`max()`方法检索与查询约束条件匹配的用户模型的'id'列的最大值。

### 插入和更新模型

CascadeORM 提供了方便的方法来插入和更新模型。

#### 插入

要向数据库插入新记录，您可以实例化一个新的模型对象，设置所需的属性，然后调用 `save()` 方法。以下是一个示例：

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

在上面的示例中，创建了一个新的 `User` 模型实例，并设置了 `name` 和 `random` 属性。调用 `save()` 方法将记录插入数据库中。

默认情况下，CascadeORM 假设主键是一个自增的整数值，并自动将主键转换为整数。如果您想使用非自增或非数值的主键，可以在模型中定义一个公共 `$incrementing` 属性，并将其设置为 `false`。以下是一个示例：

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

在上面的示例中，将 `$incrementing` 属性设置为 `false`，以指示主键不是自增的。

如果模型的主键不是整数，您还应该定义一个受保护的 `$keyType` 属性，并将其值设置为 `'string'`。这告诉 CascadeORM 主键的数据类型是字符串类型。

通过使用这些自定义选项，CascadeORM 可以适应数据库架构中的不同主键配置。

#### 更新

要更新数据库中的现有模型，您可以检索模型，设置所需的属性，然后调用 `save()` 方法。以下是一个示例：

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

        return 'done';
    }
}
```

在上面的示例中，`find()` 方法检索了主键为 1 的用户模型。然后更新了 `name` 属性，并调用 `save()` 方法来更新数据库中对应的记录。

#### 批量更新

CascadeORM 还支持批量更新，可以更新与给定查询匹配的多个模型。以下是一个示例：

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

在上面的示例中，所有电话号码为 10000 的用户模型将被更新为电话号码为 20000。

### 删除模型

要从数据库中删除模型，您可以使用 `delete()` 方法。以下是一个示例：

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

在上面的示例中，`find()` 方法检索了主键为 1 的用户模型。然后，调用 `delete()` 方法来从数据库中删除该记录。

### UUID Keys

默认情况下，CascadeORM 假设模型的主键是自增的整数。然而，如果需要，你可以将 UUID（通用唯一标识符）作为主键使用。为此，你需要在模型中将`$incrementing`属性设置为`false`，将`$keyType`属性设置为`'string'`。以下是一个示例：

> **提示：** 当然，你应该确保模型具有 UUID 类型的主键列。

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

在上面的示例中，将 $incrementing 属性设置为 false 表示主键不是自增的，并且将 $keyType 属性设置为 'string' 表示主键是一个字符串类型。

当按照上面的配置之后，CannonPHP 将使用 UUID 作为主键，CascadeORM 也会自动帮你生成 UUID 作为新模型实例的主键。UUID 是一种通用唯一标识符，由 36 个字符组成，可以确保全局唯一性。你需要确保数据库表的主键具有足够的存储空间来容纳 UUID 。

### Command Builder

CascadeORM 默认提供了一个 MySQL 命令构建器，但你可以定义自己的命令构建器以满足特定需求。要使用自己的命令构建器，你可以在 App/DB/ORM 文件夹中创建一个 PHP 文件作为你的命令构建器。你可以参考 CascadeORM 提供的默认 MySQL 命令构建器来创建自己的命令构建器。

创建了自定义的命令构建器后，你可以在 App/Config.php 文件中更新 CommandBuilderInterface 配置，使用你自定义的命令构建器代替默认的构建器。

通过自定义命令构建器，你可以更加精确地控制 CascadeORM 执行的 SQL 查询，根据特定需求定制数据库交互行为。
