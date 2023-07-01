---
title: Cascade Relations
description: Cascade Relations Intro
---

### Introduction

Database tables often have relationships with each other. For instance, a blog post may have multiple comments, or an order could be associated with the user who placed it. CascadeORM simplifies the management and handling of these relationships and supports various common relationship types, including:

- One To One
- One To Many
- Many To Many

With CascadeORM, working with these relationships becomes effortless and straightforward.

### Defining Relationships

Cascade relationships are like best friends to your Cascade model classes. They are defined as methods, which not only establish the relationships but also act as powerful query builders. This means you can chain additional query constraints and unleash the full potential of method chaining and querying capabilities. It's like having a dynamic duo that works seamlessly together. So, feel free to explore and leverage the power of cascade relationships to make your database interactions smooth and efficient. They've got your back! E.g:

```php
$user->posts()->where('title', 'abc')->get();
```

Before diving too deep into define the database table relationships, let's take a moment to understand how to define each type of relationship supported by CascadeORM. It's like laying a solid foundation before embarking on an exciting journey. So, let's get started and explore the magic of relationships!

### One To One

A one-to-one relationship is a very basic type of database relationship. To define this relationship, we'll create a profile method in the User model. Inside the profile method, we'll use the hasOne method provided by the App\DB\ORM\Model base class. This method will establish the one-to-one relationship between the User and Profile models. So, go ahead and create that special bond between your models! They are meant to be together.

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

When using the hasOne method, you need to pass the name of the related model class as the first argument. Once the relationship is defined, you can easily retrieve the related record using Cascade's dynamic properties. These dynamic properties work like magic, allowing you to access relationship methods as if they were actual properties defined on the model. It's a convenient and intuitive way to navigate through your model's relationships. So, go ahead and explore the world of dynamic properties in CascadeORM! They'll make your life easier.

```php
// return city property value on the profile table which the id is 1
$user = User::find(1)->profile()->city;
```

CascadeORM automatically determines the foreign key of the one-to-one relationship based on the primary key in the Profile model. In this case, the primary key of the Profile model is assumed to be the foreign key as well. Therefore, the value of the foreign key will be the same as the primary key because they refer to the same column. CascadeORM takes care of this behind the scenes, making it seamless and effortless for you to establish and navigate one-to-one relationships. So, you can focus on your application logic while CascadeORM handles the intricate details for you.

### Defining The Inverse Of The Relationship

Now that we can access the Profile model from our User model, let's define a relationship on the Profile model that allows us to access the user who owns the profile. We can establish the inverse of a hasOne relationship using the belongsTo method. It's like completing the circle of friendship between our models. So, let's define this special bond and unlock the power of bidirectional relationships in CascadeORM!

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

CascadeORM determines the primary key of the User table based on the second argument of the `belongsTo` method. In this case, the column name `id` is used as the primary key.

If the Profile model doesn't use `id` as its primary key, or if you want to find the associated model using a different column, you can pass a third argument to the `belongsTo` method to specify the custom key of the Profile table. It's a flexible feature that allows you to customize the relationship based on your specific requirements. So, go ahead and make use of this power to establish relationships using different keys in CascadeORM!

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

### One To Many

A one-to-many relationship is used to define relationships where a single model is the parent to one or more child models. For example, a user may have an infinite number of posts. Like all other Cascade relationships, one-to-many relationships are defined by defining a method on your Cascade model:

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

So, in this example, Cascade will assume the foreign key column on the Post model is userId.

Once the relationship method has been defined, we can access the collection of related posts by accessing the posts property. Remember, since Cascade provides "dynamic relationship properties", we can access relationship methods as if they were defined as properties on the model:

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

Since relationships in CascadeORM also act as powerful query builders, you have the flexibility to add additional constraints to the relationship query. Simply call the posts method and continue chaining conditions onto the query to further refine the results. E.g:

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

Like the hasOne method, you may also override the foreign and local keys by passing additional arguments to the hasMany method:

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

### One To Many (Inverse) / BelongsTo

Similary, the OneTo Many relationship's inverse relation is also belongsTo which we have explained.

### Many To Many Relationships

Many-to-many relationships are slightly more complex than one-to-one and one-to-many relationships. In a many-to-many relationship, multiple instances of one model are associated with multiple instances of another model.

For example, consider a scenario where users can rate multiple posts, and each post can be rated by multiple users. This creates a many-to-many relationship between the User and Post models.

In this case, a user can have many ratings on different posts, and those posts can also be rated by many users. For instance, User1 may have assigned a 5-star rating to Post1, Post2, and Post3, while Post3 may be rated by User1, User2, and User3.

This type of relationship requires an intermediary table, often referred to as a pivot table or junction table, to store the associations between the two models. The pivot table typically contains the foreign keys of both models, allowing you to establish and manage the many-to-many relationship effectively.

By understanding and utilizing many-to-many relationships in CascadeORM, you can easily handle complex relationships like these in your application.

#### Table Structure

To define this relationship, three database tables are needed: users, posts, and ratings. The rating table is the pivot table. we can summarize the relationships table structure like so:

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

#### Model Structure

Many-to-many relationships in CascadeORM are established by defining a method that returns the result of the belongsToMany method. This powerful method, belongsToMany, is provided by the App\DB\ORM\Model base class, which is used by all of your Cascade models in the application.

To define a many-to-many relationship, you can create a method called ratedPosts in the User model class. Inside this method, you can call the belongsToMany method to establish the relationship between the User and Post models. It's like creating a bridge between the two models, allowing you to work with the many-to-many relationship effortlessly.

First, we define a ratedPosts function which calls the belongsMany function in the User model class,

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

belongsToMany method accepts four parameters, there are

- relation class model (Post)
- pivot table name (ratings)
- reference table foreign key on ratings table (userId)
- relation table foreign key on ratings table (postId)

The belongsToMany function will establish the connection among the three tables using join so that you could access the values from these tables.

The withPivot function will let you choose which column on the pivot table you want to have on your query result.

To be clear, the following code will return all the ratings info which rated by the user with id 1:

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

To make you clear, the equivalent sql statement actually run is:

```sql
SELECT Posts.*,ratings.userId,ratings.ratings FROM Posts INNER JOIN ratings ON ratings.postId = Posts.id INNER JOIN User ON ratings.userId = User.id WHERE ratings.userId = '1'
```

Since relationships also serve as powerful query builders, defining relationships as methods provides powerful method chaining and querying capabilities. For example, we may chain additional query constraints on this relationship:

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

To make you clear, the equivalent sql statement actually run is:

```sql
SELECT Posts.*,ratings.userId,ratings.ratings,ratings.id FROM Posts INNER JOIN ratings ON ratings.postId = Posts.id INNER JOIN User ON ratings.userId = User.id WHERE ratings.userId = '1'
```
