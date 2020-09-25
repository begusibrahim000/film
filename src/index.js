// ============================= LOGIC APLIKASI FILM - by begus ibrahim =============================
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=d8cab484
// keyword -> input
// cari-button -> button

// ==================== bahan yang dibutuhkan ====================
import $ from "jquery"
import "./style/style.css"

// ==================== component fitur search film ====================
class FiturSearch extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  set clickEvent(event) {
       this._clickEvent = event
       this.render()
  }

  get value() {
       return this.querySelector('.keyword').value
   }

  render() {
     this.innerHTML = `<div class="row mt-5">
                        <div class="col-md-8 offset-md-2">
                          <div class="input-group mb-3">
                            <input type="text" class="form-control keyword" placeholder="Cari film berdasarkan nama film disini" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <div class="input-group-append">
                              <button class="btn btn-outline-success cari-button" type="button">Cari Film</button>
                            </div>
                          </div>
                        </div>
                      </div>`

      this.querySelector('.cari-button').addEventListener('click', this._clickEvent)
   }
}
 
window.customElements.define('fitur-search', FiturSearch)

// ==================== logic search film ====================
$('.cari-button').on('click', function() {

  $.ajax({
    url: `http://www.omdbapi.com/?apikey=d8cab484&s=${$('.keyword').val()}`,
    success: response => {
      const movies = response.Search
      let cards = ''
      if(movies == undefined) {
        const pesanTidakAdaFilm = `<div class="col-md-12 mx-1">
                                    <div class="alert alert-danger text-center" role="alert">
                                      <strong>Film tidak ditemukan,mohon cari film berdasarkan keyword nama film yang benar misal : shooter</strong>
                                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                  </div>`
        $('.movie-container').html(pesanTidakAdaFilm)
      }else {
        movies.forEach(m => {
          cards += `<div class="col-md-4 my-5">
                    <div class="card">
                      <img src="${m.Poster}" class="card-img-top">
                      <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                      </div>
                    </div>
                  </div>`
        })

        $('.movie-container').html(cards)
      }
    },
    error: error => {
      if(error.statusText == 'error') {
        const pesanTidakAdaFilm = `<div class="col-md-12 mx-1">
                                    <div class="alert alert-danger text-center" role="alert">
                                      <strong>Film tidak ditemukan,mohon cari film berdasarkan keyword nama film yang benar misal : shooter</strong>
                                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                  </div>`
        $('.movie-container').html(pesanTidakAdaFilm)
      }
      // console.log(error.statusText)
    }
  })

})