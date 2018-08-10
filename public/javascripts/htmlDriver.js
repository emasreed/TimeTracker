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
            add: function (event) {
                // `this` inside methods points to the Vue instance
                console.log(app.husky_id);
                console.log(app.type);
                console.log(app.date);

                let userId=0;
                let url='users/hid/'+app.husky_id;
                let committeeId=0;

                $.get( url, function( data ) {
                    if (data[0] == null) {
                        console.log("error, user is not registered");
                        return;
                    }
                    userId = data[0].id;
                    console.log(app.committee);
                    url = 'committee/name/' + app.committee;
                    $.get(url, function (data) {
                        if (data[0] == null) {
                            console.log("error, committee is not registered");
                            return;
                        }
                        committeeId = data[0].id;
                        $.ajax({
                            type: "POST",
                            url: 'hours/add',
                            data: {user_id: userId, date: app.date, description: app.type, committee: committeeId},
                            dataType: 'json',
                            success: function (data, status, other) {
                                console.log("hello");
                                $("#form").hide();
                                $("#success").show();

                            }
                        });
                    });
                });



            }
        }
    })
});