import React, { useState } from 'react';
import './Blog.css';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Pagination from './Pagination';
const blogPosts = [
  {
    id: 1,
    title: 'Modni trendovi za ovu sezonu',
    description: 'Otkrijte najnovije modne trendove koji će obeležiti ovu sezonu.',
    image: '/images/blog1.jpg',
    content: `
      Ova sezona donosi brojne nove trendove u svetu mode. Od boja koje dominiraju do novih krojeva, sve je spremno da nas iznenadi i oduševi. 
      U ovom članku ćemo detaljno proći kroz najvažnije trendove, počevši od jakni i kaputa koji su postali must-have ove zime, do ključnih aksesoara 
      koji će biti neizbežan deo svakodnevnih kombinacija. Na prvom mestu su boje, sa naglaskom na smaragdno zelenu, crnu i elegantnu bež. Očekujte 
      da ćete videti mnogo oversized jakni, ali i ključne detalje poput metalnih dugmadi i krznenih rukava koji čine svaki outfit posebnim.
      
      Za ljubitelje sportskog stila, trendovi donose i velike promene u tom segmentu, sa kombinacijama koje se mogu nositi i na poslu i u slobodno 
      vreme. U narednim paragrafoima razmotrićemo kako da uskladite ove trendove sa sopstvenim stilom.
    `,
  },
  {
    id: 2,
    title: 'Saveti za stilizovanje sportske garderobe',
    description: 'Kako kombinovati sportsku odeću za svakodnevni elegantan izgled.',
    image: '/images/blog2.jpeg',
    content: `
      Sportska garderoba je postala nezaobilazan deo svakodnevnog života, kako za vežbanje, tako i za opuštene trenutke. Međutim, mnogi ne znaju 
      kako da je pravilno kombinuju sa elegantnim komadima kako bi stvorili balans između udobnosti i stila. Na primer, oversized trenirke mogu 
      se kombinovati sa elegantnim belim košuljama i modernim sakoom. Uz ovakve kombinacije, nećete samo izgledati šik, već ćete se i osećati udobno.

      Osim toga, tenisice koje nosimo na treningu mogu postati deo svakodnevnog stila, ako se kombinuju sa pravim pantalonama ili suknjama. U 
      ovom članku ćemo pogledati nekoliko ključnih komada koje morate imati u svom ormaru, i kako da ih stilizujete da izgledaju moderno, bez 
      obzira na to da li ste u teretani ili na kafi sa prijateljima.
    `,
  },
  {
    id: 3,
    title: 'Minimalistički pristup modi',
    description: 'Zašto je minimalizam u modi sve popularniji i kako ga primeniti.',
    image: '/images/blog3.jpg',
    content: `
      Minimalizam u modi je filozofija koja se temelji na jednostavnosti i funkcionalnosti. Ovaj stil se odlikuje čistim linijama, neutralnim 
      bojama i minimalnim detaljima. Umesto prekomernih aksesoara i složenih kombinacija, minimalistički stil favorizuje kvalitetne, ali jednostavne 
      komade koji mogu da se kombinuju na više načina.

      U ovom članku ćemo istražiti kako da stvorite minimalistički ormar sa nekoliko ključnih komada koji će trajati godinama. Na primer, bela 
      košulja, crni kaput i jednostavan par pantalona su komadi koji čine osnovu svakog minimalističkog stila. Takođe, razmotrićemo kako da 
      se fokusirate na kvalitet umesto na kvantitet, što je osnovna ideja minimalističkog pristupa.
    `,
  },
  {
    id: 4,
    title: 'Kako odabrati idealne čizme za zimu',
    description: 'Pronađite savršene čizme koje kombinuju stil i udobnost.',
    image: '/images/blog4.jpg',
    content: `
      Zimske čizme nisu samo zaštita od hladnoće, već i ključni modni komad koji može da upotpuni svaki zimski outfit. Važno je da odaberete 
      čizme koje su udobne, ali i moderne. U ovom članku ćemo govoriti o različitim stilovima zimskih čizama, od klasičnih modela sa krznom 
      do onih sa platformama koje su popularne ove zime.

      Takođe, razmotrićemo i materijale koji najbolje funkcionišu tokom hladnih meseci, kao što su koža, vodootporni materijali i specijalni 
      izolovani materijali koji će vam pružiti dodatnu zaštitu. Na kraju, nećemo zaboraviti ni boje, jer će tamne boje i boje zemlje biti dominantne 
      ove zime, dok su pastelne nijanse rezervisane za hladnije, ali sunčanije dane.
    `,
  },
  {
    id: 5,
    title: 'Osnovni komadi za garderobu',
    description: 'Koji komadi su must-have u svakoj garderobi.',
    image: '/images/blog5.jpg',
    content: `
      Svaka garderoba treba da sadrži nekoliko osnovnih komada koji mogu da se kombinuju u različitim prilikama i sezonama. Ovaj članak se 
      bavi ključnim komadima koje morate imati, bez obzira na to da li volite klasičan, sportski ili elegantan stil. Na prvom mestu, to su 
      jednostavni komadi poput dobre bele košulje, crnih pantalona, crnog kaputa i elegantnih crnih čizama.

      Osim toga, u članku ćemo obraditi i trikove kako da ove komade stilizujete na savremene načine, kombinujući ih sa trendovima iz trenutnih 
      sezona. Na primer, možete dodati šarene aksesoare ili čak nekoliko statement komada koji će uneti živost u jednostavne kombinacije.
    `,
  },
];


const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const navigate = useNavigate();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleReadMore = (post) => {
    navigate(`/blog/${post.id}`, { state: { post } }); 
  };
  

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="blog">
        <h1>Dobrodošli na naš blog!</h1>
        <p>Pročitajte najnovije vesti, savete i trendove iz sveta mode i stila.</p>

        <div className="blog-grid">
          {currentPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} />
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <button onClick={() => handleReadMore(post)}>Detalji</button>
            </div>
          ))}
        </div>

         <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={handlePrevPage}
                  onNext={handleNextPage}
                />
      </div>
    </div>
  );
};

export default Blog;
