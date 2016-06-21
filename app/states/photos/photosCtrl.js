/**
 * Created by D Musev on 6/21/2016.
 */
/**
 * Created by D Musev on 6/20/2016.
 */
'use strict';

app.controller( 'photosCtrl', function ( $scope, fileUpload, dataService) {
    $scope.test = [
        {thumb: '../app/components/themeComponents/test/1327.jpg', img: '../app/components/themeComponents/test/1327.jpg', description: 'Image 1'},
        {thumb: '../app/components/themeComponents/test/index.jpg', img: '../app/components/themeComponents/test/index.jpg', description: 'Image 2'},
        {thumb: '../app/components/themeComponents/test/index1.jpg', img: '../app/components/themeComponents/index1.jpg', description: 'Image 3'},
        {thumb: '../app/components/themeComponents/test/mini.jpg', img: '../app/components/themeComponents/test/mini.jpg', description: 'Image 4'},
        {thumb: '../app/components/themeComponents/test/tux.jpg', img: '../app/components/themeComponents/test/tux.jpg', description: 'Image 5'},
    ]

    $scope.uploadFile = function(){
        var file = $scope.myFile;

        console.log('file is ' );
        console.dir(file);
        var userEmail = dataService.getLoggedUserEmail;
        var uploadUrl = "http://localhost:3000/photos/upload/" + userEmail;
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

});
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })

            .success(function(){
            })

            .error(function(){
            });
    }
}])