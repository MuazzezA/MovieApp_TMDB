<h1>Movie App</h1>

<p>Movie App, React Native ve JavaScript kullanılarak geliştirilmiş olan bir mobil uygulamadır. Bu uygulama, kullanıcılara çeşitli filmleri arama, kategorilere ayırma ve favorilere ekleme yeteneği sunar. Ayrıca, uygulama Redux ile veri yönetimi sağlar ve Axios kütüphanesi ile dış API ile iletişim kurar. Bu uygulamanın arkasında TMDB API'si kullanılmıştır.</p>

<h2>Kurulum</h2>

<p>Projeyi indirmek istediğiniz dizine gelin ve orada bir terminal açın.</p>

<pre>
$ git clone https://github.com/MuazzezA/MovieApp_TMDB.git
$ cd MovieApp_TMDB
$ yarn install
</pre>

<p>Simulatorde ayarlar için bu adımı unutmayınız:</p>

<pre>
$ cd ios && pod install && cd ..
</pre>

<p>Projeyi başlatmak için aşağıdaki komutları kullanabilirsiniz:</p>

<pre>
$ yarn ios
</pre>
veya
<pre>
$ yarn android
</pre>
<br>
<h3>Önemli</h3>

<p>Proje içinde <code>src/app/api/config.js</code> dosyasını eklemeniz gerekmektedir. Dosya içinde 3 veri bulunur, işte bir örnek:</p>

<pre>
const API_BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = 'YOUR TOKEN';
const ACCOUNT_ID = 'YOUR ACCOUNT ID';

export {API_BASE_URL, TOKEN, ACCOUNT_ID};
</pre>
<br>
<h2>Özellikler</h2>

<ul>
  <li>Filmi favorilere ekleme ve çıkarma</li>
  <li>Anasayfada diğer filmleri görüntüleme ve arama işlevi sayesinde istenilen filmin aratılabilir</li>
  <li>Film detayında film hakkında bilgi alma</li>
</ul>

<h2>Video ve Ekran Görüntüleri</h2>

<table>
  <tr>
    <td>
      <img width="200" src="https://github.com/MuazzezA/MovieApp_TMDB/assets/64336826/f31aa65c-6df2-4e30-811e-dbb7d35365b5" />
    </td>
    <td>
      <img width="200" src="https://github.com/MuazzezA/MovieApp_TMDB/assets/64336826/490758f8-6c37-4316-92fb-b5af29ddd60d" />
    </td>
    <td>
      <img width="200" src="https://github.com/MuazzezA/MovieApp_TMDB/assets/64336826/892e718a-ccd3-420c-80f4-a0e3bf766a0d" />
    </td>
  </tr>
  <tr>
    <td>
      <img width="200" src="https://github.com/MuazzezA/MovieApp_TMDB/assets/64336826/ae43771b-87fa-4504-8c2c-0d240027a20c" />
    </td>
    <td>
      <img width="200" src="https://github.com/MuazzezA/MovieApp_TMDB/assets/64336826/04a221ab-5c18-44e1-9cea-b2408bcb565f" />
    </td>
    <td>
      <img width="200" src="https://github.com/MuazzezA/MovieApp_TMDB/assets/64336826/725724b0-10cb-4560-a73d-9b47ab496c3a" />
    </td>
  </tr>
</table>
