var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  
  $scope.formData1={
        key:"value",
        key1:['lsit1','list2','list3','list4','list5'],
        key2:"value2",
        keyObj:{
            subkey1:"subValue1",
            subkey2:"subValue2",
            subkeylist:['sublst1','sublst2','sublst3','sublst4'],
            subkeyObj:{
                subsubkey:"subsubvalue",
                subsubkeylist:[
                    'testtItem1', 
                    {
                        test1:"testvalue",
                        test2:"testvalue2"
                    },
                    ['tlst','tlst2','tlst3']
                ],
                subsubkeyObj:{
                    'testin':'testin',
                    'testOut':'testOut'
                }
            }
        }    
    
    
};
  
  $scope.formData = [
  {label:'First Name', type:'text', required:'true'},
  {label:'Last Name', type:'text', required:'true'},
  {label:'Coffee Preference', type:'dropdown', options: ["HiTest", "Dunkin", "Decaf"]},
  {label: 'Address', type:'group', "Fields":[
      {label:'Street1', type:'text', required:'true'},
      {label:'Street2', type:'text', required:'true'},
      {label:'State', type:'dropdown',  options: ["California", "New York", "Florida"],
        "Fields" : [
          {label:'LOLCat1', type:'text', required:'true'},
          {label:'LOLCat2', type:'text', required:'true'}]
      }
    ]},
  ];
  
  
$scope.test = function(text) {
  alert(JSON.stringify(text,null,"\t"));
}
  
});
