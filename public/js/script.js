(() => {

  'use strict';



  const forms = document.querySelectorAll('.needs-validation');



  Array.from(forms).forEach(form => {

    form.addEventListener('submit', event => {

      console.log('Title:', form.querySelector('input[name="listing[title]"]').value);

      console.log('Price:', form.querySelector('input[name="listing[price]"]').value);



      if (!form.checkValidity()) {

        event.preventDefault();

        event.stopPropagation();

      }

      form.classList.add('was-validated');

    }, false);

  });

})();