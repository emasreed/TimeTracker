$(document).ready(function(){
    $('.row').hide();
    let report_data=null;

    $.ajax({
        type: "GET",
        url: 'data/report',
        success: function (data, status, other) {
            $('.row').show();
            console.log(data);
            report_data=data;
            var app = new Vue({
                el: '#app',
                data: {
                    report:report_data,
                    included:[]

                },
                // define methods under the `methods` object
                methods: {
                    add: function(){
                        console.log('button pressed');
                        $('#send').attr('disabled','disabled');
                            $.ajax({
                                type: "POST",
                                url: '/data/report/send',
                                data: {
                                    messages: JSON.stringify(app.report)
                                },
                                dataType: 'json',
                                success: function () {
                                    console.log("sent messages");
                                    $('#send').removeAttr('disabled');

                                },
                                error:function(data,status,other){
                                    console.log(data,status);
                                }
                            });

                        }


                }
            });

        }
    });


});