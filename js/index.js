$(document).ready(function () {
    $('.card').hover(
        function () {
            $(this).addClass('bg-dark text-white')
        },
        function () {
            $(this).removeClass('bg-dark text-white')
        }

    )

    $("#donate_card").click(function () {
        $('#exampleModal').modal('show');
    });

    $("#cont").click(function () {
        window.location.href = "contact.html";
    });

    $("#donate-btn").click(function () {
        var name = $('#donor-name').val();
        var don = $('#don-amount').val();
        $('#donor-name').val(" ");
        $('#don-amount').val(" ");
        $('#exampleModal').modal('toggle');


        var curUser = firebase.auth().currentUser;
        if (curUser) {
            firebase.auth().signOut().then(function () {
                console.log('Signed Out');
            }, function (error) {
                console.error('Sign Out Error', error);
            });
        }

        firebase.auth().signInAnonymously().catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        curUser = firebase.auth().currentUser;

        if (curUser) {
            var DataRef = firebase.database().ref("donations/" + curUser.uid + "/");

            DataRef.set({
               dName:name,
               donation:don
            });
        } else {
            // not required
        }


    });
});
