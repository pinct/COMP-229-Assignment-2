/*
  app.js
  Michael Courneya
  301106259
  10/25/2020
*/
(function(){
    function Start()
    {
        console.log("App Started....");

        let deleteButtons = document.querySelectorAll('.btn-danger');

        for (button of deleteButtons)
        {
            button.addEventListener('click', (event) =>{
                if(!confirm("Are you sure you want to delete the book entry?"))
                {
                    event.preventDefault();
                    window.location.assign('/contact-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();