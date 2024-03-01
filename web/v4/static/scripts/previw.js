document.querySelectorAll('.products-container .product').forEach(product =>{
    product.onclick = () =>{
      let previewContainer = document.querySelector('.products-preview');
      let previewBoxes = previewContainer.querySelectorAll('.preview');

      previewContainer.style.display = 'flex';
      let id = product.getAttribute('id');

      previewBoxes.forEach(preview =>{
        let target = preview.getAttribute('data-target');
        if(id == target){
          preview.classList.add('active');
        }
      });
    };
  });

  document.querySelectorAll('.preview').forEach(close =>{
    close.querySelector('.fa-times').onclick = () =>{
      close.classList.remove('active');
      let previewContainer = document.querySelector('.products-preview');
      previewContainer.style.display = 'none';
    };
  });
