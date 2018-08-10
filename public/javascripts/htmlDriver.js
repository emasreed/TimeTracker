$(document).ready(function(){

    var app = new Vue({
        el: '#form',
        data: {
            name: 'Vue.js',
            husky_id:null,
            type:[],
            committee:[],
            date:null

        },
        // define methods under the `methods` object
        methods: {
            greet: function (event) {
                // `this` inside methods points to the Vue instance
                console.log(app.husky_id);
                console.log(app.type);
                console.log(app.date);

                let userId=0;
                let url='users/hid/'+app.husky_id;

                $.get( url, function( data ) {
                    if(data[0]==null){
                        console.log("error, user is not registered");
                        return;
                    }
                    userId=data[0].id;
                    $.ajax({
                        type: "POST",
                        url: 'hours/add',
                        data: {user_id:userId, date:app.date, description:app.type},
                        dataType:'json',
                        success: function(data,status,other){
                            console.log("hello");
                            $("#form").hide();

                        }
                    });
                });



            }
        }
    })
});