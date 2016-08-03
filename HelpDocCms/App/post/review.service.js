angular.module("post.module").factory("ReviewService", function ($resource, PostConfig) {
    //var r = $resource('/api/post');
    /*
     * { 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };
     * 
     */
  

    var resource = $resource('/api/post/review/:id',
            { username: 'admin', postId: '@id' });
    return {
        get: function () {
            return resource.get({id: '@id'});
        },
        save: function (review) {
            return resource.save(review);
        }
    }
});
