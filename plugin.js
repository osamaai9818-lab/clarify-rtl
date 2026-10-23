/**
 * clarify-rtl — renders the clarify (questions/options) cards right-to-left.
 * The core "Text direction" setting covers chat prose and the composer but
 * not the clarify form, whose rows pin `text-left`. This injects a scoped
 * stylesheet that forces RTL on every row (no first-strong-char vote, so a
 * row opening with an English word like "Rollback" still reads RTL).
 */

const ID = 'clarify-rtl'
const STYLE_ID = 'hermes-plugin-clarify-rtl'

const CSS = `
[data-slot='clarify-inline'],
[data-slot='clarify-inline'] * {
  direction: rtl !important;
  unicode-bidi: normal !important;
}
[data-slot='clarify-inline'] :where(div, span, button, label, p, textarea, input) {
  text-align: right !important;
}
[data-slot='clarify-inline'] .justify-end {
  justify-content: flex-start !important;
}
[data-slot='clarify-inline'] :where(code, kbd) {
  direction: ltr !important;
  unicode-bidi: isolate !important;
}
`

export default {
  id: ID,
  name: 'Clarify RTL',
  register(ctx) {
    document.getElementById(STYLE_ID)?.remove()
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = CSS
    document.head.appendChild(style)
    ctx.onDispose?.(() => style.remove())
  }
}
