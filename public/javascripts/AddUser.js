$(document).ready(function(){

    var app = new Vue({
        el: '#form',
        data: {
            name: 'Vue.js',
            husky_id:null,
            roles:[],
            senator:[],
            first_name:null,
            last_name:null,
            phone_number:null,
            senator_constituency:null

        },
        // define methods under the `methods` object
        methods: {
            greet: function (event) {
                // `this` inside methods points to the Vue instance
                console.log(app.husky_id);
                console.log(app.first_name);
                console.log(app.last_name);
                console.log(app.phone_number);

                if(app.husky_id.includes(".")==0){
                    $('#error').show();
                    $('#error').text("Invalid Husky Id");
                    return;
                }else if(app.phone_number.length!=10){
                    $('#error').show();
                    $('#error').text("Invalid Phone Number");
                    return;
                }else if(app.last_name==null || app.first_name==null){
                    $('#error').show();
                    $('#error').text("Invalid Name");
                    return;
                }
                $("#error").hide();

                    $.ajax({
                        type: "POST",
                        url: 'users/add',
                        data: {husky:app.husky_id, first:app.first_name, last:app.last_name, phone:app.phone_number},
                        dataType:'json',
                        success: function(data,status,other){
                            console.log("hello");
                            $("#form").hide();

                        }
                    });



            },
            checkboxToggle:function(){
                console.log(app.roles);
                if(app.roles.includes("Senator")){
                    console.log("")
                    $('#senator_details').show();
                    $('.type_details').hide();


                }
                if(app.senator.includes("academic_senator")){
                    $('#academic_details')
                }
            }
        },
        computed:{
            senator_select:function(){
                return this.roles.includes("Senator");
            },
            academic:function(){
                return this.senator.includes("academic_senator");
            },
            special:function(){
                return this.senator.includes("special_senator");
            },
            completed:function(){
                return this.husky_id != null && this.first_name != null && this.last_name != null && this.roles[0] != null;
            }
        }

    })
});