---
title: Cascade 数据表关系
description: Cascade 数据表关系
---

### 介绍

数据库表之间通常存在关联关系。例如，博客文章可能有多个评论，或者订单可能与下单用户相关联。CascadeORM 简化了这些关系的管理和处理，并支持各种常见的关联类型，包括：

- 一对一关联
- 一对多关联
- 多对多关联

使用 CascadeORM，处理这些关系变得简单而直观。

### 定义数据表关系

级联关系就像是 Cascade 模型类的最好朋友。它们被定义为方法，不仅建立了表之间的关系，还充当了强大的查询构建器。这意味着您可以链式添加其他查询约束，发挥方法链式调用和查询能力的全部潜力。就像拥有一对无缝合作的黄金搭档。所以，请随意探索和利用级联关系的威力，使您的数据库交互变得流畅高效。它们会一直支持您！E.g:

```php
$user->posts()->where('title','=','abc')->get();
```

在深入探索数据表关系如何定义之前，让我们先了解一下 CascadeORM 支持的每种关系类型的定义方法。这就像在踏上激动人心的旅程之前打下坚实的基础。所以，让我们开始吧，探索关系的魔力吧！

### 一对一关系

要定义这种关系，我们将在 User 模型中创建一个 profile 方法。在 profile 方法内部，我们将使用 App\DB\ORM\Model 基类提供的 hasOne 方法。这个方法将建立 User 和 Profile 模型之间的一对一关系。所以，赶紧创建这个特殊的联系吧！

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
     * Get the profile associated with the user.
     *
     * @return \App\Model\Profile
     */
    public function profile()
    {
        return $this->hasOne('App\Model\Profile');
    }
}
```

当使用 hasOne 方法时，您需要将相关模型类的名称作为第一个参数传递。一旦定义了关系，您就可以轻松地使用 Cascade 的动态属性检索相关记录。这些动态属性就像魔法一样工作，允许您访问关系方法，就像它们是模型上实际定义的属性一样。这是一种方便且直观的方式来浏览模型的关系。所以，请放心探索 CascadeORM 中的动态属性世界！它们会让您的生活变得更轻松。

```php
// return city property value on the profile table which the user id is 1
$user = User::find(1)->profile()->city;
```

### 定义关系的反向关系

CascadeORM 会根据 Profile 模型中的主键自动确定一对一关系的外键。在这种情况下，Profile 模型的主键同时被假定为外键。因此，外键的值与主键相同，因为它们引用相同的列。CascadeORM 在幕后处理这些细节，使您能够轻松建立和导航一对一关系。这样，您就可以专注于应用逻辑，而 CascadeORM 则为您处理复杂的细节。

现在，我们可以从 User 模型中访问 Profile 模型了。接下来，让我们在 Profile 模型上定义一个关系，以便我们可以访问拥有该 Profile 的用户。我们可以使用 belongsTo 方法来建立 hasOne 关系的反向关系。这就像完成了我们模型之间的友谊圈子。因此，让我们定义这种特殊的关联，并解锁 CascadeORM 中双向关系的强大功能！

```php
<?php

namespace App\Model;

/**
 * Class Profile
 *
 * Represents a Profile model.
 *
 * @package App\Model
 */
class Profile extends \App\DB\ORM\Model
{
  /**
   * The database table associated with the model.
   *
   * @var string
   */
  protected $table = 'Profile';

  /**
   * Get the user associated with the profile.
   *
   * @return \App\Model\User
   */
  public function user()
  {
    return $this->belongsTo('App\Model\User', 'id');
  }
}
```

CascadeORM 根据 belongsTo 方法的第二个参数确定了 User 表的主键。在这种情况下，列名 id 被用作主键。

如果 Profile 表不使用 id 作为其主键，或者您希望使用不同的列来查找关联模型，可以将第三个参数传递给 belongsTo 方法，以指定 Profile 表的主键。这是一个灵活的功能，允许您根据特定需求自定义关系。

```php
<?php

namespace App\Model;

/**
 * Class Profile
 *
 * Represents a Profile model.
 *
 * @package App\Model
 */
class Profile extends \App\DB\ORM\Model
{
  /**
   * The database table associated with the model.
   *
   * @var string
   */
  protected $table = 'Profile';

  /**
   * Get the user associated with the profile.
   *
   * @return \App\Model\User
   */
  public function user()
  {
    return $this->belongsTo('App\Model\User', 'id', 'custom_primary_key_on_profile_table');
  }
}
```

### 一对多关系

一对多关系就像是一个父子关系，其中一个模型充当父模型，而多个子模型则与之关联。例如，一个用户可以拥有无限数量的帖子。在 CascadeORM 中定义一对多关系非常简单，只需在 Cascade 模型上创建一个方法即可。这个方法将建立父模型和子模型之间的关联。这是一种简单而直观的方式来定义和处理一对多关系。所以，赶紧探索并充分利用 CascadeORM 中一对多关系的强大功能吧！

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
     * Get the posts associated with the user.
     *
     * @return \App\Model\Post[]
     */
    public function posts()
    {
        return $this->hasMany('App\Model\Post', 'userId');
    }

}
```

所以在这个示例中，Post 模型的外键列将被假定为 userId。

一旦你定义了关联方法，就可以通过访问 posts 属性轻松获取相关的文章集合。多亏了 Cascade 的"动态关联属性"，你可以像访问实际上在模型上定义的属性一样无缝访问关联方法。这是一个巧妙而直观的功能，简化了你的代码，使处理关系变得轻而易举。

```php
<?php

namespace App\Controller;

use Core\BaseController;
use App\Model\User;

class Home extends  BaseController
{
    public function indexAction()
    {
        $posts = User::find(1)->posts()->get();
        foreach ($posts as $post) {
            var_dump($post->title);
        }
    }
}
```

由于 CascadeORM 中的关系也充当了强大的查询构建器，因此您可以灵活地向关系查询添加其他约束条件。只需调用`posts`方法，并继续在查询上链接条件以进一步细化结果。E.g:

```php
<?php

namespace App\Controller;

use Core\BaseController;
use App\Model\User;

class Home extends  BaseController
{
    public function indexAction()
    {
        $posts = User::find(1)->posts()->where('title', '=', 'abc')->get();
        foreach ($posts as $post) {
          // return 'abc' if such post exists
          var_dump($post->title);
        }
    }
}
```

就像 hasOne 方法一样，您也可以通过向 hasMany 方法传递额外的参数来覆盖默认的外键和本地键。这样可以根据特定需求自定义关系。

```php
<?php
/**
 * Get the posts associated with the user.
 *
 * @return \App\Model\Post[]
 */
public function posts()
{
    return $this->hasMany('App\Model\Post', 'userId', 'custom_local_key');
}
```

### 一对多关系（反向关系）/ 属于（BelongsTo）

类似地，一对多关系的反向关系也是使用 belongsTo 方法，我们已经解释过了。

### 多对多

多对多关系比一对一和一对多关系稍微复杂一些。在多对多关系中，一个模型的多个实例与另一个模型的多个实例相关联。

例如，考虑一个情景，用户可以对多个帖子进行评分，而每个帖子也可以被多个用户评分。这创建了用户模型和帖子模型之间的多对多关系。

在这种情况下，一个用户可以对不同的帖子进行多个评分，而这些帖子也可以被多个用户评分。例如，用户 1 可以给帖子 1、帖子 2 和帖子 3 分别评为 5 星级，而帖子 3 可以被用户 1、用户 2 和用户 3 评分。

这种类型的关系需要一个中间表，通常称为枢纽表或关联表，用于存储两个模型之间的关联。枢纽表通常包含两个模型的外键，使您能够有效地建立和管理多对多关系。

通过了解和利用 CascadeORM 中的多对多关系，您可以轻松处理应用程序中的复杂关系。所以，深入了解并发掘 CascadeORM 中多对多关系的威力吧！

#### 表结构

为了定义这个关系，需要三个数据库表：users（用户）、posts（帖子）和 ratings（评分）。评分表（ratings）是一个中间表（pivot table）。我们可以概括地描述关系表结构如下：

```txt
users
    id - integer
    name - string

posts
    id - integer
    name - string

role_user
    user_id - integer
    role_id - integer
    rating - integer
```

#### 模型结构

在 CascadeORM 中，多对多关系通过定义一个方法，该方法返回 belongsToMany 方法的结果来建立。这个强大的方法 belongsToMany 由 App\DB\ORM\Model 基类提供，该基类被所有 Cascade 模型在应用程序中使用。

要定义多对多关系，您可以在 User 模型类中创建一个名为 ratedPosts 的方法。在这个方法内部，您可以调用 belongsToMany 方法来建立 User 和 Post 模型之间的关系。这就像在两个模型之间搭建了一座桥梁，使您能够轻松处理多对多关系。

因此，请继续在 User 模型类中定义 ratedPosts 方法，以发掘 CascadeORM 中多对多关系的魔力。这是一个强大的工具，可以简化复杂的关系并增强应用程序的灵活性。

首先，我们在 User 模型类中定义一个 ratedPosts 函数，该函数调用了 belongsToMany 函数。

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
     * Get the posts that the user has rated.
     *
     * @return \App\Model\Post[]
     */
    public function ratedPosts()
    {
        return $this->belongsToMany('App\Model\Post', 'ratings', 'userId', 'postId')->withPivot('ratings');
    }
}

```

belongsToMany 方法接受四个参数，分别是：

- 关联的模型类（Post）
- 中间表的名称（ratings）
- 中间表上的参考表外键（userId）
- 中间表上的关联表外键（postId）

belongsToMany 函数将使用联接（join）在这三个表之间建立连接，以便您可以访问这些表中的值。

通过使用 withPivot 函数，您可以选择在查询结果中包含哪些来自枢纽表的列。

为了明确起见，以下代码将返回由 ID 为 1 的用户评价的所有评分信息：

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
        $data = User::find(1)->ratedPosts()->get();
        echo $data;
    }
}
```

让我更清楚地解释一下，实际运行的等效 SQL 语句是：

```sql
SELECT Posts.*,ratings.userId,ratings.ratings FROM Posts INNER JOIN ratings ON ratings.postId = Posts.id INNER JOIN User ON ratings.userId = User.id WHERE ratings.userId = '1'
```

由于关系也充当强大的查询构建器，将关系定义为方法提供了强大的方法链和查询功能。例如，我们可以在这个关系上链式添加额外的查询约束条件：

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
        $data = User::find(1)->ratedPosts()->withPivot('id')->get();
    }
}
```

为了让你更明确，实际执行的等效 SQL 语句

```sql
SELECT Posts.*,ratings.userId,ratings.ratings,ratings.id FROM Posts INNER JOIN ratings ON ratings.postId = Posts.id INNER JOIN User ON ratings.userId = User.id WHERE ratings.userId = '1'
```
