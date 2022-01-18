export default function contain($article) {
  $article.innerHTML = `
      <span class="fullscreen__text">"Double click to toggle fullscreen"</span>
    `;

  return $article;
}
