/**
 * The flag of Finland, drawn: white field, blue Nordic cross, the official
 * proportions (18 by 11, the cross three wide, five in from the hoist) and
 * the official blue. Drawn and not an emoji, so that it is a flag on every
 * system (Windows has no flag emoji and shows two letters). It sizes with
 * the text around it (global.css, .flag) and says nothing to a screen
 * reader: the words around it do.
 */
export const FLAG_FI =
  '<svg class="flag" viewBox="0 0 18 11" aria-hidden="true" focusable="false">' +
  '<rect width="18" height="11" fill="#fff"></rect>' +
  '<path d="M0 4h18v3H0zM5 0h3v11H5z" fill="#002f6c"></path>' +
  '<rect class="edge" x="0.25" y="0.25" width="17.5" height="10.5" fill="none"></rect>' +
  "</svg>";

/** What an author writes in a text where the flag goes. */
export const FLAG_FI_EMOJI = "🇫🇮";

/**
 * The HTML of a rendered text with the flag drawn where the author wrote its
 * emoji (src/pages/[...path].astro), so that a page carries no HTML and no
 * image (the site's rule) and still shows a flag on every system. One
 * replacement on the content layer's own rendering: no Markdown plugin, no
 * dependency.
 */
export function drawFlags(html: string): string {
  return html.replaceAll(FLAG_FI_EMOJI, FLAG_FI);
}
