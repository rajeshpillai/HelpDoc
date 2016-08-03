angular.module("book.module").factory("ReviewService", function ($resource, BookConfig) {
    //var r = $resource('/api/book');
    /*
     * { 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };
     * 
     */
  

    var resource = $resource('/api/book/review/:id',
            { username: 'admin', bookId: '@id' });
    return {
        get: function () {
            return resource.get({id: '@id'});
        },
        save: function (review) {
            return resource.save(review);
        }
    }
});
